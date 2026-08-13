# Routage ngrok du Marketplace

## 1. Objectif

Le Marketplace doit être accessible depuis Internet à travers une seule URL publique ngrok.

L'objectif est de permettre à un utilisateur externe d'accéder au frontend React et aux API Spring Boot à partir du même domaine.

## 2. Architecture retenue

Le Marketplace utilise un seul tunnel ngrok avec un routage basé sur le chemin de l'URL.

```text
Internet
    │
    ▼
https://overapt-alfredo-extensive.ngrok-free.dev
    │
    ├── / ──────────────► React / Vite
    │                    localhost:5173
    │
    └── /api/* ─────────► Spring Boot
                         localhost:8080
                              │
                              ▼
                         PostgreSQL
```

## 3. Routage

| Chemin public | Service cible         | Port local |
| ------------- | --------------------- | ---------: |
| `/`           | Frontend React / Vite |     `5173` |
| `/api/*`      | Backend Spring Boot   |     `8080` |

### Frontend

L'URL publique principale est :

```text
https://overapt-alfredo-extensive.ngrok-free.dev/
```

Elle doit servir l'application React/Vite.

### Backend

Les endpoints du backend restent accessibles sous le préfixe `/api`.

Exemples :

```text
https://overapt-alfredo-extensive.ngrok-free.dev/api/products
https://overapt-alfredo-extensive.ngrok-free.dev/api/categories
```

Ils doivent être redirigés vers :

```text
http://localhost:8080/api/products
http://localhost:8080/api/categories
```

## 4. Configuration locale actuelle

### Frontend

```text
http://localhost:5173
```

Technologies :

* React
* Vite
* TypeScript

### Backend

```text
http://localhost:8080
```

Technologies :

* Spring Boot
* Java
* Spring Data JPA

### Base de données

```text
PostgreSQL
localhost:5432
marketplace_db
```

## 5. Principe de communication

Le frontend doit utiliser des chemins d'API relatifs plutôt qu'une URL ngrok backend distincte.

Exemple recommandé :

```text
/api/products
/api/categories
```

Le frontend n'a donc pas besoin de connaître une deuxième URL publique pour le backend.

Lorsque l'application est accessible via ngrok :

```text
https://overapt-alfredo-extensive.ngrok-free.dev
```

une requête frontend vers :

```text
/api/products
```

devient :

```text
https://overapt-alfredo-extensive.ngrok-free.dev/api/products
```

## 6. Avantages de cette architecture

Cette architecture permet :

* d'utiliser une seule URL publique ;
* d'exposer le frontend et le backend avec un seul tunnel ngrok ;
* de conserver une séparation claire entre frontend et backend ;
* d'éviter l'utilisation de deux domaines ngrok différents ;
* de simplifier la configuration des appels API du frontend ;
* de rapprocher l'environnement local d'une architecture de déploiement réelle.

## 7. Décision du projet

La décision retenue pour le Marketplace est :

> Le Marketplace sera exposé par un seul tunnel ngrok, avec `/` pour React/Vite et `/api/*` pour Spring Boot.

Cette décision doit être respectée lors de la configuration de l'exposition publique du projet.

## 8. État

**Statut : Décision validée**

La prochaine étape consiste à configurer le routage du tunnel ngrok afin que les deux services soient accessibles à travers cette architecture.
