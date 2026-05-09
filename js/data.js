const imageUrl = fileName => `images/photos/${fileName}.jpg`;

const PRODUCTS = [
  {
    id: 1,
    name: 'Шоколадный торт',
    category: 'cakes',
    categoryName: 'Торты',
    price: 28.90,
    image: imageUrl('chocolate-cake'),
    badge: 'Хит',
    weight: '1 кг',
    description: 'Нежный бисквит, шоколадный крем и легкая ягодная подача.'
  },
  {
    id: 2,
    name: 'Клубничный чизкейк',
    category: 'cakes',
    categoryName: 'Торты',
    price: 24.50,
    image: imageUrl('strawberry-cheesecake'),
    badge: 'Свежий',
    weight: '900 г',
    description: 'Сливочная основа, клубничный слой и песочная крошка.'
  },
  {
    id: 3,
    name: 'Медовик классический',
    category: 'cakes',
    categoryName: 'Торты',
    price: 22.00,
    image: imageUrl('honey-cake'),
    badge: 'Домашний',
    weight: '1 кг',
    description: 'Медовые коржи, мягкий сметанный крем и карамельные нотки.'
  },
  {
    id: 4,
    name: 'Эклер ванильный',
    category: 'pastry',
    categoryName: 'Пирожные',
    price: 3.20,
    image: imageUrl('vanilla-eclair'),
    badge: 'Новинка',
    weight: '1 шт.',
    description: 'Заварное тесто, ванильный крем и нежная глазурь.'
  },
  {
    id: 5,
    name: 'Макаруны ассорти',
    category: 'pastry',
    categoryName: 'Пирожные',
    price: 7.50,
    image: imageUrl('macarons'),
    badge: 'Ассорти',
    weight: '6 шт.',
    description: 'Набор из шести макарунов с разными кремовыми начинками.'
  },
  {
    id: 6,
    name: 'Тирамису порционное',
    category: 'pastry',
    categoryName: 'Пирожные',
    price: 6.90,
    image: imageUrl('tiramisu'),
    badge: 'Италия',
    weight: '180 г',
    description: 'Крем маскарпоне, кофе, какао и воздушная текстура.'
  },
  {
    id: 7,
    name: 'Овсяное печенье',
    category: 'cookies',
    categoryName: 'Печенье',
    price: 4.80,
    image: imageUrl('oat-cookies'),
    badge: 'К чаю',
    weight: '200 г',
    description: 'Домашнее печенье с овсяными хлопьями и шоколадными каплями.'
  },
  {
    id: 8,
    name: 'Печенье с шоколадом',
    category: 'cookies',
    categoryName: 'Печенье',
    price: 5.40,
    image: imageUrl('choco-cookies'),
    badge: 'Теплое',
    weight: '200 г',
    description: 'Хрустящее печенье с кусочками темного шоколада.'
  },
  {
    id: 9,
    name: 'Имбирные пряники',
    category: 'cookies',
    categoryName: 'Печенье',
    price: 6.10,
    image: imageUrl('gingerbread'),
    badge: 'Пряные',
    weight: '180 г',
    description: 'Ароматные пряники с корицей, имбирем и сахарной глазурью.'
  },
  {
    id: 10,
    name: 'Капучино',
    category: 'drinks',
    categoryName: 'Напитки',
    price: 4.20,
    image: imageUrl('cappuccino'),
    badge: 'Бариста',
    weight: '250 мл',
    description: 'Кофе с молочной пенкой, хорошо подходит к десертам.'
  },
  {
    id: 11,
    name: 'Горячий шоколад',
    category: 'drinks',
    categoryName: 'Напитки',
    price: 4.90,
    image: imageUrl('hot-chocolate'),
    badge: 'Какао',
    weight: '250 мл',
    description: 'Густой шоколадный напиток со сливочным вкусом.'
  },
  {
    id: 12,
    name: 'Ягодный лимонад',
    category: 'drinks',
    categoryName: 'Напитки',
    price: 3.80,
    image: imageUrl('berry-lemonade'),
    badge: 'Лед',
    weight: '300 мл',
    description: 'Освежающий лимонад с ягодами, цитрусом и мятой.'
  },
  {
    id: 13,
    name: 'Вишневый торт',
    category: 'cakes',
    categoryName: 'Торты',
    price: 26.70,
    image: imageUrl('cherry-cake'),
    badge: 'Ягоды',
    weight: '900 г',
    description: 'Нежные коржи, сливочный крем и вишневая прослойка с легкой кислинкой.'
  },
  {
    id: 14,
    name: 'Морковный торт',
    category: 'cakes',
    categoryName: 'Торты',
    price: 23.60,
    image: imageUrl('carrot-cake'),
    badge: 'С орехами',
    weight: '850 г',
    description: 'Пряный бисквит, крем-чиз, грецкие орехи и мягкий карамельный вкус.'
  },
  {
    id: 15,
    name: 'Капкейки ванильные',
    category: 'pastry',
    categoryName: 'Пирожные',
    price: 8.90,
    image: imageUrl('vanilla-cupcakes'),
    badge: 'Набор',
    weight: '4 шт.',
    description: 'Мини-кексы с ванильным кремом и аккуратной праздничной подачей.'
  },
  {
    id: 16,
    name: 'Капкейк карамельный',
    category: 'pastry',
    categoryName: 'Пирожные',
    price: 3.90,
    image: imageUrl('caramel-cupcake'),
    badge: 'Карамель',
    weight: '1 шт.',
    description: 'Мягкий кекс, карамельная начинка и сливочная шапка крема.'
  },
  {
    id: 17,
    name: 'Пончики с глазурью',
    category: 'pastry',
    categoryName: 'Пирожные',
    price: 6.80,
    image: imageUrl('donuts'),
    badge: 'Ассорти',
    weight: '3 шт.',
    description: 'Воздушные пончики с разной глазурью для кофе, чая или сладкого набора.'
  },
  {
    id: 18,
    name: 'Шоколадный брауни',
    category: 'pastry',
    categoryName: 'Пирожные',
    price: 5.70,
    image: imageUrl('brownie'),
    badge: 'Какао',
    weight: '160 г',
    description: 'Плотный шоколадный десерт с насыщенным вкусом какао и мягкой серединой.'
  },
  {
    id: 19,
    name: 'Айс-латте',
    category: 'drinks',
    categoryName: 'Напитки',
    price: 4.60,
    image: imageUrl('iced-latte'),
    badge: 'Холодный',
    weight: '300 мл',
    description: 'Охлажденный кофе с молоком и льдом для теплого дня.'
  },
  {
    id: 20,
    name: 'Матча-латте',
    category: 'drinks',
    categoryName: 'Напитки',
    price: 5.20,
    image: imageUrl('matcha-latte'),
    badge: 'Матча',
    weight: '250 мл',
    description: 'Мягкий зеленый чай матча с молоком и нежной сливочной текстурой.'
  }
];
