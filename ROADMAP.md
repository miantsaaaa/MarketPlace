# Roadmap de développement

Ce document définit l'ordre prévu pour le développement des fonctionnalités du projet **MarketPlace**.

L'objectif est de développer le projet progressivement, en respectant les dépendances entre les fonctionnalités et en validant chaque étape avant de passer à la suivante.

| Ordre | Feature                | Pages principales              |
| ----: | ---------------------- | ------------------------------ |
|     0 | Initialisation         | Projet, Git, DB, documentation |
|     1 | **Authentication**     | 7–8                            |
|     2 | **Password recovery**  | 9–10                           |
|     3 | **User & Roles**       | base des rôles                 |
|     4 | **Admin foundation**   | 36–38                          |
|     5 | **Categories**         | 4, 40                          |
|     6 | **Shops**              | 5, 23, 25                      |
|     7 | **Products & Catalog** | 1–3, 6, 26–28                  |
|     8 | **Cart**               | 13                             |
|     9 | **Checkout & Orders**  | 14, 17–18, 29–30, 41           |
|    10 | **Payment**            | 15–16, 42                      |
|    11 | **Delivery**           | 31–33, 43                      |
|    12 | **Reviews**            | 19, 44                         |
|    13 | **Support**            | 21–22, 34–35                   |
|    14 | **Notifications**      | 20                             |

## Règle de développement

Chaque feature doit être :

1. définie ;
2. préparée et documentée si nécessaire ;
3. développée sur une branche dédiée ;
4. testée ;
5. validée par l'équipe ;
6. fusionnée dans `develop` ;
7. puis intégrée dans `main` après validation de la version.

Aucune feature suivante ne doit commencer si une dépendance importante de la feature actuelle n'est pas validée.

## Organisation Git associée

La branche `main` représente une version stable et validée du projet.

La branche `develop` représente la version d'intégration destinée au développement de l'équipe.

Les fonctionnalités sont développées dans des branches dédiées créées depuis `develop`.

Exemple :

```text
main
  │
  └── develop
        │
        ├── feature/authentication
        ├── feature/password-recovery
        ├── feature/user-roles
        └── feature/admin-foundation
```

Les branches de fonctionnalités sont fusionnées dans `develop` après validation.

Lorsque l'ensemble des fonctionnalités prévues pour une version est stable, `develop` peut être fusionnée dans `main`.

## Ordre actuel

Le projet est actuellement au stade de l'**initialisation**.

La prochaine feature prévue est :

**Authentication**

Pages concernées :

* Connexion — `/login`
* Inscription — `/register`

Cette feature constitue la base nécessaire aux fonctionnalités suivantes, notamment la gestion des utilisateurs, des rôles et l'accès aux espaces protégés.
