const en = {
  common: {
    appName: 'MarketPlace',
    search: 'Search',
    searchPlaceholder: 'Search for a product...',
    categories: 'Categories',
    products: 'Products',
    shops: 'Shops',
    product: 'Product',
    shop: 'Shop',
    price: 'Price',
    stock: 'Stock',
    available: 'Available',
    unavailable: 'Unavailable',
    loading: 'Loading...',
    retry: 'Retry',
    cancel: 'Cancel',
    close: 'Close',
    viewDetails: 'View details',
    viewShop: 'View shop',
    back: 'Back',
    language: 'Language',
  },

  navigation: {
    home: 'Home',
    catalogue: 'Catalogue',
    categories: 'Categories',
    shops: 'Shops',
    login: 'Login',
    register: 'Register',
    account: 'My account',
  },

  catalogue: {
    title: 'Catalogue',
    subtitle: 'Discover our products',
    allProducts: 'All products',
    noProducts: 'No products found.',
    noProductsForSearch: 'No products match your search.',
    noProductsForCategory: 'No products in this category.',
    filters: 'Filters',
    clearFilters: 'Clear filters',
    minPrice: 'Minimum price',
    maxPrice: 'Maximum price',
  },

  product: {
    details: 'Product details',
    description: 'Description',
    price: 'Price',
    stock: 'Available stock',
    shop: 'Shop',
    images: 'Images',
    noDescription: 'No description available.',
    unavailable: 'Product unavailable',
  },

  shop: {
    details: 'Shop details',
    products: 'Shop products',
    noProducts: 'This shop has no products.',
    pending: 'Pending',
    active: 'Active',
    suspended: 'Suspended',
    closed: 'Closed',
  },

  category: {
    title: 'Categories',
    noCategories: 'No categories available.',
  },

  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    guest: 'Guest',
    connectedUser: 'Logged-in user',
    loginRequired: 'Login required',
    loginRequiredMessage:
      'You must be logged in to use this feature.',
    loginOrRegister: 'Log in or register to continue.',
  },

  states: {
    loading: 'Loading...',
    empty: 'No results.',
    error: 'An error occurred.',
    apiError: 'Unable to retrieve data from the API.',
  },

  features: {
    cart: 'Add to cart',
    order: 'Order',
    review: 'Leave a review',
    requiresLogin: 'This feature requires login.',
  },

  language: {
    french: 'French',
    english: 'English',
    malagasy: 'Malagasy',
    malagasySoon: 'Malagasy — Coming soon',
    current: 'Current language',
  },
} as const

export default en
