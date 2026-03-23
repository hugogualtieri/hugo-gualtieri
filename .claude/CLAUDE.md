# Hugo Gualtieri — Site Personnel

## Projet
Site personnel / portfolio de Hugo Gualtieri, ingénieur freelance DevOps, Cloud & IA.
- **URL** : https://hugo-gualtieri.com
- **Repo** : https://github.com/hugogualtieri/hugo-gualtieri

## Stack
- Next.js 16 (App Router) avec `output: "export"` (SSG statique)
- TypeScript, Tailwind CSS 3, shadcn/ui (Radix)
- Recharts pour les graphiques (section revenus masquée pour l'instant)

## Déploiement
- AWS : S3 (`hugo-gualtieri.com`, eu-west-3) + CloudFront (`E2FWUFOBW696OO`) + Route 53 + ACM
- CI/CD : GitHub Actions sur push `main` → build → sync S3 → invalidation CloudFront
- Secrets : `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`

## Conventions
- Langue : français pour le contenu, anglais pour le code / commits / docs techniques
- Commits : Conventional Commits (feat:, fix:, chore:, etc.)
- Pas de dark mode pour l'instant (thème clair uniquement)

## Structure des articles
Les articles de blog sont dans `src/data/articles.ts` (données hardcodées, pas de CMS).
Quand on ajoute un article, il faut aussi :
- Ajouter la catégorie dans `categoryColor` si nouvelle
- Ajouter la catégorie dans le filtre de `src/components/Blog.tsx`
- Ajouter l'URL dans `public/sitemap.xml`

## Sections masquées
- **RevenueDashboard** : composant prêt dans `src/components/RevenueDashboard.tsx`, retiré de `src/app/page.tsx`. À réactiver plus tard.

## Sécurité
- Pre-commit hook gitleaks (local)
- GitHub Action gitleaks sur push/PR
- Ne jamais committer de `.env`, credentials, tokens

## Infra Terraform
L'infra AWS existe déjà (créée manuellement). Pas de Terraform dédié pour ce projet.
Le Terraform de WePushCode (`~/Bureau/Agence/WePushCode/deploy/`) utilise le même pattern (S3 + CloudFront + Route53 + ACM) et peut servir de référence.

## Liens externes importants
- Cal.com RDV : https://cal.com/hugogualtieri/30min
- LinkedIn : https://www.linkedin.com/in/hugo-gualtieri-devops-cloud/
- GitHub : https://github.com/hugogualtieri
