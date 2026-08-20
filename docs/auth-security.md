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

## Étape 3 — Rôles et administration

### Endpoints admin (rôle ADMIN uniquement)
- `GET /api/admin/users` — liste tous les utilisateurs
- `PUT /api/admin/users/{id}/roles` — modifie les rôles d'un utilisateur
- `PUT /api/admin/users/{id}/status` — modifie le statut d'un utilisateur

Protection au niveau `SecurityConfig` : `.requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")`. Toute tentative d'accès par un rôle autre qu'ADMIN (ou sans authentification) reçoit `403 Forbidden`.

### Règles métier appliquées (AdminUserService)
- **BUYER ne peut jamais être retiré** — toute requête `PUT .../roles` sans `BUYER` dans la liste est rejetée (`400 Bad Request`).
- **SUPPORT et ADMIN ne peuvent être attribués que par un ADMIN** — appliqué de fait car l'endpoint entier est réservé à ROLE_ADMIN.
- **Seul un ADMIN peut modifier les rôles d'un autre utilisateur** — même logique.
- **Un ADMIN ne peut pas désactiver son propre compte** — vérification explicite `target.id == actingAdmin.id` avant tout changement de statut non-ACTIF (`400 Bad Request`).
- **Un compte désactivé ne peut plus s'authentifier** — `User.isEnabled()` retourne `false` si `status != ACTIVE`, ce qui bloque Spring Security dès la tentative de login.

### Cohérence JWT / rôles
- Les `authorities` Spring Security sont dérivées à la volée depuis `user.getRoles()` (relation `ManyToMany` avec la table `user_roles`), donc toujours synchronisées avec la base au moment de la génération du token.
- **Important** : un JWT existant n'est PAS invalidé automatiquement si les rôles changent en base — le token garde les rôles qu'il avait au moment de sa génération jusqu'à expiration. Un utilisateur doit se reconnecter (nouveau login) pour obtenir un JWT reflétant ses nouveaux rôles.

### Codes d'erreur
| Cas | Code |
|---|---|
| Non authentifié sur route protégée | 403 |
| Rôle insuffisant (accès admin) | 403 |
| JWT invalide | 403 |
| Règle métier violée (retrait BUYER, auto-désactivation) | 400 |
| Utilisateur cible introuvable | 404 |
| Login sur compte désactivé | 401 |

### Tests réalisés (13/13)
| Cas | Résultat |
|---|---|
| GET /api/admin/users sans authentification | 403 |
| GET /api/admin/users en BUYER | 403 |
| GET /api/admin/users en SELLER | 403 |
| GET /api/admin/users en DELIVERY | 403 |
| GET /api/admin/users en SUPPORT | 403 |
| GET /api/admin/users en ADMIN | 200 |
| JWT invalide | 403 |
| Retrait du rôle BUYER | 400 |
| Attribution ADMIN par un non-ADMIN | 403 |
| Attribution SUPPORT par un non-ADMIN | 403 |
| Désactivation d'un autre compte par ADMIN | 200 |
| Auto-désactivation d'un compte ADMIN | 400 |
| Login sur un compte désactivé | 401 |
