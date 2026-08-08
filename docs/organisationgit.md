main
│
└── develop
    │
    │
    ├── feature/database-schema
    │
    │       Responsable : Dev DB
    │
    │       Statut : ✅ TERMINÉE
    │
    │       Base PostgreSQL
    │       marketplace_db
    │
    │       Tables :
    │
    │       - users
    │       - roles
    │       - user_roles
    │       - shops
    │       - categories
    │       - products
    │       - product_images
    │       - stocks
    │       - carts
    │       - cart_items
    │       - addresses
    │       - orders
    │       - order_items
    │       - payments
    │       - deliveries
    │       - reviews
    │       - support_tickets
    │       - ticket_messages
    │       - notifications
    │       - *_status_history
    │
    │
    ├── feature/backend-core
    │
    │       Responsable : Dev Backend Lead
    │
    │       Socle Spring Boot
    │
    │       Fonctionnalités :
    │
    │       Architecture :
    │       - packages principaux
    │       - configuration application
    │       - profils environnement
    │
    │       Sécurité :
    │       - Spring Security
    │       - JWT Authentication
    │       - gestion permissions par rôle
    │
    │       API :
    │       - format réponse standard
    │       - gestion erreurs globale
    │       - validation DTO
    │       - pagination
    │       - Swagger/OpenAPI
    │
    │       Communication :
    │       - CORS
    │       - configuration frontend
    │       - configuration ngrok
    │
    │
    ├── feature/frontend-core
    │
    │       Responsable : Dev Frontend Lead
    │
    │       Socle React
    │
    │       Architecture :
    │       - structure dossiers
    │       - routing React Router
    │       - layout global
    │       - composants communs
    │       - design system
    │
    │       Communication :
    │       - Axios client
    │       - gestion token JWT
    │       - interceptors
    │       - gestion erreurs API
    │
    │       Etat :
    │       - Context API / Zustand / Redux
    │
    │
    ├── feature/authentication
    │
    │       Dev 1
    │
    │       BACKEND
    │       Tables :
    │       - users
    │       - roles
    │       - user_roles
    │
    │       API :
    │       - POST /auth/register
    │       - POST /auth/login
    │       - POST /auth/logout
    │       - GET /auth/me
    │
    │       Fonctionnalités :
    │       - création compte
    │       - connexion
    │       - génération JWT
    │       - validation rôle
    │
    │
    │       FRONTEND
    │
    │       Pages :
    │
    │       - /login
    │       - /register
    │       - /forgot-password
    │       - /reset-password
    │
    │       Composants :
    │
    │       - LoginForm
    │       - RegisterForm
    │       - ProtectedRoute
    │
    │
    ├── feature/user-management
    │
    │       Dev 1
    │
    │       BACKEND
    │
    │       Tables :
    │       - addresses
    │
    │       API :
    │       - GET /users/profile
    │       - PUT /users/profile
    │       - GET /users/address
    │       - POST /users/address
    │       - DELETE /users/address
    │
    │
    │       FRONTEND
    │
    │       Pages :
    │
    │       - /profile
    │       - /profile/address
    │       - /settings
    │
    │
    ├── feature/product-management
    │
    │       Dev 2
    │
    │       BACKEND
    │
    │       Tables :
    │       - shops
    │       - categories
    │       - products
    │       - product_images
    │       - stocks
    │
    │       API :
    │
    │       Catalogue :
    │       - GET /products
    │       - GET /products/{id}
    │       - GET /categories
    │
    │       Vendeur :
    │       - POST /seller/products
    │       - PUT /seller/products
    │       - DELETE /seller/products
    │       - gestion stock
    │       - gestion boutique
    │
    │
    │       FRONTEND
    │
    │       Acheteur :
    │
    │       Pages :
    │       - /
    │       - /products
    │       - /products/:id
    │       - /categories/:id
    │
    │       Fonctionnalités :
    │       - recherche
    │       - filtres
    │       - affichage images
    │       - détails produit
    │
    │
    │       Vendeur :
    │
    │       Pages :
    │       - /seller/dashboard
    │       - /seller/products
    │       - /seller/products/create
    │       - /seller/products/edit
    │       - /seller/shop
    │
    │
    ├── feature/order-management
    │
    │       Dev 3
    │
    │       BACKEND
    │
    │       Tables :
    │       - carts
    │       - cart_items
    │       - orders
    │       - order_items
    │       - order_status_history
    │
    │
    │       API :
    │       - panier
    │       - création commande
    │       - historique commande
    │       - changement statut
    │
    │
    │       FRONTEND
    │
    │       Pages :
    │
    │       - /cart
    │       - /checkout
    │       - /orders
    │       - /orders/:id
    │
    │
    ├── feature/payment
    │
    │       Dev 4
    │
    │       BACKEND
    │
    │       Tables :
    │       - payments
    │       - payment_status_history
    │
    │
    │       Fonctionnalités :
    │       - création paiement
    │       - validation paiement
    │       - historique paiement
    │
    │
    │       FRONTEND
    │
    │       Pages :
    │
    │       - /payment
    │       - /payment/result
    │       - /payment/history
    │
    │
    ├── feature/delivery
    │
    │       Dev 4
    │
    │       BACKEND
    │
    │       Tables :
    │       - deliveries
    │       - delivery_status_history
    │
    │       API :
    │       - affectation livreur
    │       - changement statut
    │       - suivi livraison
    │
    │
    │       FRONTEND
    │
    │       Livreur :
    │
    │       Pages :
    │       - /delivery/dashboard
    │       - /delivery/orders
    │       - /delivery/order/:id
    │
    │
    ├── feature/review-management
    │
    │       Dev 2 ou 3
    │
    │       BACKEND
    │
    │       Table :
    │       - reviews
    │
    │       Fonctionnalités :
    │       - création avis
    │       - notation produit
    │       - consultation avis
    │
    │
    │       FRONTEND
    │
    │       Pages :
    │
    │       - avis sur produit
    │       - formulaire notation
    │
    │
    ├── feature/support-management
    │
    │       Dev Support
    │
    │       BACKEND
    │
    │       Tables :
    │       - support_tickets
    │       - ticket_messages
    │
    │
    │       FRONTEND
    │
    │       Acheteur :
    │       - /support
    │       - /support/ticket/:id
    │
    │       Admin :
    │       - /admin/support
    │
    │
    └── feature/notification-management
            BACKEND

            Table :
            - notifications


            Fonctionnalités :

            - notifications commandes
            - notifications paiement
            - notifications livraison
            - notifications support


            FRONTEND

            Composants :

            - NotificationCenter
            - NotificationDropdown
            - historique notifications
