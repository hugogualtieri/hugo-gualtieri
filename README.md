# hugo-gualtieri.com

Site personnel de Hugo Gualtieri — Ingénieur Freelance DevOps, Cloud & IA.

**Production** : [hugo-gualtieri.com](https://hugo-gualtieri.com)

## Stack technique

| Technologie | Usage |
|-------------|-------|
| [Next.js 16](https://nextjs.org) | Framework React (App Router) |
| TypeScript | Typage statique |
| [Tailwind CSS 3](https://tailwindcss.com) | Styling utilitaire |
| [shadcn/ui](https://ui.shadcn.com) | Composants UI (Radix) |
| [Recharts](https://recharts.org) | Graphiques (section revenus, masquée pour l'instant) |

## Architecture

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx          # Layout racine (metadata, fonts, Navbar/Footer)
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # 404
│   └── blog/
│       ├── page.tsx        # /blog — liste des articles
│       └── [slug]/
│           └── page.tsx    # /blog/:slug — article (SSG)
├── components/             # Composants React
│   ├── Hero.tsx            # Hero avec animations (terminal, graph, infra)
│   ├── About.tsx           # Section à propos
│   ├── Projects.tsx        # Projets (Ma Municipalité, OpenRando)
│   ├── Blog.tsx            # Section blog avec filtre par catégorie
│   ├── RevenueDashboard.tsx # Dashboard revenus (masqué)
│   ├── Navbar.tsx          # Navigation
│   ├── Footer.tsx          # Footer avec liens sociaux
│   └── ui/                 # Composants shadcn/ui
├── data/
│   └── articles.ts         # Articles de blog (données statiques)
└── lib/
    └── utils.ts            # Utilitaires (cn)
```

## Développement

### Prérequis

- Node.js >= 20
- npm

### Installation

```bash
npm install
```

### Lancer en local

```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Génère un export statique dans `out/` (configuré avec `output: "export"` dans `next.config.ts`).

### Lint

```bash
npm run lint
```

## Déploiement

Le site est déployé automatiquement sur **AWS S3 + CloudFront** via GitHub Actions à chaque push sur `main`.

### Pipeline CI/CD

```
push main → npm ci → npm run build → sync out/ → S3 → invalidation CloudFront
```

Workflow : [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

### Secrets GitHub requis

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | Clé IAM pour le déploiement |
| `AWS_SECRET_ACCESS_KEY` | Secret IAM |
| `S3_BUCKET` | Nom du bucket S3 (`hugo-gualtieri.com`) |
| `CLOUDFRONT_DISTRIBUTION_ID` | ID de la distribution CloudFront |

### Infrastructure AWS

| Ressource | Détail |
|-----------|--------|
| S3 | `hugo-gualtieri.com` (eu-west-3) |
| CloudFront | Distribution avec OAC, cache optimisé pour `_next/static/*` |
| Route 53 | Zone hébergée + enregistrements A/AAAA vers CloudFront |
| ACM | Certificat SSL pour `hugo-gualtieri.com` + `www.hugo-gualtieri.com` |

## Sécurité

- **Pre-commit hook** : [gitleaks](https://github.com/gitleaks/gitleaks) scanne chaque commit localement
- **GitHub Action** : gitleaks scanne sur chaque push/PR ([`.github/workflows/security.yml`](.github/workflows/security.yml))
- Aucun secret en dur dans le code — tout passe par les GitHub Secrets

## SEO

- Metadata (title, description, OpenGraph, Twitter Cards) sur chaque page
- JSON-LD schema.org (`Person` sur la homepage, `BlogPosting` sur les articles)
- `robots.txt` et `sitemap.xml` statiques dans `public/`
- HTML sémantique, `lang="fr"`, fonts optimisées via `next/font`
- Export statique (SSG) — chaque page est pré-rendue en HTML

## Ajouter un article de blog

1. Ajouter l'article dans `src/data/articles.ts` (slug, title, excerpt, category, date, readTime, content)
2. Ajouter la catégorie dans `categoryColor` si nouvelle
3. Ajouter la catégorie dans le filtre de `src/components/Blog.tsx`
4. Ajouter l'URL dans `public/sitemap.xml`
5. Push sur `main` pour déployer
