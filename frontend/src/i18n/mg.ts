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
noProductsForSearch: 'Tsy misy vokatra mifanaraka amin’ny fikarohanao.',
noProductsForCategory: 'Tsy misy vokatra ao amin’ity sokajy ity.',
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
noDescription: 'Tsy misy famaritana.',
unavailable: 'Tsy misy ity vokatra ity',
},

shop: {
details: 'Antsipirian’ny fivarotana',
products: 'Vokatra ao amin’ny fivarotana',
noProducts: 'Tsy manana vokatra ity fivarotana ity.',
pending: 'Miandry',
active: 'Mavitrika',
suspended: 'Miato',
closed: 'Mihidy',
},

category: {
title: 'Sokajy',
noCategories: 'Tsy misy sokajy azo aseho.',
},

auth: {
login: 'Hiditra',
logout: 'Hivoaka',
register: 'Hisoratra anarana',
guest: 'Mpitsidika',
connectedUser: 'Mpampiasa tafiditra',
loginRequired: 'Ilaina ny fidirana',
loginRequiredMessage:
'Mila miditra amin’ny kaontinao ianao vao afaka mampiasa ity asa ity.',
loginOrRegister:
'Midira na manorata anarana mba hanohizana.',
},

states: {
loading: 'Eo am-pampidirana...',
empty: 'Tsy misy valiny.',
error: 'Nisy olana nitranga.',
apiError: 'Tsy azo alaina avy amin’ny API ny angona.',
},

features: {
cart: 'Ampidiro ao anaty sarety',
order: 'Hanafatra',
review: 'Hametraka hevitra',
requiresLogin: 'Mila miditra amin’ny kaonty ianao vao afaka mampiasa ity asa ity.',
},

language: {
french: 'Frantsay',
english: 'Anglisy',
malagasy: 'Malagasy',
malagasySoon: 'Malagasy — Tsy ho ela',
current: 'Fiteny ampiasaina',
},
} as const

export default mg
