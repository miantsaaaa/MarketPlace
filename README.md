# MarketPlace

## Description

MarketPlace est un projet de plateforme web dynamique permettant de mettre en relation des vendeurs et des acheteurs autour d'un espace unique.

Le projet vise à créer une marketplace moderne, évolutive et organisée permettant la gestion des produits, des utilisateurs, des commandes et des interactions entre les différents acteurs du système.

Le projet est actuellement en phase de conception et d'initialisation technique.

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
marketplace_db

Utilisateur :
marketplace_user

Le schéma initial est disponible dans :
database/schema/V1_initial_schema.sql

---

# État du projet

## Phase actuelle

Conception fonctionnelle terminée.

Initialisation technique validée.

---

## Base de données

Réalisé :

- Création de la base PostgreSQL.
- Création de l'utilisateur PostgreSQL.
- Exécution du script initial V1.
- Validation des tables et contraintes.

---

## Conception fonctionnelle

Réalisé :

- Type de marketplace défini.
- Marketplace multi-vendeurs choisie.
- Acteurs du système identifiés :
      - Acheteur
      - Vendeur
      - Livreur
      - Support
      - Administrateur

- Gestion des rôles définie.
- Permissions principales définies.

---

# Décisions validées

Les décisions suivantes ont été validées :

- Marketplace multi-vendeurs classique.
- Compte utilisateur unique avec gestion des rôles.
- Séparation claire des responsabilités entre acteurs.
- Frontend React + TypeScript.
- Backend Spring Boot.
- Base PostgreSQL.

---

## Projet général

En attente :

- Conception métier détaillée.
- Règles de gestion.
- Modèle conceptuel de données.
- Architecture technique détaillée.
- Développement des fonctionnalités métier.
- Connexion frontend ↔ backend.

---

# Documentation

La documentation est organisée dans le dossier :

docs/

Elle contient progressivement :

- Documentation fonctionnelle.
- Documentation technique.
- Diagrammes UML.
- Décisions d'architecture.

---

# Règle du projet

Le projet est construit étape par étape.

Aucune nouvelle technologie, fonctionnalité ou module ne doit être ajouté sans validation préalable.

La documentation précède la conception technique, qui précède le développement.

L'objectif est de maintenir un projet organisé, compréhensible et évolutif pour toute l'équipe.
