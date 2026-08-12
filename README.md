# MarketPlace

## Description

MarketPlace est un projet de plateforme web dynamique permettant de mettre en relation des vendeurs et des acheteurs autour d'un espace unique.

Le projet vise à créer une marketplace moderne, évolutive et organisée permettant la gestion des produits, des utilisateurs, des commandes et des interactions entre les différents acteurs du système.

Le projet est développé progressivement selon une méthodologie structurée basée sur des branches Git dédiées, la validation des fonctionnalités et leur intégration dans la branche `develop`.

---

# Objectif

Créer une marketplace multi-vendeurs moderne en suivant une méthodologie de développement structurée.

Le projet est organisé avec une séparation claire entre :

- Frontend
- Backend
- Base de données
- Documentation

Chaque étape du projet doit être validée avant de passer à la suivante.

---

# Architecture générale

MarketPlace/

│
├── backend/marketplace-backend/
│ └── Application Spring Boot.
│ Responsable de la logique métier,
│ des API REST, de la sécurité
│ et de la communication avec la base de données.
│
├── frontend/
│ └── Application React.
│ Responsable de l'interface utilisateur,
│ de la navigation et des interactions.
│
├── database/
│ └── Scripts et ressources liés
│ à la base de données PostgreSQL.
│
├── docs/
│ └── Documentation fonctionnelle,
│ technique et diagrammes UML.
│
├── .gitignore
│ └── Configuration des fichiers ignorés par Git.
│
└── README.md
   └── Documentation principale du projet.

---

# Technologies utilisées

## Frontend

Technologies choisies :

- React
- TypeScript
- Vite
- ESLint

Responsabilité :

- Interface utilisateur
- Navigation
- Communication avec les API backend
- Expérience utilisateur

---

## Backend

Technologies choisies :

- Spring Boot 4.0.7
- Java 21
- Maven
- Spring Data JPA
- Hibernate

Responsabilité :

- API REST
- Logique métier
- Gestion des utilisateurs
- Sécurité
- Communication avec PostgreSQL

---

## Base de données

Technologies choisies :

- PostgreSQL 18.3

Base utilisée :

`marketplace_db`

Utilisateur :

`marketplace_user`

Le schéma initial est disponible dans :

`database/schema/V1_initial_schema.sql`

---

# État du projet

## Phase actuelle

**Développement et intégration des fonctionnalités P0.**

La conception fonctionnelle et l'initialisation technique sont terminées.

Plusieurs fonctionnalités ont déjà été développées sur des branches dédiées, testées puis intégrées dans `develop`.

La branche `develop` constitue actuellement la branche d'intégration du projet.

---

## Fonctionnalités intégrées

### 1. Infrastructure frontend

Réalisé :

- Initialisation de React + TypeScript + Vite.
- Configuration du client API frontend.
- Configuration des variables d'environnement API.
- Mise en place des services frontend.
- Mise en place des types TypeScript.
- Gestion générique des états des requêtes API.
- Internationalisation du frontend.
- Gestion de l'état visiteur/utilisateur.

---

### 2. API Boutique

Réalisé :

- Endpoint de liste des boutiques.
- Endpoint de détail d'une boutique.
- Gestion des ressources inexistantes avec réponse `404`.
- Relation entre une boutique et son propriétaire avec JPA.

---

### 3. Catalogue

Réalisé :

- Page catalogue.
- Navigation vers le catalogue.
- Recherche de produits.
- Filtrage par catégorie.
- Affichage des produits.
- Navigation vers le détail d'un produit.
- Gestion des états de chargement.
- Gestion des erreurs API.
- Gestion du cas où aucune catégorie n'est disponible.
- Gestion du cas où aucun produit n'est disponible.
- Intégration du catalogue frontend avec l'API backend.
- Prise en charge des réponses paginées de l'API.
- Configuration CORS entre le frontend et le backend.

---

## Fonctionnalités en cours / prochaines étapes

Selon la roadmap du projet :

1. Authentication
2. Password recovery
3. User & Roles
4. Admin foundation
5. Categories
6. Shops
7. Products & Catalog
8. Cart
9. Checkout & Orders
10. Payment
11. Delivery
12. Reviews
13. Support
14. Notifications

L'ordre détaillé et les pages associées sont disponibles dans :

`ROADMAP.md`

La définition des pages et fonctionnalités prévues est disponible dans :

`VERSION.md`

---

# Historique des intégrations dans `develop`

Les fonctionnalités sont développées sur des branches dédiées puis intégrées dans `develop` après validation.

### Frontend Integration

Branche :

`feature/frontend-integration`

Principales réalisations :

- Client API frontend.
- Services API.
- Types TypeScript.
- Internationalisation.
- Gestion de l'état utilisateur/visiteur.

Merge dans `develop` :

`8dce1c9`

---

### Shop API

Branche :

`feature/shop-api`

Principales réalisations :

- API des boutiques.
- Endpoint liste.
- Endpoint détail.
- Gestion des erreurs `404`.
- Relation JPA entre `Shop` et son propriétaire.

Merge dans `develop` :

`ad8ca6b`

---

### Catalogue Frontend

Branche :

`feature/catalogue-page`

Principales réalisations :

- Page catalogue.
- Recherche.
- Filtrage par catégorie.
- Navigation produit.
- Gestion des erreurs.
- Internationalisation.
- Interface catalogue.

Intégration dans `develop` :

`01fa671`

---

### Catalogue API

Branche :

`feature/catalogue-api`

Principales réalisations :

- API catalogue.
- Endpoint produits.
- Recherche.
- Filtres.
- Pagination.
- Intégration avec le frontend.

Commit principal :

`e89919e`

Intégration dans `develop` :

`fc99a4e`

---

### Shop Products Endpoint

Commit :

`1b72e74`

Fonctionnalité :

- Ajout de l'endpoint permettant de récupérer les produits d'une boutique.

---

### Frontend Catalogue ↔ API

Commit actuel :

`0174a6d`

Fonctionnalité :

- Adaptation du frontend aux réponses paginées de l'API.
- Intégration du catalogue avec l'API backend.
- Gestion des catégories paginées.
- Gestion des produits paginés.
- Configuration CORS.
- Amélioration de la gestion des chargements et erreurs.

---

# Git Workflow

Le projet utilise une organisation Git basée sur trois niveaux principaux :

```text
main
 │
 └── develop
      │
      ├── feature/authentication
      ├── feature/password-recovery
      ├── feature/user-roles
      ├── feature/admin-foundation
      ├── feature/categories
      ├── feature/shops
      └── feature/products-catalog
Règle de développement

Chaque feature doit être :

définie ;
préparée et documentée si nécessaire ;
développée sur une branche dédiée ;
testée ;
validée par l'équipe ;
fusionnée dans develop ;
puis intégrée dans main après validation de la version.

La branche main représente une version stable et validée.

La branche develop représente la version d'intégration destinée au développement de l'équipe.

Les branches feature/* sont utilisées pour développer les fonctionnalités indépendamment.

Décisions validées

Les décisions suivantes ont été validées :

Marketplace multi-vendeurs classique.
Compte utilisateur unique avec gestion des rôles.
Séparation claire des responsabilités entre acteurs.
Frontend React + TypeScript.
Backend Spring Boot.
Base PostgreSQL.
Architecture frontend/backend séparée.
API REST pour la communication frontend ↔ backend.
Développement par branches Git dédiées.
Intégration des fonctionnalités dans develop avant leur intégration dans main.
Conception fonctionnelle

Les acteurs principaux du système sont :

Acheteur
Vendeur
Livreur
Support
Administrateur

Les rôles et permissions principales sont définis dans la documentation fonctionnelle.

Documentation

La documentation est organisée dans le dossier :

docs/

Elle contient progressivement :

Documentation fonctionnelle.
Documentation technique.
Diagrammes UML.
Décisions d'architecture.

Les documents principaux du projet sont :

README.md — présentation générale du projet.
ROADMAP.md — ordre de développement des fonctionnalités.
VERSION.md — pages et fonctionnalités prévues.
Règle du projet

Le projet est construit étape par étape.

Aucune nouvelle technologie, fonctionnalité ou module ne doit être ajouté sans validation préalable.

La documentation précède la conception technique, qui précède le développement.

Chaque fonctionnalité doit être développée, testée et validée avant son intégration dans develop.

L'objectif est de maintenir un projet organisé, compréhensible, maintenable et évolutif pour toute l'équipe.