const mg = {
  common: {
    appName: 'MarketPlace',
    search: 'Hikaroka',
    searchPlaceholder: 'Hikaroka vokatra...',
    categories: 'Sokajy',
    products: 'Vokatra',
    shops: 'Fivarotana',
    product: 'Vokatra',
    shop: 'Fivarotana',
    price: 'Vidiny',
    stock: 'Tahiry',
    available: 'Misy',
    unavailable: 'Tsy misy',
    loading: 'Eo am-pampidirana...',
    retry: 'Andramo indray',
    cancel: 'Hanafoana',
    close: 'Hanakatona',
    viewDetails: 'Hijery ny antsipiriany',
    viewShop: 'Hijery ny fivarotana',
    back: 'Hiverina',
    language: 'Fiteny',
  },

  navigation: {
    home: 'Fandraisana',
    catalogue: 'Katalaogy',
    categories: 'Sokajy',
    shops: 'Fivarotana',
    login: 'Hiditra',
    register: 'Hisoratra anarana',
    account: 'Kaontiko',
  },

  catalogue: {
    title: 'Katalaogy',
    subtitle: 'Jereo ireo vokatra misy',
    allProducts: 'Vokatra rehetra',
    noProducts: 'Tsy misy vokatra hita.',
    noProductsForSearch:
      'Tsy misy vokatra mifanaraka amin’ny fikarohanao.',
    noProductsForCategory:
      'Tsy misy vokatra ao amin’ity sokajy ity.',
    filters: 'Sivana',
    clearFilters: 'Hamafa ny sivana',
    minPrice: 'Vidiny farany ambany',
    maxPrice: 'Vidiny farany ambony',
  },

  product: {
    details: 'Antsipirian’ny vokatra',
    description: 'Famaritana',
    price: 'Vidiny',
    stock: 'Tahiry misy',
    shop: 'Fivarotana',
    images: 'Sary',
    noDescription:
      'Tsy misy famaritana.',
    unavailable:
      'Tsy misy ity vokatra ity',
  },

  shop: {
    details:
      'Antsipirian’ny fivarotana',
    products:
      'Vokatra ao amin’ny fivarotana',
    noProducts:
      'Tsy manana vokatra ity fivarotana ity.',
    pending: 'Miandry',
    active: 'Mavitrika',
    suspended: 'Miato',
    closed: 'Mihidy',
  },

  category: {
    title: 'Sokajy',
    noCategories:
      'Tsy misy sokajy azo aseho.',
  },

  auth: {
    login: 'Hiditra',
    logout: 'Hivoaka',
    register: 'Hisoratra anarana',
    guest: 'Mpahatsidika',
    connectedUser:
      'Mpampiasa tafiditra',
    loginRequired:
      'Mila hiditra aloha',
    loginRequiredMessage:
      'Mila miditra ianao hampiasana ity tolotra ity.',
    loginOrRegister:
      'Midira na misorata anarana mba hitohizana.',
    loginTitle:
      'Hiditra amin’ny kaontinao',
    registerTitle:
      'Hamorona kaonty vaovao',
    emailLabel: 'Adiresy imailaka',
    emailPlaceholder:
      'ohatra@domaine.com',
    passwordLabel:
      'Tenypahatsiahivana',
    passwordPlaceholder:
      '••••••••',
    confirmPasswordLabel:
      'Hamafiso ny tenypahatsiahivana',
    firstNameLabel: 'Anarana',
    firstNamePlaceholder: 'John',
    lastNameLabel:
      'Mpanampy anarana',
    lastNamePlaceholder: 'Doe',
    phoneLabel: 'Laharana finday',
    phonePlaceholder:
      '+261 34 00 000 00',
    noAccount:
      'Mbola tsy manana kaonty?',
    alreadyAccount:
      'Efa manana kaonty?',
    loginSubmit: 'Hiditra',
    registerSubmit:
      'Hisoratra anarana',
    submitting: 'Andraso kely...',
    showPassword:
      'Asehoy ny teny miafina',
    hidePassword:
      'Afeno ny teny miafina',

    errors: {
      emailRequired:
        'Mila ampidirina ny imailaka.',
      emailInvalid:
        'Tsy mety ity imailaka ity.',
      passwordRequired:
        'Mila ampidirina ny tenypahatsiahivana.',
      passwordTooShort:
        'Tsy maintsy misy litera 8 farafahakeliny.',
      confirmPasswordRequired:
        'Mila hamafisina ny tenypahatsiahivana.',
      passwordsDoNotMatch:
        'Tsy mitovy ny tenypahatsiahivana.',
      firstNameRequired:
        'Mila ampidirina ny anarana.',
      lastNameRequired:
        'Mila ampidirina ny mpanampy anarana.',
      phoneRequired:
        'Mila ampidirina ny laharana finday.',
      phoneInvalid:
        'Tsy mety ity laharana finday ity.',
      loginFailed:
        'Diso ny imailaka na ny tenypahatsiahivana.',
      registerFailed:
        'Tsy nahomby ny fisoratana anarana. Manandrama indray.',
    },
  },

  profile: {
    title: 'Ny mombamomba ahy',
    subtitle:
      'Jereo sy tantano ny mombamomba anao sy ny andraikitrao.',
    personalInfo:
      'Mombamomba manokana',
    email: 'Adiresy imailaka',
    status: 'Sata',
    roles: 'Andraikitra',
    firstName: 'Anarana',
    lastName: 'Fanampin’anarana',
    phone: 'Laharana finday',
    saving: 'Mitahiry...',
    saveChanges:
      'Tehirizo ny fanovana',
    updateSuccess:
      'Voavao soa aman-tsara ny mombamomba anao.',
    roleSuccess:
      'Voahetsika soa aman-tsara ny andraikitrao.',

statusText: {
  PENDING: 'Miandry',
  ACTIVE: 'Mavitrika',
  INACTIVE: 'Tsy mavitrika',
  SUSPENDED: 'Miato',
  CLOSED: 'Mihidy',
  BANNED: 'Voarara',
},

    validation: {
      firstNameRequired:
        'Mila ampidirina ny anarana.',
      lastNameRequired:
        'Mila ampidirina ny fanampin’anarana.',
      invalidPhone:
        'Tsy mety ity laharana finday ity.',
    },

    rolesSection:
      'Fitantanana ny andraikitra',

    sellerRoleTitle:
      'Ho mpivarotra',
    sellerRoleDesc:
      'Alefaso ny andraikitra mpivarotra mba hamoronana sy hitantanana ny fivarotanao sy ny vokatrao.',
    activateSeller:
      'Alefaso ny andraikitra mpivarotra',

    deliveryRoleTitle:
      'Ho mpanatitra',
    deliveryRoleDesc:
      'Alefaso ny andraikitra mpanatitra mba hahafahana manao fanaterana ao amin’ny marketplace.',
    activateDelivery:
      'Alefaso ny andraikitra mpanatitra',

    alreadyActive:
      'Efa mavitrika',
    activating: 'Mampihetsika...',
  },

  states: {
    loading:
      'Eo am-pampidirana...',
    empty: 'Tsy misy valiny.',
    error:
      'Nisy olana nitranga.',
    apiError:
      'Tsy azo alaina avy amin’ny API ny angona.',
  },

  features: {
    cart:
      'Ampidiro ao anaty sarety',
    order: 'Hanafatra',
    review:
      'Hametraka hevitra',
    requiresLogin:
      'Mila miditra amin’ny kaonty ianao vao afaka mampiasa ity asa ity.',
  },

  language: {
    french: 'Frantsay',
    english: 'Anglisy',
    malagasy: 'Malagasy',
    malagasySoon:
      'Malagasy — Tsy ho ela',
    current:
      'Fiteny ampiasaina',
  },
} as const

export default mg