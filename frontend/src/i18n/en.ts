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
    noProductsForSearch:
      'No products match your search.',
    noProductsForCategory:
      'No products in this category.',
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
    noDescription:
      'No description available.',
    unavailable: 'Product unavailable',
  },

  shop: {
    details: 'Shop details',
    products: 'Shop products',
    noProducts:
      'This shop has no products.',
    pending: 'Pending',
    active: 'Active',
    suspended: 'Suspended',
    closed: 'Closed',
  },

  category: {
    title: 'Categories',
    noCategories:
      'No categories available.',
  },

  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    guest: 'Guest',
    connectedUser: 'Connected user',
    loginRequired: 'Login required',
    loginRequiredMessage:
      'You must be logged in to use this feature.',
    loginOrRegister:
      'Log in or register to continue.',
    loginTitle: 'Log in to your account',
    registerTitle: 'Create a new account',
    emailLabel: 'Email address',
    emailPlaceholder: 'example@domain.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    confirmPasswordLabel:
      'Confirm password',
    firstNameLabel: 'First name',
    firstNamePlaceholder: 'John',
    lastNameLabel: 'Last name',
    lastNamePlaceholder: 'Doe',
    phoneLabel: 'Phone number',
    phonePlaceholder: '+261 34 00 000 00',
    noAccount:
      "Don't have an account yet?",
    alreadyAccount:
      'Already have an account?',
    loginSubmit: 'Sign in',
    registerSubmit: 'Sign up',
    submitting: 'Please wait...',
    showPassword: 'Show password',
    hidePassword: 'Hide password',

    errors: {
      emailRequired:
        'Email address is required.',
      emailInvalid:
        'Invalid email address.',
      passwordRequired:
        'Password is required.',
      passwordTooShort:
        'Password must be at least 8 characters.',
      confirmPasswordRequired:
        'Confirming password is required.',
      passwordsDoNotMatch:
        'Passwords do not match.',
      firstNameRequired:
        'First name is required.',
      lastNameRequired:
        'Last name is required.',
      phoneRequired:
        'Phone number is required.',
      phoneInvalid:
        'Invalid phone number.',
      loginFailed:
        'Invalid email or password.',
      registerFailed:
        'Registration failed. Please try again.',
    },
  },

  profile: {
    title: 'My profile',
    subtitle:
      'View and manage your personal information and roles.',
    personalInfo: 'Personal information',
    email: 'Email address',
    status: 'Status',
    roles: 'Roles',
    firstName: 'First name',
    lastName: 'Last name',
    phone: 'Phone number',
    saving: 'Saving...',
    saveChanges: 'Save changes',
    updateSuccess:
      'Your profile has been updated successfully.',
    roleSuccess:
      'Your role has been activated successfully.',

statusText: {
  PENDING: 'Pending',
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SUSPENDED: 'Suspended',
  CLOSED: 'Closed',
  BANNED: 'Banned',
},

    validation: {
      firstNameRequired:
        'First name is required.',
      lastNameRequired:
        'Last name is required.',
      invalidPhone:
        'Invalid phone number.',
    },

    rolesSection: 'Role management',

    sellerRoleTitle: 'Become a seller',
    sellerRoleDesc:
      'Activate the seller role to create and manage your shop and products.',
    activateSeller: 'Activate seller role',

    deliveryRoleTitle: 'Become a delivery driver',
    deliveryRoleDesc:
      'Activate the delivery role to perform deliveries on the marketplace.',
    activateDelivery:
      'Activate delivery role',

    alreadyActive: 'Already active',
    activating: 'Activating...',
  },

  states: {
    loading: 'Loading...',
    empty: 'No results.',
    error: 'An error occurred.',
    apiError:
      'Unable to retrieve data from the API.',
  },

  features: {
    cart: 'Add to cart',
    order: 'Order',
    review: 'Leave a review',
    requiresLogin:
      'This feature requires login.',
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