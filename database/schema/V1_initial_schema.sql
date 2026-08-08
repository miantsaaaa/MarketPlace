-- =====================================================================
-- MarketPlace DB -- Schema relationnel initial (V1)
-- Base de donnees cible : marketplace_db
-- Role applicatif       : marketplace_user
--
-- Genere a partir du document "Modele relationnel PostgreSQL"
-- =====================================================================
--
-- HYPOTHESES ET CHOIX TECHNIQUES
-- (le document ne precisait pas tout ; ajustez librement si ces choix
--  ne correspondent pas exactement a vos besoins)
--
--  1. Cles primaires   : BIGINT GENERATED ALWAYS AS IDENTITY
--  2. Horodatage       : TIMESTAMPTZ ; created_at/updated_at avec
--                        DEFAULT now(), rafraichis automatiquement par
--                        un trigger generique sur chaque UPDATE
--  3. Statuts/priorites: VARCHAR + CHECK listant les valeurs autorisees
--                        (a adapter selon vos regles metier reelles)
--  4. Montants         : NUMERIC(12,2) ; devise : CHAR(3) (ISO 4217),
--                        defaut 'MGA' (Ariary malgache), a adapter
--  5. Slug produit      : unique PAR boutique -> UNIQUE(shop_id, slug)
--                        et non globalement unique
--  6. Politique ON DELETE :
--       - tables entierement dependantes de leur parent
--         (product_images, stocks, cart_items, ticket_messages,
--          order_items, payments, deliveries, *_status_history,
--          user_roles, notifications, carts, addresses)  -> CASCADE
--       - colonnes explicitement facultatives dans le document
--         (courier_user_id, assigned_to_user_id, changed_by_user_id,
--          order_items.product_id / shop_id)              -> SET NULL
--       - entites "proprietaires" referencees ailleurs et dont
--         l'historique doit etre protege (users, shops, products,
--         categories, addresses referencees par des commandes...)
--                                                           -> RESTRICT
--         Preferez une suppression logique (colonnes status/is_active)
--         a une suppression physique pour ces entites.
--  7. notifications.reference_type/reference_id est une association
--     polymorphe : impossible de creer une vraie FK, un CHECK
--     restreint donc les valeurs possibles de reference_type.
--  8. Deux regles metier du document sont appliquees par trigger car
--     elles ne sont pas exprimables par un simple CHECK :
--       - un produit doit toujours posseder une fiche stock
--         (creee automatiquement, a 0, a l'insertion du produit)
--       - un livreur (deliveries.courier_user_id) doit posseder le
--         role DELIVERY
--     La regle "payments.amount doit correspondre au total de la
--     commande" est volontairement laissee a la charge de
--     l'application plutot qu'imposee par trigger, pour rester
--     compatible avec d'eventuels paiements partiels/remboursements.
--  9. Ordre de creation : la section "Adresses" a ete avancee avant
--     "Commandes" par rapport au document, car orders et deliveries
--     referencent addresses.
--
-- =====================================================================

SET client_encoding = 'UTF8';

BEGIN;

-- =====================================================================
-- Fonction utilitaire : rafraichit updated_at a chaque UPDATE
-- =====================================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- #######################################################################
-- 1. TABLES D'IDENTITE ET D'ACCES
-- #######################################################################

-- -----------------------------------------------------------------------
-- users
-- -----------------------------------------------------------------------
CREATE TABLE users (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name    VARCHAR(100)  NOT NULL,
    last_name     VARCHAR(100)  NOT NULL,
    email         VARCHAR(255)  NOT NULL,
    phone         VARCHAR(30),
    password_hash VARCHAR(255)  NOT NULL,
    status        VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE',
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT uq_users_email UNIQUE (email),
    CONSTRAINT chk_users_status CHECK (status IN ('ACTIVE','INACTIVE','SUSPENDED','BANNED'))
);
COMMENT ON TABLE users IS 'Utilisateurs enregistres sur la plateforme';

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------
-- roles
-- -----------------------------------------------------------------------
CREATE TABLE roles (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code        VARCHAR(20)  NOT NULL,
    name        VARCHAR(50)  NOT NULL,
    description TEXT,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_roles_code UNIQUE (code),
    CONSTRAINT uq_roles_name UNIQUE (name),
    CONSTRAINT chk_roles_code CHECK (code IN ('BUYER','SELLER','DELIVERY','SUPPORT','ADMIN'))
);
COMMENT ON TABLE roles IS 'Roles disponibles dans la marketplace';

CREATE TRIGGER trg_roles_updated_at
BEFORE UPDATE ON roles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Roles de base (valeurs enumerees dans le document de conception)
INSERT INTO roles (code, name, description) VALUES
    ('BUYER',    'Acheteur',       'Utilisateur pouvant parcourir le catalogue et passer des commandes'),
    ('SELLER',   'Vendeur',        'Utilisateur pouvant gerer une boutique et ses produits'),
    ('DELIVERY', 'Livreur',        'Utilisateur pouvant etre affecte a des livraisons'),
    ('SUPPORT',  'Support',        'Utilisateur pouvant traiter les tickets d''assistance'),
    ('ADMIN',    'Administrateur', 'Utilisateur disposant des droits d''administration complets');

-- -----------------------------------------------------------------------
-- user_roles
-- -----------------------------------------------------------------------
CREATE TABLE user_roles (
    user_id     BIGINT      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id     BIGINT      NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT pk_user_roles PRIMARY KEY (user_id, role_id)
);
COMMENT ON TABLE user_roles IS 'Table de liaison entre utilisateurs et roles';

CREATE INDEX idx_user_roles_role_id ON user_roles (role_id);

-- #######################################################################
-- 2. TABLES DU CATALOGUE
-- #######################################################################

-- -----------------------------------------------------------------------
-- shops
-- -----------------------------------------------------------------------
CREATE TABLE shops (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_user_id BIGINT        NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    name          VARCHAR(150)  NOT NULL,
    slug          VARCHAR(170)  NOT NULL,
    description   TEXT,
    logo_url      VARCHAR(500),
    status        VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT uq_shops_owner_user_id UNIQUE (owner_user_id),
    CONSTRAINT uq_shops_slug UNIQUE (slug),
    CONSTRAINT chk_shops_status CHECK (status IN ('PENDING','ACTIVE','SUSPENDED','CLOSED'))
);
COMMENT ON TABLE shops IS 'Boutiques des vendeurs (un vendeur = une boutique)';

CREATE TRIGGER trg_shops_updated_at
BEFORE UPDATE ON shops
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------
-- categories
-- -----------------------------------------------------------------------
CREATE TABLE categories (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR(150) NOT NULL,
    slug        VARCHAR(170) NOT NULL,
    description TEXT,
    is_active   BOOLEAN      NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_categories_name UNIQUE (name),
    CONSTRAINT uq_categories_slug UNIQUE (slug)
);
COMMENT ON TABLE categories IS 'Categories de produits';

CREATE TRIGGER trg_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------
-- products
-- -----------------------------------------------------------------------
CREATE TABLE products (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    shop_id     BIGINT        NOT NULL REFERENCES shops(id) ON DELETE RESTRICT,
    category_id BIGINT        NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name        VARCHAR(200)  NOT NULL,
    slug        VARCHAR(220)  NOT NULL,
    description TEXT,
    unit_price  NUMERIC(12,2) NOT NULL,
    currency    CHAR(3)       NOT NULL DEFAULT 'MGA',
    is_active   BOOLEAN       NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT uq_products_shop_slug UNIQUE (shop_id, slug),
    CONSTRAINT chk_products_unit_price CHECK (unit_price >= 0)
);
COMMENT ON TABLE products IS 'Produits proposes a la vente par les boutiques';

CREATE INDEX idx_products_shop_id ON products (shop_id);
CREATE INDEX idx_products_category_id ON products (category_id);
CREATE INDEX idx_products_is_active ON products (is_active);

CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------
-- product_images
-- -----------------------------------------------------------------------
CREATE TABLE product_images (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id BIGINT       NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url  VARCHAR(500) NOT NULL,
    alt_text   VARCHAR(255),
    sort_order INTEGER      NOT NULL DEFAULT 0,
    is_primary BOOLEAN      NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);
COMMENT ON TABLE product_images IS 'Images associees aux produits';

CREATE INDEX idx_product_images_product_id ON product_images (product_id);

-- Au plus une image principale par produit (transforme la
-- recommandation du document en regle stricte)
CREATE UNIQUE INDEX uq_product_images_one_primary
ON product_images (product_id)
WHERE is_primary = true;

-- -----------------------------------------------------------------------
-- stocks
-- -----------------------------------------------------------------------
CREATE TABLE stocks (
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id         BIGINT      NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity_available INTEGER     NOT NULL DEFAULT 0,
    quantity_reserved  INTEGER     NOT NULL DEFAULT 0,
    reorder_threshold  INTEGER     NOT NULL DEFAULT 0,
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_stocks_product_id UNIQUE (product_id),
    CONSTRAINT chk_stocks_quantity_available CHECK (quantity_available >= 0),
    CONSTRAINT chk_stocks_quantity_reserved CHECK (quantity_reserved >= 0),
    CONSTRAINT chk_stocks_reorder_threshold CHECK (reorder_threshold >= 0)
);
COMMENT ON TABLE stocks IS 'Etat du stock de chaque produit';

CREATE TRIGGER trg_stocks_updated_at
BEFORE UPDATE ON stocks
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Garantit la regle "un produit doit posseder un stock" : une fiche
-- stock (a 0) est creee automatiquement a la creation d'un produit.
CREATE OR REPLACE FUNCTION create_stock_for_new_product()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO stocks (product_id, quantity_available, quantity_reserved, reorder_threshold)
    VALUES (NEW.id, 0, 0, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_create_stock
AFTER INSERT ON products
FOR EACH ROW EXECUTE FUNCTION create_stock_for_new_product();

-- #######################################################################
-- 3. TABLES DU PANIER
-- #######################################################################

-- -----------------------------------------------------------------------
-- carts
-- -----------------------------------------------------------------------
CREATE TABLE carts (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id    BIGINT      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status     VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_carts_user_id UNIQUE (user_id),
    CONSTRAINT chk_carts_status CHECK (status IN ('ACTIVE','ABANDONED','CONVERTED'))
);
COMMENT ON TABLE carts IS 'Panier actif d''un utilisateur (un seul panier actif par utilisateur)';

CREATE TRIGGER trg_carts_updated_at
BEFORE UPDATE ON carts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------
-- cart_items
-- -----------------------------------------------------------------------
CREATE TABLE cart_items (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cart_id             BIGINT        NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id          BIGINT        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity            INTEGER       NOT NULL,
    unit_price_snapshot NUMERIC(12,2) NOT NULL,
    created_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT uq_cart_items_cart_product UNIQUE (cart_id, product_id),
    CONSTRAINT chk_cart_items_quantity CHECK (quantity > 0),
    CONSTRAINT chk_cart_items_unit_price CHECK (unit_price_snapshot >= 0)
);
COMMENT ON TABLE cart_items IS 'Produits selectionnes dans un panier';

CREATE INDEX idx_cart_items_cart_id ON cart_items (cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items (product_id);

CREATE TRIGGER trg_cart_items_updated_at
BEFORE UPDATE ON cart_items
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- #######################################################################
-- 4. TABLES DES ADRESSES
--    (avancees avant les commandes : orders et deliveries en dependent)
-- #######################################################################

CREATE TABLE addresses (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id        BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label          VARCHAR(50),
    recipient_name VARCHAR(150) NOT NULL,
    phone          VARCHAR(30),
    address_line1  VARCHAR(255) NOT NULL,
    address_line2  VARCHAR(255),
    city           VARCHAR(100) NOT NULL,
    region         VARCHAR(100),
    postal_code    VARCHAR(20),
    country        VARCHAR(100) NOT NULL,
    is_default     BOOLEAN      NOT NULL DEFAULT false,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT now()
);
COMMENT ON TABLE addresses IS 'Adresses enregistrees par les utilisateurs';

CREATE INDEX idx_addresses_user_id ON addresses (user_id);

CREATE TRIGGER trg_addresses_updated_at
BEFORE UPDATE ON addresses
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- #######################################################################
-- 5. TABLES DES COMMANDES
-- #######################################################################

-- -----------------------------------------------------------------------
-- orders
-- -----------------------------------------------------------------------
CREATE TABLE orders (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_number        VARCHAR(50)   NOT NULL,
    user_id             BIGINT        NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status              VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    total_amount        NUMERIC(12,2) NOT NULL,
    currency            CHAR(3)       NOT NULL DEFAULT 'MGA',
    shipping_address_id BIGINT        NOT NULL REFERENCES addresses(id) ON DELETE RESTRICT,
    placed_at           TIMESTAMPTZ   NOT NULL DEFAULT now(),
    created_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT uq_orders_order_number UNIQUE (order_number),
    CONSTRAINT chk_orders_total_amount CHECK (total_amount >= 0),
    CONSTRAINT chk_orders_status CHECK (status IN ('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED'))
);
COMMENT ON TABLE orders IS 'Commandes globales passees par les utilisateurs';

CREATE INDEX idx_orders_user_id ON orders (user_id);
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_shipping_address_id ON orders (shipping_address_id);

CREATE TRIGGER trg_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------
-- order_items
-- -----------------------------------------------------------------------
CREATE TABLE order_items (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id              BIGINT        NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id            BIGINT        REFERENCES products(id) ON DELETE SET NULL,
    shop_id               BIGINT        REFERENCES shops(id) ON DELETE SET NULL,
    product_name_snapshot VARCHAR(200)  NOT NULL,
    shop_name_snapshot    VARCHAR(150)  NOT NULL,
    quantity              INTEGER       NOT NULL,
    unit_price_snapshot   NUMERIC(12,2) NOT NULL,
    line_total            NUMERIC(12,2) NOT NULL,
    created_at            TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT uq_order_items_order_product UNIQUE (order_id, product_id),
    CONSTRAINT chk_order_items_quantity CHECK (quantity > 0),
    CONSTRAINT chk_order_items_unit_price CHECK (unit_price_snapshot >= 0),
    CONSTRAINT chk_order_items_line_total CHECK (line_total = quantity * unit_price_snapshot)
);
COMMENT ON TABLE order_items IS 'Lignes de commande (immuables, prix/noms figes au moment de l''achat)';

CREATE INDEX idx_order_items_order_id ON order_items (order_id);
CREATE INDEX idx_order_items_product_id ON order_items (product_id);
CREATE INDEX idx_order_items_shop_id ON order_items (shop_id);

-- -----------------------------------------------------------------------
-- payments
-- -----------------------------------------------------------------------
CREATE TABLE payments (
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id          BIGINT        NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    payment_reference VARCHAR(50)   NOT NULL,
    provider_name     VARCHAR(50)   NOT NULL,
    payment_method    VARCHAR(30)   NOT NULL,
    amount            NUMERIC(12,2) NOT NULL,
    currency          CHAR(3)       NOT NULL DEFAULT 'MGA',
    status            VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    paid_at           TIMESTAMPTZ,
    created_at        TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT uq_payments_order_id UNIQUE (order_id),
    CONSTRAINT uq_payments_reference UNIQUE (payment_reference),
    CONSTRAINT chk_payments_amount CHECK (amount >= 0),
    CONSTRAINT chk_payments_status CHECK (status IN ('PENDING','AUTHORIZED','PAID','FAILED','REFUNDED','CANCELLED'))
    -- NB : "amount doit correspondre au total de la commande" (regle du
    -- document) est volontairement laisse a l'application plutot qu'a
    -- un trigger, pour rester compatible avec des paiements partiels
    -- ou des remboursements eventuels.
);
COMMENT ON TABLE payments IS 'Paiement d''une commande (un paiement par commande)';

CREATE TRIGGER trg_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------
-- deliveries
-- -----------------------------------------------------------------------
CREATE TABLE deliveries (
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id           BIGINT      NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    courier_user_id    BIGINT      REFERENCES users(id) ON DELETE SET NULL,
    address_id         BIGINT      NOT NULL REFERENCES addresses(id) ON DELETE RESTRICT,
    delivery_reference VARCHAR(50) NOT NULL,
    status             VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    assigned_at        TIMESTAMPTZ,
    picked_up_at       TIMESTAMPTZ,
    delivered_at       TIMESTAMPTZ,
    failed_reason      TEXT,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_deliveries_order_id UNIQUE (order_id),
    CONSTRAINT uq_deliveries_reference UNIQUE (delivery_reference),
    CONSTRAINT chk_deliveries_status CHECK (status IN ('PENDING','ASSIGNED','PICKED_UP','IN_TRANSIT','DELIVERED','FAILED','CANCELLED'))
);
COMMENT ON TABLE deliveries IS 'Livraison associee a une commande (une livraison par commande)';

CREATE INDEX idx_deliveries_courier_user_id ON deliveries (courier_user_id);
CREATE INDEX idx_deliveries_address_id ON deliveries (address_id);
CREATE INDEX idx_deliveries_status ON deliveries (status);

CREATE TRIGGER trg_deliveries_updated_at
BEFORE UPDATE ON deliveries
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Garantit la regle "un livreur doit posseder le role DELIVERY"
CREATE OR REPLACE FUNCTION check_courier_has_delivery_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.courier_user_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1
            FROM user_roles ur
            JOIN roles r ON r.id = ur.role_id
            WHERE ur.user_id = NEW.courier_user_id
              AND r.code = 'DELIVERY'
        ) THEN
            RAISE EXCEPTION 'L''utilisateur % n''a pas le role DELIVERY', NEW.courier_user_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_deliveries_check_courier_role
BEFORE INSERT OR UPDATE OF courier_user_id ON deliveries
FOR EACH ROW EXECUTE FUNCTION check_courier_has_delivery_role();

-- #######################################################################
-- 6. TABLES DES AVIS
-- #######################################################################

CREATE TABLE reviews (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id       BIGINT      NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    order_item_id BIGINT      NOT NULL REFERENCES order_items(id) ON DELETE RESTRICT,
    product_id    BIGINT      NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    rating        SMALLINT    NOT NULL,
    comment       TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_reviews_order_item_id UNIQUE (order_item_id),
    CONSTRAINT chk_reviews_rating CHECK (rating BETWEEN 1 AND 5)
);
COMMENT ON TABLE reviews IS 'Avis laisses par les utilisateurs apres achat';

CREATE INDEX idx_reviews_product_id ON reviews (product_id);
CREATE INDEX idx_reviews_user_id ON reviews (user_id);

CREATE TRIGGER trg_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- #######################################################################
-- 7. TABLES DU SUPPORT
-- #######################################################################

-- -----------------------------------------------------------------------
-- support_tickets
-- -----------------------------------------------------------------------
CREATE TABLE support_tickets (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_number       VARCHAR(50)  NOT NULL,
    created_by_user_id  BIGINT       NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    assigned_to_user_id BIGINT       REFERENCES users(id) ON DELETE SET NULL,
    subject             VARCHAR(200) NOT NULL,
    description         TEXT         NOT NULL,
    priority            VARCHAR(10)  NOT NULL DEFAULT 'MEDIUM',
    status              VARCHAR(20)  NOT NULL DEFAULT 'OPEN',
    closed_at           TIMESTAMPTZ,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_support_tickets_ticket_number UNIQUE (ticket_number),
    CONSTRAINT chk_support_tickets_priority CHECK (priority IN ('LOW','MEDIUM','HIGH','URGENT')),
    CONSTRAINT chk_support_tickets_status CHECK (status IN ('OPEN','IN_PROGRESS','RESOLVED','CLOSED'))
);
COMMENT ON TABLE support_tickets IS 'Demandes d''assistance creees par les utilisateurs';

CREATE INDEX idx_support_tickets_created_by ON support_tickets (created_by_user_id);
CREATE INDEX idx_support_tickets_assigned_to ON support_tickets (assigned_to_user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets (status);

CREATE TRIGGER trg_support_tickets_updated_at
BEFORE UPDATE ON support_tickets
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------
-- ticket_messages
-- -----------------------------------------------------------------------
CREATE TABLE ticket_messages (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id      BIGINT      NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    sender_user_id BIGINT      NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    message        TEXT        NOT NULL,
    is_internal    BOOLEAN     NOT NULL DEFAULT false,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE ticket_messages IS 'Echanges lies a un ticket support';

CREATE INDEX idx_ticket_messages_ticket_id ON ticket_messages (ticket_id);
CREATE INDEX idx_ticket_messages_sender_user_id ON ticket_messages (sender_user_id);

-- #######################################################################
-- 8. TABLE DES NOTIFICATIONS
-- #######################################################################

CREATE TABLE notifications (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id        BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type           VARCHAR(50)  NOT NULL,
    title          VARCHAR(150) NOT NULL,
    message        TEXT         NOT NULL,
    reference_type VARCHAR(20),
    reference_id   BIGINT,
    is_read        BOOLEAN      NOT NULL DEFAULT false,
    read_at        TIMESTAMPTZ,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT chk_notifications_reference_type CHECK (reference_type IS NULL OR reference_type IN ('ORDER','DELIVERY','PAYMENT','TICKET'))
);
COMMENT ON TABLE notifications IS 'Notifications envoyees aux utilisateurs (reference_type/reference_id = association polymorphe vers orders/deliveries/payments/support_tickets)';

CREATE INDEX idx_notifications_user_unread ON notifications (user_id, is_read);

-- #######################################################################
-- 9. TABLES D'HISTORIQUE DES STATUTS
-- #######################################################################

-- -----------------------------------------------------------------------
-- order_status_history
-- -----------------------------------------------------------------------
CREATE TABLE order_status_history (
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id           BIGINT      NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    old_status         VARCHAR(20),
    new_status         VARCHAR(20) NOT NULL,
    changed_by_user_id BIGINT      REFERENCES users(id) ON DELETE SET NULL,
    reason             TEXT,
    changed_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_order_status_history_old CHECK (old_status IS NULL OR old_status IN ('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED')),
    CONSTRAINT chk_order_status_history_new CHECK (new_status IN ('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED'))
);
COMMENT ON TABLE order_status_history IS 'Historique des changements d''etat d''une commande';

CREATE INDEX idx_order_status_history_order_id ON order_status_history (order_id);

-- -----------------------------------------------------------------------
-- delivery_status_history
-- -----------------------------------------------------------------------
CREATE TABLE delivery_status_history (
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    delivery_id        BIGINT      NOT NULL REFERENCES deliveries(id) ON DELETE CASCADE,
    old_status         VARCHAR(20),
    new_status         VARCHAR(20) NOT NULL,
    changed_by_user_id BIGINT      REFERENCES users(id) ON DELETE SET NULL,
    reason             TEXT,
    changed_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_delivery_status_history_old CHECK (old_status IS NULL OR old_status IN ('PENDING','ASSIGNED','PICKED_UP','IN_TRANSIT','DELIVERED','FAILED','CANCELLED')),
    CONSTRAINT chk_delivery_status_history_new CHECK (new_status IN ('PENDING','ASSIGNED','PICKED_UP','IN_TRANSIT','DELIVERED','FAILED','CANCELLED'))
);
COMMENT ON TABLE delivery_status_history IS 'Historique des changements d''etat d''une livraison';

CREATE INDEX idx_delivery_status_history_delivery_id ON delivery_status_history (delivery_id);

-- -----------------------------------------------------------------------
-- payment_status_history
-- -----------------------------------------------------------------------
CREATE TABLE payment_status_history (
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payment_id         BIGINT      NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    old_status         VARCHAR(20),
    new_status         VARCHAR(20) NOT NULL,
    changed_by_user_id BIGINT      REFERENCES users(id) ON DELETE SET NULL,
    reason             TEXT,
    changed_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_payment_status_history_old CHECK (old_status IS NULL OR old_status IN ('PENDING','AUTHORIZED','PAID','FAILED','REFUNDED','CANCELLED')),
    CONSTRAINT chk_payment_status_history_new CHECK (new_status IN ('PENDING','AUTHORIZED','PAID','FAILED','REFUNDED','CANCELLED'))
);
COMMENT ON TABLE payment_status_history IS 'Historique des changements d''etat d''un paiement';

CREATE INDEX idx_payment_status_history_payment_id ON payment_status_history (payment_id);

COMMIT;