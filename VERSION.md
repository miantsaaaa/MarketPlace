# Version

## 0. Pages publiques (visiteur non connecté)

| # | Page                      | Route                 | Fonctionnalités                                                       | Tables                                      |  
| 1 | **Accueil** `P0`          | `/`                   | Produits mis en avant, catégories populaires, boutiques actives       | products, categories, shops                           |
| 2 | **Catalogue** `P0`        | `/products`           | Liste paginée, filtres (catégorie, boutique, prix), recherche texte   | products, categories, shops, product_images, stocks   |
| 3 | **Détail produit** `P0`   | `/products/:slug`     | Images, description, prix, disponibilité, boutique, avis              | products, product_images, stocks, shops, reviews      |
| 4 | **Détail catégorie** `P0` | `/categories/:slug`   | Produits de la catégorie                                              | categories, products                                    |
| 5 | **Détail boutique** `P0`  | `/shops/:slug`        | Vitrine de la boutique et ses produits                                | shops, products                                    |
| 6 | **Recherche** `P1`        | `/search?q=`          | Résultats transverses                                                 | products                                    |

> Pas de panier public : `carts.user_id` est `NOT NULL` dans le schéma — un panier appartient toujours à un utilisateur connecté. Un visiteur qui ajoute au panier doit d'abord se connecter

---

## 1. Authentification

| #     | Page                                      | Route                 | Fonctionnalités                                       | Tables            |
| 7     | **Connexion** `P0`                        | `/login`              | Email + mot de passe → JWT                            | users             |
| 8     | **Inscription** `P0`                      | `/register`           | Création de compte, rôle BUYER attribué par défaut    | users, roles, user_roles |
| 9     | **Mot de passe oublié** `P1`              | `/forgot-password`    | Envoi d'un lien de réinitialisation                   | users             |
| 10    | **Réinitialisation mot de passe** `P1`    | `/reset-password`     | Nouveau mot de passe                                  | users             |

---

## 2. Espace Acheteur (connecté, rôle `BUYER`)

| #  | Page                         | Route                                         | Fonctionnalités                                               | Tables                                                                 |
| 11 | **Mon profil** `P0`          | `/profile`                                    | Consulter/modifier prénom, nom, téléphone                                                     | users                                                                  |
| 12 | **Mes adresses** `P0`        | `/profile/addresses`                          | CRUD adresses, adresse par défaut                                                        | addresses                                                              |
| 13 | **Panier** `P0`              | `/cart`                                       | Ajouter/retirer/modifier quantité                                                      | carts, cart_items                                                      |
| 14 | **Checkout** `P0`            | `/checkout`                                   | Choix adresse de livraison, récapitulatif, validation                                                    | orders, order_items, addresses                                         |
| 15 | **Paiement** `P0`            | `/payment/:orderId`                           | Saisie / simulation du moyen de paiement                                                      | payments                                                               |
| 16 | **Résultat paiement** `P0`   | `/payment/:orderId/result`                    | Statut du paiement (réussi/échoué)                                                       | payments, payment_status_history                                       |
| 17 | **Mes commandes** `P0`       | `/orders`                                     | Historique des commandes                                                     | orders                                                                 |
| 18 | **Détail commande** `P0`     | `/orders/:id`                                 | Lignes achetées, timeline de statut, suivi de livraison, lien "laisser un avis"                                        | order_items, order_status_history, deliveries, delivery_status_history |
| 19 | **Laisser un avis** `P1`     | `/orders/:orderItemId/review`                 | Note (1-5) + commentaire, uniquement si acheté                                                        | reviews                                                                |
| 20 | **Notifications** `P1`       | `/notifications` (+ dropdown dans le header)  | Liste, marquer comme lu                                                            | notifications                                                          |
| 21 | **Mes tickets support** `P1` | `/support`                                    | Liste + création de ticket                                                        | support_tickets                                                        |
| 22 | **Détail ticket** `P1`       | `/support/:id`                                | Fil de messages avec le support                                                       | ticket_messages                                                        |
| 23 | **Devenir vendeur** `P0`     | `/become-seller`                              | Formulaire de création de boutique → bascule vers l'espace Vendeur                                                       | shops, user_roles                                                      |

---

## 3. Espace Vendeur (rôle `SELLER`)

| #     | Page                              | Route                         | Fonctionnalités                                                          | Tables                                        |
| 24    | **Tableau de bord vendeur** `P0`  | `/seller/dashboard`           | Ventes récentes, commandes en attente, stock bas                                                                      | order_items, stocks                           |
| 25    | **Ma boutique** `P0`              | `/seller/shop`                | Modifier nom, description, logo, statut                                                                   | shops                                         |
| 26    | **Mes produits** `P0`             | `/seller/products`            | Liste des produits de la boutique                                                                 | products                                      |
| 27    | **Créer un produit** `P0`         | `/seller/products/create`     | Formulaire + upload d'images + catégorie + prix (le stock se crée automatiquement à 0, cf. trigger DB)                                     | products, product_images, categories, stocks  |
| 28    | **Modifier un produit** `P0`      | `/seller/products/:id/edit`   | Édition + gestion du stock (quantité, seuil d'alerte)                                                                | products, product_images, stocks              |
| 29    | **Commandes reçues** `P0`         | `/seller/orders`              | Lignes de commande concernant leur boutique                                                                 | order_items, orders                           |
| 30    | **Détail commande reçue** `P0`    | `/seller/orders/:id`          | Changer le statut de préparation                                                              | order_status_history                          |

---

## 4. Espace Livreur (rôle `DELIVERY`)

| #     | Page                              | Route                     | Fonctionnalités                                                               | Tables                                         |
| 31    | **Tableau de bord livreur** `P0`  | `/delivery/dashboard`     | Livraisons assignées en cours                                                                         | deliveries                                     |
| 32    | **Mes livraisons** `P0`           | `/delivery/orders`        | Liste complète                                                                      | deliveries                                     |
| 33    | **Détail livraison** `P0`         | `/delivery/orders/:id`    | Adresse de destination, changement de statut (récupérée / en transit / livrée / échec + motif)                                                       | deliveries, delivery_status_history, addresses |

---

## 5. Espace Support (rôle `SUPPORT`)

| #     | Page                          | Route                         | Fonctionnalités                               | Tables                    |
| 34    | **File des tickets** `P1`     | `/support-agent/tickets`      | Tous les tickets, filtre par statut/priorité  | support_tickets           |
| 35    | **Traiter un ticket** `P1`    | `/support-agent/tickets/:id`  | Répondre, changer statut/priorité, fermer     | ticket_messages, support_tickets           |

---

## 6. Espace Admin (rôle `ADMIN`)

| #  | Page                                 | Route                 | Fonctionnalités                                                       | Tables                            |
| 36 | **Tableau de bord admin** `P0`       | `/admin/dashboard`    | Vue globale : nb utilisateurs, commandes, tickets ouverts             | (agrégats multi-tables)           |
| 37 | **Gestion des utilisateurs** `P0`    | `/admin/users`        | Liste, recherche, changer le statut (ACTIVE/SUSPENDED/BANNED)         | users                             |
| 38 | **Détail utilisateur** `P0`          | `/admin/users/:id`    | Attribuer/retirer un rôle (BUYER/SELLER/DELIVERY/SUPPORT/ADMIN)       | user_roles, roles                 |
| 39 | **Gestion des boutiques** `P0`       | `/admin/shops`        | Modération, changer le statut (PENDING → ACTIVE, SUSPENDED, CLOSED)   | shops                             |
| 40 | **Gestion des catégories** `P0`      | `/admin/categories`   | CRUD des catégories                                                   | categories                        |
| 41 | **Gestion des commandes** `P1`       | `/admin/orders`       | Vue globale de toutes les commandes                                   | orders                            |
| 42 | **Gestion des paiements** `P1`       | `/admin/payments`     | Vue globale, suivi des litiges                                        | payments, payment_status_history  |
| 43 | **Gestion des livraisons** `P1`      | `/admin/deliveries`   | Vue globale, réaffectation d'un livreur si besoin                     | deliveries                        |
| 44 | **Gestion des avis** `P1`            | `/admin/reviews`      | Modération (suppression d'avis abusifs)                               | reviews                           |
