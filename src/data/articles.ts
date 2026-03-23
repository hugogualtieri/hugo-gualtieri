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
    slug: "architecture-aws-s3-cloudfront-route53",
    title: "Architecture de mon blog hébergé sur AWS avec S3, CloudFront et Route 53",
    excerpt: "Comment héberger un site web statique sur AWS avec S3, CloudFront et Route 53 ?",
    category: "Cloud",
    date: "14 juil 2025",
    readTime: "8 min",
    content: `## Introduction

Dans un précédent article, j'expliquais que je souhaitais me diriger vers un rôle d'architecte en informatique. Et pour y arriver, une des choses que j'ai commencé à faire c'est documenter toutes les architectures que je construis. Cela va non seulement me permettre de garder une trace de mes réalisations, mais aussi de partager mes connaissances et d'améliorer mes compétences.

Dans cet article, je vais vous présenter l'architecture de mon blog personnel, hébergé sur AWS avec S3, CloudFront et Route 53.

## Présentation du projet

### Contexte et objectifs

L'objectif de ce projet était de créer un blog personnel simple, performant et peu coûteux. Je voulais donc une infrastructure qui réponde à plusieurs besoins:

1. **Simplicité** : La solution doit répondre aux besoins tout en restant le plus simple possible.
2. **Performance** : Je voulais que les performances de mon blog soient bonnes et qu'il soit capable d'encaisser de la charge au besoin.
3. **Efficience économique** : Pour un projet de ce type, qui n'a pas vocation à me rapporter de l'argent, je voulais une solution vraiment très peu coûteuse.
4. **Automatisation** : Bien entendu, je ne voulais pas devoir faire des actions manuelles pour mettre à jour mon site. Donc il me fallait une solution automatisable facilement pour les mises à jour.

### Pourquoi ne pas choisir une solution grand public ?

Il existe de nombreuses solutions grand public pour héberger un blog, comme Vercel, Netlify, etc... Cependant, j'ai choisi de ne pas utiliser ces solutions pour plusieurs raisons:

1. **Apprentissage** : Même si j'ai déjà travaillé avec ces services sur AWS, c'est un moyen pour moi d'approfondir mes connaissances et de rester à jour dans un cas comme celui-ci, et dans d'autres cas, de pratiquer sur certains services que je n'avais jamais utilisé.
2. **Pertinence** : Lorsque je travaille pour des clients, c'est quasiment tout le temps des grands comptes et ils ont recours à des cloud providers pour héberger leurs infrastructures. Continuer de construire des projets qui parleront à mes clients en termes d'infrastructure me donnera matière pour démontrer mes compétences lors d'entretiens.
3. **Evolutivité** : Une solution personnalisée sur AWS me permet d'avoir un contrôle total sur l'architecture et également peut-être de la faire évoluer plus tard.

## Présentation de l'architecture

### Schéma de l'architecture

*(Schéma d'architecture AWS — S3, CloudFront, Route 53, ACM)*

### Description des différents composants

#### Bucket S3

J'ai utilisé un bucket S3 pour stocker les fichiers statiques de mon blog (Amazon S3 est un service de stockage d'objets).

Pour configurer mon bucket S3 pour héberger mon site web statique, j'ai suivi les étapes suivantes:

- Créer un bucket S3 avec un nom unique.
- Laisser l'option 'Bloquer tous les accès publics' cochée.
- Télécharger les fichiers statiques de mon blog dans le bucket (via un pipeline CI/CD).

#### CloudFront

J'ai utilisé CloudFront pour améliorer les performances de mon blog en distribuant le contenu via un réseau mondial de serveurs (Amazon CloudFront est un service de distribution de contenu (CDN)).

Pour créer une distribution CloudFront et l'associer à mon bucket S3, j'ai suivi les étapes suivantes:

- Créer une distribution CloudFront avec l'origine pointant vers mon bucket S3.
- Configurer les paramètres de la distribution, comme les comportements de cache et les restrictions d'accès (restreindre l'accès au bucket seulement depuis la distribution CloudFront en créant une OAC (Origin Access Control) et en copiant la politique que vous allez ensuite coller dans S3 > *nom du bucket* > Autorisations > Stratégie de compartiment).
- Attendre que la distribution soit déployée (cela peut prendre quelques minutes).

CloudFront apporte plusieurs avantages à mon architecture:

- Mise en cache: CloudFront met en cache le contenu de mon blog sur ses serveurs, réduisant ainsi la latence pour les utilisateurs finaux.
- Réduction de la latence: Grâce à son réseau mondial de serveurs, CloudFront permet de servir le contenu à partir du serveur le plus proche de l'utilisateur.
- Protection contre les attaques DDoS: CloudFront offre une protection intégrée contre les attaques DDoS, améliorant ainsi la sécurité de mon blog.

#### Route 53

J'ai utilisé Route 53 pour gérer le nom de domaine de mon blog et rediriger les requêtes vers ma distribution CloudFront (Amazon Route 53 est un service de gestion de noms de domaine et de DNS).

Pour configurer Route 53, j'ai suivi les étapes suivantes (je possédais déjà mon nom de domaine via un autre service extérieur à AWS):

- Créer une zone hébergée et configurer mon nom de domaine pour utiliser des serveurs de noms.
- Créer un enregistrement DNS de type A pour mon nom de domaine, avec l'alias pointant vers ma distribution CloudFront.

#### AWS Certificate Manager (ACM)

J'ai utilisé ACM pour obtenir un certificat SSL/TLS et l'associer à ma distribution CloudFront. Cependant, même si j'ai bien utilisé le service ACM pour obtenir mon certificat, je l'ai fait directement via l'interface de CloudFront, sur ma distribution. J'ai suivi ces étapes:

- Sur CloudFront, sur l'interface de ma distribution, j'ai ajouté deux noms de domaine dans la rubrique 'Autres noms de domaine' (hugo-gualtieri.com et www.hugo-gualtieri.com).
- Ensuite on m'a demandé de sélectionner un certificat sauf que n'en ayant pas encore créé, il était proposé de créer le certificat. En cliquant sur le bouton de cette proposition, un certificat a été créé et également validé en ajoutant directement un enregistrement sur Route 53.
- Attendre que la distribution soit déployée (cela peut prendre quelques minutes).

## Avantages de cette architecture

### Performances élevées

Grâce à CloudFront, le contenu de mon blog est distribué via un réseau mondial de serveurs, réduisant ainsi la latence pour les utilisateurs finaux. De plus, la mise en cache du contenu permet d'améliorer les performances et de réduire la charge sur mon bucket S3.

### Simplicité de la gestion et de la maintenance

Route 53 et CloudFront sont des services qui ne requièrent aucune gestion et pour S3 très peu, avec une durabilité ~99.99999999999% et une disponibilité ~99.99%. Les mises à jour peuvent être facilement automatisées via un pipeline CI/CD, ce qui me permet de me concentrer sur la création de contenu pour mon blog.

### Coûts réduits

Comparé à une architecture dynamique, les coûts de stockage et de bande passante sont minimaux pour un site statique. De plus, CloudFront offre des tarifs compétitifs pour la distribution de contenu, ce qui me permet de garder les coûts de mon blog très bas.

## Conclusion

Dans cet article, j'ai présenté l'architecture de mon blog personnel, hébergé sur AWS avec S3, CloudFront et Route 53. Cette architecture offre plusieurs avantages, comme des performances élevées, une simplicité de gestion et de maintenance, et des coûts réduits.

Si cette architecture est amenée à évoluer, j'en ferai un nouvel article pour détailler les évolutions, les nouveaux choix d'architectures, etc...`,
  },
  {
    slug: "passer-une-certification-en-informatique",
    title: "Passer une certification en informatique",
    excerpt: "Comment se préparer pour passer une certification en informatique ? Je vous partage ma méthode pour me préparer et obtenir une certification.",
    category: "Formation",
    date: "11 juil 2025",
    readTime: "10 min",
    content: `## Introduction

J'ai récemment passé deux certifications en informatique: HashiCorp Terraform Associate et AWS Certified Solutions Architect Associate 🎉

Pour ça, j'ai bloqué quasiment 3 semaines pour m'y préparer et j'ai eu besoin d'un planning efficace qui me permettrait de passer ces certifications dans un temps réduit.

Et aujourd'hui, je vais vous partager ma méthode, comment je me suis organisé pour y arriver.

## Pourquoi passer une certification ?

Tout d'abord, rappelons pourquoi il est important de passer des certifications.

Dans mon cas, je commence à avoir quelques années d'expérience sur les sujets DevOps / Cloud et je souhaiterai évoluer vers un métier d'architecte tout en restant freelance. C'est pour cela que j'ai passé la certification AWS Certified Solutions Architect Associate et que je prévois de passer la Professional dans les prochains mois.

Ces certifications vont venir en plus de mes expériences confirmer le fait que j'ai le niveau pour endosser un rôle d'architecte, en plus de montrer des compétences spécifiques sur des technologies ou des cloud providers (AWS dans cet exemple).

Les certifications peuvent vous permettre de monter en compétences sur un sujet, attester d'un certain niveau et renforcer votre crédibilité. Cependant, des projets personnels et encore plus professionnels sont très appréciés pour décrocher des jobs / missions en lien avec ces sujets.

## Choisir la bonne certification

Avant de foncer sur la première certification venue, il faut se poser les bonnes questions:

- Quelles compétences possédez-vous déjà ?
- Quels sont vos objectifs à court/moyen terme ? (spécialisation, montée en compétences)
- Quels sont les besoins les plus recherchés sur le marché ? (AWS, Azure, Kubernetes, Terraform, etc...)
- Quel est mon niveau sur le sujet ? (Vous pouvez commencer par des niveaux 'Associate' sur AWS puis ensuite passer sur des certifications 'Professional')

Aussi, un passage sur LinkedIn et les offres d'emploi / missions peut vous donner une bonne idée des tendances.

## Construire un planning

Pour ça, il faut que vous ayez un objectif de date pour passer votre certification et également un état de votre niveau sur examen blanc de la certification.

Lors de la création de votre planning:

- Ne vous surchargez pas / Ne surestimez pas votre capacité de travail.
- Lorsque vous estimez une ressource à lire / vidéo à regarder, prévoyez 2 à 3 fois plus de temps pour correctement prendre des notes et également pratiquer si besoin.
- Prévoyez assez de temps pour correctement vous entraîner (passez des examens blancs).
- Insérer des moments pour reréviser les sujets que vous avez vu quelques jours plus tôt pour ancrer ça encore plus dans votre mémoire.

Pour la plupart des certifications, si vous avez un évènement inattendu qui vous ralentit dans votre préparation, vous pouvez jusqu'à 24 à 48h avant modifier votre créneau mais il est préférable de prévoir des imprévus possibles dans votre planning.

## Trouver les bonnes ressources pour se former

Le mieux est de multiplier les ressources pour être sûr d'avoir une formation complète:

- Documentation officielle (AWS, Azure, Microsoft Learn...): ressources très complètes mais cela peut prendre énormément de temps de tout voir et toutes les informations ne sont pas utiles pour préparer la certification.
- Formations en ligne (Udemy, Coursera, Tutorials Dojo, etc...): En général ces formations sont très pratiques et permettent de se préparer plus rapidement à la certification avec un contenu épuré.
- Livres, guides PDF, et forums (Stack Overflow, Reddit): Je vous conseille le subreddit r/AWSCertifications sur lequel pas mal de gens postent leurs réussites et leurs échecs sur les différentes certifications mais également certains leurs méthodes pour se préparer. J'ai piqué quelques conseils là dedans qui m'ont permis d'encore mieux me préparer !

## Pratiquer est indispensable

Ici, cela dépend de si vous avez déjà travaillé avec le sujet de la certification et de votre niveau.

Si vous avez besoin de revoir des cas pratiques ou carrément de vous former à la technologie dans l'objectif de passer la certification:

- Créez un lab local ou utilisez des sandboxes Cloud gratuits.
- Reproduisez des scénarios réels (déploiement, monitoring, CI/CD...).

Et que vous ayez besoin de pratiquer ou pas:

- Utilisez des flashcards (Quizlet par exemple) pour les notions théoriques.
- Faites des examens blancs pour vous mettre en condition (Udemy, Tutorials dojo, etc...)

## Prendre des notes

Prenez des notes sur les différents sujets que vous voyez pour être capable de rapidement réviser un sujet et que vous allez également compléter au fur et à mesures: cours, exercices, examens blancs.
Vous pouvez aussi vous faire des fiches sur les différences entre plusieurs services et également dans quels cas il est recommandé de les utiliser.

## Astuces pour le J

Ce conseil n'est pas vraiment pour le jour J mais plutôt pour la veille, préparez votre espace de travail pour la certification, déplacer des choses, dégager votre bureau, etc… pour ne pas avoir à le faire le jour de l'examen (peut-être que ça sera le matin tôt) et ne pas arriver stressé/pressé.

C'est un conseil assez personnel mais je ne change jamais mes routines avant des évènements importants et ici ça peut prendre en compte la veille avant de m'endormir pour avoir un sommeil de qualité, le petit déjeuner, etc...

Pendant l'examen:

- Lisez bien chaque question.
- Éliminez les mauvaises réponses.
- Revenez plus tard sur les questions difficiles.

Pas plus, pas moins, si vous vous êtes bien préparés, vous avez seulement à retenir ça pour ne pas faire d'erreurs d'inattention et vous sortir de cas où vous n'êtes pas sûr à 100%.

Pendant l'examen gardez votre calme et restez concentré, vous verrez bien le résultat. Vous avez normalement fait ce qu'il fallait en amont.

## Après l'examen: valorisation et suite

Une fois que vous avez obtenu votre certification, vous pouvez vous féliciter et faire fructifier cette nouvelle certification en:

- L'ajoutant à votre CV, dossier de compétences
- L'ajoutant à vos profils LinkedIn, Credly et de plateformes de freelance (si vous êtes inscrits dessus)
- Partageant un post sur LinkedIn pour le faire savoir à votre réseau

Vous pouvez également réfléchir à la prochaine certification qui pourrait faire évoluer votre profil !

## Conclusion

Pour bien se préparer à une certification informatique:

- Choisissez stratégiquement.
- Planifiez bien votre préparation.
- Formez-vous avec les bonnes ressources.
- Pratiquez autant que possible (bacs à sable, examens blancs, etc...).
- Faites vous des notes, fiches comparatives quand le cas s'y prête.
- Anticipez le jour J.

Chaque certification est un levier pour booster votre visibilité, renforcer votre crédibilité, et développer votre carrière.`,
  },
];

export const categoryColor: Record<string, string> = {
  DevOps: "text-primary",
  IA: "text-revenue-stripe",
  Business: "text-revenue-affiliate",
  Argent: "text-revenue-other",
  Cloud: "text-primary",
  Formation: "text-revenue-stripe",
};
