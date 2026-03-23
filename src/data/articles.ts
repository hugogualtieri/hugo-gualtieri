export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export const articles: Article[] = [
  {
    slug: "reduire-couts-cloud-40-pourcent",
    title: "Comment j'ai réduit mes coûts cloud de 40% en 3 mois",
    excerpt: "Un retour d'expérience concret sur l'optimisation FinOps de mes projets sur AWS et GCP.",
    category: "DevOps",
    date: "12 mars 2026",
    readTime: "8 min",
    content: `## Le constat initial

Quand j'ai fait l'audit de mes dépenses cloud en décembre 2025, le constat était brutal : **3 200€/mois** répartis entre AWS et GCP, avec une grosse partie de ressources sous-utilisées.

### Les quick wins

La première étape a été d'identifier les ressources fantômes — ces instances EC2 oubliées, ces snapshots EBS qui s'accumulent, ces load balancers sans trafic.

- **Instances réservées** : en passant de on-demand à reserved sur mes workloads stables, j'ai économisé 25% immédiatement
- **Right-sizing** : la majorité de mes instances tournaient à 15% de CPU. En downsizant, j'ai récupéré 400€/mois
- **Spot instances** : pour mes jobs de batch processing, les spots ont réduit le coût de 70%

### L'automatisation FinOps

J'ai mis en place un pipeline automatisé qui :
1. Analyse quotidiennement l'utilisation des ressources
2. Génère des recommandations de right-sizing
3. Coupe automatiquement les ressources de dev la nuit et le weekend

### Résultats

Après 3 mois d'optimisation progressive, je suis passé de **3 200€ à 1 920€/mois** — soit exactement 40% de réduction. Le plus satisfaisant ? La performance n'a pas bougé d'un iota.`,
  },
  {
    slug: "rag-production-pieges",
    title: "RAG en production : les pièges que personne ne mentionne",
    excerpt: "Après 6 mois à déployer du RAG en prod, voici les leçons que j'aurais aimé connaître avant.",
    category: "IA",
    date: "5 mars 2026",
    readTime: "12 min",
    content: `## Pourquoi le RAG semble simple (mais ne l'est pas)

Tous les tutoriels montrent la même chose : on chunk des documents, on les vectorise, on fait une recherche sémantique, on passe le contexte au LLM. Simple, non ?

En production, c'est une autre histoire.

### Piège #1 : Le chunking naïf détruit le contexte

Découper un document tous les 500 tokens semble raisonnable jusqu'à ce qu'un tableau soit coupé en deux, qu'un paragraphe perde sa référence, ou qu'une liste soit séparée de son introduction.

**Ma solution** : un chunking sémantique qui respecte la structure du document — titres, paragraphes, tableaux sont des unités atomiques.

### Piège #2 : La recherche sémantique ne suffit pas

Le embedding search est bon pour les questions conceptuelles, mais terrible pour les recherches exactes (numéros de version, noms propres, dates).

**Ma solution** : un système hybride keyword + semantic avec re-ranking. Le BM25 classique rattrape beaucoup de cas que le vectoriel rate.

### Piège #3 : L'évaluation est un cauchemar

Comment mesurer si votre RAG répond correctement ? Les métriques classiques (BLEU, ROUGE) sont inutiles ici.

**Ma solution** : un framework d'éval custom avec :
- Faithfulness : la réponse est-elle fidèle aux sources ?
- Relevance : les chunks récupérés sont-ils pertinents ?
- Coverage : la réponse couvre-t-elle la question complètement ?

### Ce que j'aurais aimé savoir

Le RAG n'est pas un projet "set and forget". C'est un système vivant qui nécessite un monitoring constant, des boucles de feedback, et une itération continue sur la qualité des données source.`,
  },
  {
    slug: "0-a-2k-side-projects",
    title: "De 0 à 2K€/mois avec des side-projects techniques",
    excerpt: "Ma stratégie pour créer des revenus récurrents avec des micro-SaaS et de l'affiliation.",
    category: "Business",
    date: "22 fév 2026",
    readTime: "10 min",
    content: `## La philosophie : small bets

Plutôt que de construire un gros SaaS pendant 12 mois sans revenus, j'ai opté pour la stratégie des "small bets" — plusieurs petits projets qui génèrent chacun quelques centaines d'euros.

### Mois 1-3 : L'affiliation technique

J'ai commencé par ce qui demandait le moins d'investissement : du contenu technique avec des liens d'affiliation vers des outils que j'utilise vraiment.

- Articles comparatifs d'outils DevOps
- Tutoriels avec liens vers des services cloud
- Reviews honnêtes de produits SaaS

**Résultat** : ~300€/mois après 3 mois de contenu régulier.

### Mois 4-6 : Le premier micro-SaaS

Fort des insights récoltés via mes articles, j'ai identifié un pain point récurrent : le monitoring des coûts multi-cloud. J'ai construit un MVP en 3 semaines.

- Landing page simple
- Connexion API aux providers cloud
- Dashboard de coûts avec alertes

**Résultat** : 15 clients payants à 29€/mois = 435€/mois.

### Mois 7-12 : Diversification

J'ai répliqué la formule avec d'autres niches, ajouté AdSense sur mes blogs, et lancé une newsletter sponsorisée.

### La stack revenus actuelle

| Source | Montant mensuel |
|--------|----------------|
| Micro-SaaS (x2) | ~900€ |
| Affiliation | ~650€ |
| AdSense | ~350€ |
| Sponsoring newsletter | ~200€ |
| **Total** | **~2 100€** |`,
  },
  {
    slug: "investissement-automatise-2026",
    title: "Mon setup d'investissement automatisé en 2026",
    excerpt: "DCA, ETF, crypto — comment j'automatise mes investissements pour y passer 10 min par mois.",
    category: "Argent",
    date: "15 fév 2026",
    readTime: "6 min",
    content: `## Le principe : automatiser pour ne pas y penser

Je suis convaincu que le meilleur investissement est celui qu'on oublie. Voici mon setup qui me prend littéralement 10 minutes par mois.

### ETF : le cœur du portefeuille (70%)

Virements automatiques mensuels vers mon PEA et mon CTO :

- **MSCI World** : 60% — diversification mondiale
- **S&P 500** : 20% — surpondération US tech
- **Emerging Markets** : 20% — exposition aux marchés émergents

Le DCA (Dollar Cost Averaging) mensuel lisse la volatilité. Je ne regarde même pas les cours.

### Crypto : la partie spéculative (20%)

- **Bitcoin** : 60% de la poche crypto
- **Ethereum** : 30%
- **Altcoins sélectionnés** : 10%

Même principe de DCA hebdomadaire via un bot automatisé.

### Cash & obligations (10%)

Un fonds euros en assurance-vie pour la sécurité et la liquidité.

### Les outils

- **Trade Republic** pour les ETF (plans d'épargne automatisés gratuits)
- **Ledger** pour le stockage crypto
- **Un spreadsheet maison** pour le suivi global

### La règle d'or

Je ne touche à rien sauf une fois par an pour le rééquilibrage. Le reste du temps, les virements automatiques font le travail.`,
  },
];

export const categoryColor: Record<string, string> = {
  DevOps: "text-primary",
  IA: "text-revenue-stripe",
  Business: "text-revenue-affiliate",
  Argent: "text-revenue-other",
};
