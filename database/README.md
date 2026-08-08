# Configuration de la base de données PostgreSQL

## Objectif du document

Ce document présente la configuration de la base de données PostgreSQL utilisée par la marketplace.

Il sert de référence pour :

- l'équipe backend ;
- la configuration Spring Boot ;
- les migrations SQL ;
- le déploiement de l'environnement de développement.

---

# Système de gestion de base de données

## Technologie retenue

SGBD :

PostgreSQL

Version :

PostgreSQL 18.3

---

# Base de données du projet

Nom de la base :

marketplace_db

Rôle :

Cette base contient toutes les données métier de la marketplace :

- utilisateurs ;
- rôles ;
- boutiques ;
- produits ;
- commandes ;
- paiements ;
- livraisons ;
- support ;
- notifications.

---

# Utilisateur PostgreSQL dédié

Afin de respecter les bonnes pratiques de sécurité, l'application n'utilise pas le compte administrateur PostgreSQL `postgres`.

Un utilisateur spécifique au projet est utilisé.

Nom utilisateur :

marketplace_user

Mot de passe :

marketplacepasswd

En environnement partagé ou production :

- utiliser des variables d'environnement ;
- ne jamais versionner les mots de passe dans Git.

---

# Paramètres de connexion

| Paramètre     | Valeur            |
| SGBD          | PostgreSQL        |
| Version       | 18.3              |
| Hôte          | localhost         |
| Port          | 5432              |
| Base          | marketplace_db    |
| Utilisateur   | marketplace_user  |

---

# Création initiale

Les commandes exécutées pour initialiser la base :

```sql
CREATE DATABASE marketplace_db;

CREATE USER marketplace_user 
WITH PASSWORD 'marketplacepasswd';

GRANT ALL PRIVILEGES 
ON DATABASE marketplace_db 
TO marketplace_user;
