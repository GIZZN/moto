import React from 'react';
import type { Product, Category } from '../types';
import { 
  Bike,
  Wind,
  Zap,
  Mountain,
  Trophy,
  Gauge,
  Shield,
  Settings
} from 'lucide-react';

// Централизованное хранилище товаров для всего приложения
export const productsData: Product[] = [
  {
    id: 1,
    name: 'Yamaha YZF-R1',
    price: 1599000,
    image: '/images/products/placeholder1.jpg',
    category: 'Спортивные',
    rating: 4.9,
    slug: 'yamaha-yzf-r1'
  },
  {
    id: 2,
    name: 'Harley-Davidson Street 750',
    price: 899000,
    image: '/images/products/placeholder2.jpg',
    category: 'Круизеры',
    rating: 4.7,
    slug: 'harley-davidson-street-750'
  },
  {
    id: 3,
    name: 'BMW R 1250 GS Adventure',
    price: 2199000,
    image: '/images/products/placeholder3.jpg',
    category: 'Туристические',
    rating: 4.9,
    slug: 'bmw-r1250-gs-adventure'
  },
  {
    id: 4,
    name: 'Ducati Panigale V4',
    price: 2899000,
    image: '/images/products/placeholder4.jpg',
    category: 'Спортивные',
    rating: 4.8,
    slug: 'ducati-panigale-v4'
  },
  {
    id: 5,
    name: 'Honda CRF450L',
    price: 749000,
    image: '/images/products/placeholder5.jpg',
    category: 'Эндуро',
    rating: 4.6,
    slug: 'honda-crf450l'
  },
  {
    id: 6,
    name: 'Kawasaki Ninja ZX-10R',
    price: 1799000,
    image: '/images/products/placeholder6.jpg',
    category: 'Спортивные',
    rating: 4.8,
    slug: 'kawasaki-ninja-zx10r'
  },
  {
    id: 7,
    name: 'Indian Scout Bobber',
    price: 1399000,
    image: '/images/products/placeholder7.jpg',
    category: 'Круизеры',
    rating: 4.7,
    slug: 'indian-scout-bobber'
  },
  {
    id: 8,
    name: 'Suzuki V-Strom 1050',
    price: 1299000,
    image: '/images/products/placeholder9.jpg',
    category: 'Туристические',
    rating: 4.6,
    slug: 'suzuki-v-strom-1050'
  },
  {
    id: 9,
    name: 'KTM 390 Duke',
    price: 599000,
    image: '/images/products/placeholder8.jpg',
    category: 'Нейкеды',
    rating: 4.7,
    slug: 'ktm-390-duke'
  },
  {
    id: 10,
    name: 'Triumph Street Triple RS',
    price: 1499000,
    image: '/images/products/placeholder10.jpg',
    category: 'Нейкеды',
    rating: 4.9,
    slug: 'triumph-street-triple-rs'
  },
  {
    id: 11,
    name: 'Yamaha MT-09',
    price: 1099000,
    image: '/images/products/placeholder11.jpg',
    category: 'Нейкеды',
    rating: 4.8,
    slug: 'yamaha-mt-09'
  },
  {
    id: 12,
    name: 'Honda Africa Twin',
    price: 1699000,
    image: '/images/products/placeholder12.jpg',
    category: 'Туристические',
    rating: 4.8,
    slug: 'honda-africa-twin'
  },
  {
    id: 13,
    name: 'Aprilia RSV4',
    price: 2499000,
    image: '/images/products/placeholder13.jpg',
    category: 'Спортивные',
    rating: 4.9,
    slug: 'aprilia-rsv4'
  },
  {
    id: 14,
    name: 'MV Agusta F4',
    price: 3299000,
    image: '/images/products/placeholder14.jpg',
    category: 'Спортивные',
    rating: 4.8,
    slug: 'mv-agusta-f4'
  },
  {
    id: 15,
    name: 'Harley-Davidson Fat Boy',
    price: 1999000,
    image: '/images/products/placeholder15.jpg',
    category: 'Круизеры',
    rating: 4.7,
    slug: 'harley-davidson-fat-boy'
  },
  {
    id: 16,
    name: 'Triumph Rocket 3',
    price: 2499000,
    image: '/images/products/placeholder16.jpg',
    category: 'Круизеры',
    rating: 4.8,
    slug: 'triumph-rocket-3'
  },
  {
    id: 17,
    name: 'Yamaha FJR1300',
    price: 1899000,
    image: '/images/products/placeholder17.jpg',
    category: 'Туристические',
    rating: 4.7,
    slug: 'yamaha-fjr1300'
  },
  {
    id: 18,
    name: 'KTM 1290 Super Adventure',
    price: 2099000,
    image: '/images/products/placeholder18.jpg',
    category: 'Туристические',
    rating: 4.8,
    slug: 'ktm-1290-super-adventure'
  },
  {
    id: 19,
    name: 'KTM 450 EXC-F',
    price: 999000,
    image: '/images/products/placeholder19.jpg',
    category: 'Эндуро',
    rating: 4.7,
    slug: 'ktm-450-exc-f'
  },
  {
    id: 20,
    name: 'Husqvarna FE 501',
    price: 1149000,
    image: '/images/products/placeholder20.jpg',
    category: 'Эндуро',
    rating: 4.8,
    slug: 'husqvarna-fe-501'
  },
  {
    id: 21,
    name: 'Yamaha WR450F',
    price: 899000,
    image: '/images/products/placeholder21.jpg',
    category: 'Эндуро',
    rating: 4.6,
    slug: 'yamaha-wr450f'
  },
  {
    id: 22,
    name: 'Ducati Monster 821',
    price: 1299000,
    image: '/images/products/placeholder22.jpg',
    category: 'Нейкеды',
    rating: 4.7,
    slug: 'ducati-monster-821'
  },
  {
    id: 23,
    name: 'BMW F 900 R',
    price: 1199000,
    image: '/images/products/placeholder23.jpg',
    category: 'Нейкеды',
    rating: 4.8,
    slug: 'bmw-f-900-r'
  },
  {
    id: 24,
    name: 'Kawasaki Z900',
    price: 999000,
    image: '/images/products/placeholder24.jpg',
    category: 'Нейкеды',
    rating: 4.7,
    slug: 'kawasaki-z900'
  },
  {
    id: 25,
    name: 'Royal Enfield Classic 350',
    price: 399000,
    image: '/images/products/placeholder25.jpg',
    category: 'Классика',
    rating: 4.5,
    slug: 'royal-enfield-classic-350'
  },
  {
    id: 26,
    name: 'Triumph Bonneville T120',
    price: 1499000,
    image: '/images/products/placeholder26.jpg',
    category: 'Классика',
    rating: 4.8,
    slug: 'triumph-bonneville-t120'
  },
  {
    id: 27,
    name: 'Moto Guzzi V7',
    price: 1099000,
    image: '/images/products/placeholder27.jpg',
    category: 'Классика',
    rating: 4.6,
    slug: 'moto-guzzi-v7'
  },
  {
    id: 28,
    name: 'BMW R nineT',
    price: 1799000,
    image: '/images/products/placeholder28.jpg',
    category: 'Классика',
    rating: 4.9,
    slug: 'bmw-r-ninet'
  },
  {
    id: 29,
    name: 'Шлем AGV K6',
    price: 29900,
    image: '/images/products/placeholder29.jpg',
    category: 'Экипировка',
    rating: 4.7,
    slug: 'agv-k6-helmet'
  },
  {
    id: 30,
    name: 'Куртка Alpinestars GP Pro',
    price: 49900,
    image: '/images/products/placeholder30.jpg',
    category: 'Экипировка',
    rating: 4.8,
    slug: 'alpinestars-gp-pro-jacket'
  },
  {
    id: 31,
    name: 'Перчатки Dainese Full Metal',
    price: 12900,
    image: '/images/products/placeholder31.jpg',
    category: 'Экипировка',
    rating: 4.6,
    slug: 'dainese-full-metal-gloves'
  },
  {
    id: 32,
    name: 'Ботинки TCX X-Five',
    price: 24900,
    image: '/images/products/placeholder32.jpg',
    category: 'Экипировка',
    rating: 4.7,
    slug: 'tcx-x-five-boots'
  },
  {
    id: 33,
    name: 'Защита коленей Alpinestars',
    price: 8900,
    image: '/images/products/placeholder33.jpg',
    category: 'Экипировка',
    rating: 4.5,
    slug: 'alpinestars-knee-protection'
  },
  {
    id: 34,
    name: 'Тормозные колодки EBC',
    price: 4900,
    image: '/images/products/placeholder34.jpg',
    category: 'Запчасти',
    rating: 4.6,
    slug: 'ebc-brake-pads'
  },
  {
    id: 35,
    name: 'Масляный фильтр K&N',
    price: 1900,
    image: '/images/products/placeholder35.jpg',
    category: 'Запчасти',
    rating: 4.7,
    slug: 'kn-oil-filter'
  },
  {
    id: 36,
    name: 'Цепь DID 520',
    price: 12900,
    image: '/images/products/placeholder36.jpg',
    category: 'Запчасти',
    rating: 4.8,
    slug: 'did-520-chain'
  },
  {
    id: 37,
    name: 'Свечи зажигания NGK',
    price: 2900,
    image: '/images/products/placeholder37.jpg',
    category: 'Запчасти',
    rating: 4.6,
    slug: 'ngk-spark-plugs'
  },
  {
    id: 38,
    name: 'Воздушный фильтр BMC',
    price: 5900,
    image: '/images/products/placeholder38.jpg',
    category: 'Запчасти',
    rating: 4.7,
    slug: 'bmc-air-filter'
  }
];

// Категории товаров
export const categoriesData: Category[] = [
  { 
    id: 1, 
    name: 'Спортивные', 
    slug: 'sport',
    icon: <Zap size={32} />
  },
  { 
    id: 2, 
    name: 'Круизеры', 
    slug: 'cruisers',
    icon: <Wind size={32} />
  },
  { 
    id: 3, 
    name: 'Туристические', 
    slug: 'touring',
    icon: <Bike size={32} />
  },
  { 
    id: 4, 
    name: 'Эндуро', 
    slug: 'enduro',
    icon: <Mountain size={32} />
  },
  { 
    id: 5, 
    name: 'Нейкеды', 
    slug: 'naked',
    icon: <Gauge size={32} />
  },
  { 
    id: 6, 
    name: 'Классика', 
    slug: 'classic',
    icon: <Trophy size={32} />
  },
  { 
    id: 7, 
    name: 'Экипировка', 
    slug: 'gear',
    icon: <Shield size={32} />
  },
  { 
    id: 8, 
    name: 'Запчасти', 
    slug: 'parts',
    icon: <Settings size={32} />
  }
];

// Список названий категорий для фильтров
export const categoryNames = ['Все', ...categoriesData.map(cat => cat.name)];

// Мапинг слагов к названиям категорий
export const categorySlugMap: { [key: string]: string } = {
  'sport': 'Спортивные',
  'cruisers': 'Круизеры',
  'touring': 'Туристические',
  'enduro': 'Эндуро',
  'naked': 'Нейкеды',
  'classic': 'Классика',
  'gear': 'Экипировка',
  'parts': 'Запчасти'
};

// Функции для работы с данными
export const getProductById = (id: number): Product | undefined => {
  return productsData.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'Все') {
    return productsData;
  }
  return productsData.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  return productsData.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
};

export const getCategoryBySlug = (slug: string): string => {
  return categorySlugMap[slug] || 'Все';
};
