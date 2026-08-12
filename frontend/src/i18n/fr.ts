const fr = {
  common: {
    appName: 'MarketPlace',
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher un produit...',
    categories: 'Catégories',
    products: 'Produits',
    shops: 'Boutiques',
    product: 'Produit',
    shop: 'Boutique',
    price: 'Prix',
    stock: 'Stock',
    available: 'Disponible',
    unavailable: 'Indisponible',
    loading: 'Chargement...',
    retry: 'Réessayer',
    cancel: 'Annuler',
    close: 'Fermer',
    viewDetails: 'Voir les détails',
    viewShop: 'Voir la boutique',
    back: 'Retour',
    language: 'Langue',
  },

  navigation: {
    home: 'Accueil',
    catalogue: 'Catalogue',
    categories: 'Catégories',
    shops: 'Boutiques',
    login: 'Connexion',
    register: 'Inscription',
    account: 'Mon compte',
  },

  catalogue: {
    title: 'Catalogue',
    subtitle: 'Découvrez nos produits',
    allProducts: 'Tous les produits',
    noProducts: 'Aucun produit trouvé.',
    noProductsForSearch: 'Aucun produit ne correspond à votre recherche.',
    noProductsForCategory: 'Aucun produit dans cette catégorie.',
    filters: 'Filtres',
    clearFilters: 'Effacer les filtres',
    minPrice: 'Prix minimum',
    maxPrice: 'Prix maximum',
  },

  product: {
    details: 'Détail du produit',
    description: 'Description',
    price: 'Prix',
    stock: 'Stock disponible',
    shop: 'Boutique',
    images: 'Images',
    noDescription: 'Aucune description disponible.',
    unavailable: 'Produit indisponible',
  },

  shop: {
    details: 'Détail de la boutique',
    products: 'Produits de la boutique',
    noProducts: 'Cette boutique ne propose aucun produit.',
    pending: 'En attente',
    active: 'Active',
    suspended: 'Suspendue',
    closed: 'Fermée',
  },

  category: {
    title: 'Catégories',
    noCategories: 'Aucune catégorie disponible.',
  },

  auth: {
    login: 'Connexion',
    logout: 'Déconnexion',
    register: 'Inscription',
    guest: 'Visiteur',
    connectedUser: 'Utilisateur connecté',
    loginRequired: 'Connexion requise',
    loginRequiredMessage:
      'Vous devez être connecté pour utiliser cette fonctionnalité.',
    loginOrRegister: 'Connectez-vous ou inscrivez-vous pour continuer.',
  },

  states: {
    loading: 'Chargement...',
    empty: 'Aucun résultat.',
    error: 'Une erreur est survenue.',
    apiError: "Impossible de récupérer les données depuis l'API.",
  },

  features: {
    cart: 'Ajouter au panier',
    order: 'Commander',
    review: 'Laisser un avis',
    requiresLogin: 'Cette fonctionnalité nécessite une connexion.',
  },

  language: {
    french: 'Français',
    english: 'Anglais',
    malagasy: 'Malagasy',
    malagasySoon: 'Malagasy — Bientôt',
    current: 'Langue actuelle',
  },
} as const

export default fr
