# Sécurité — Authentification (Étape 2)

## Stratégie
- Spring Security en mode **STATELESS** (pas de session serveur, tout repose sur le JWT).
- Authentification via header : `Authorization: Bearer <token>`
- CSRF désactivé (API REST pure, pas de formulaire serveur).

## Routes publiques (sans JWT)
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/shops/**`
- `GET /api/products/**`
- `GET /api/categories/**`
- `GET /api/stocks/**`

## Routes protégées
Toute route non listée ci-dessus nécessite un JWT valide. Sans token ou avec un token invalide/expiré → `403 Forbidden`.

## Structure du JWT
- Algorithme : HS256
- `sub` : email de l'utilisateur
- `userId` : id numérique
- `roles` : liste des rôles (ex: `ROLE_BUYER`)
- `iat` / `exp` : émission / expiration (durée par défaut : `jwt.expiration-ms` dans application.properties)

## Rôles préparés (infrastructure uniquement, pas d'espace métier)
BUYER, SELLER, DELIVERY, SUPPORT, ADMIN

## Tests réalisés
| Cas | Résultat |
|---|---|
| Sans token | 403 |
| Token valide | 200 |
| Token invalide (mauvaise signature) | 403 |
| Token expiré | 403 |
