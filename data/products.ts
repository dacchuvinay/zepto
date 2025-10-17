import type { Product } from '../types';

export const categories = [
  'Home Needs',
  'Wholesome Meals',
  'Beauty',
  'Fashion',
  'Electronics',
  'Mobiles',
];

export const products: Record<string, Product[]> = {
  'Home Needs': [
    { id: 101, name: 'boAt Energysyroom PB330', price: 1799, originalPrice: 3999, weight: '1 piece', image: 'https://picsum.photos/seed/powerbank1/300/300', rating: 4.7, ratingCount: 340 },
    { id: 102, name: 'Ambrane 10000 mAh Powerbank', price: 1499, originalPrice: 2499, weight: '1 piece', image: 'https://picsum.photos/seed/powerbank2/300/300', rating: 4.6, ratingCount: 850 },
    { id: 103, name: 'Portronics Amppox 27K 65W', price: 2949, originalPrice: 3999, weight: '1 piece', image: 'https://picsum.photos/seed/powerbank3/300/300', rating: 4.8, ratingCount: 807 },
    { id: 104, name: 'Ambrane MagSafe Wireless', price: 1299, originalPrice: 2999, weight: '1 piece', image: 'https://picsum.photos/seed/powerbank4/300/300', rating: 4.2, ratingCount: 63 },
    { id: 105, name: 'boAt Type C A750 Cable', price: 199, originalPrice: 999, weight: '1.5 mtr', image: 'https://picsum.photos/seed/cable1/300/300', rating: 4.3, ratingCount: 2600 },
    { id: 106, name: 'Ambrane Wireless 10000mAh', price: 1299, originalPrice: 2999, weight: '1 piece', image: 'https://picsum.photos/seed/powerbank5/300/300', rating: 4.6, ratingCount: 807 },
    { id: 107, name: 'Zebtronics MW65 Power Bank', price: 1999, originalPrice: 3199, weight: '1 piece', image: 'https://picsum.photos/seed/powerbank6/300/300', rating: 4.7, ratingCount: 859 },
    { id: 108, name: 'Bestor 10000mAh W Wired', price: 3349, originalPrice: 3999, weight: '1 piece', image: 'https://picsum.photos/seed/powerbank7/300/300', rating: 4.7, ratingCount: 925 },
  ],
  'Wholesome Meals': [
    { id: 201, name: 'Chole & Rice', price: 189, originalPrice: 209, weight: 'Serves 1', image: 'https://picsum.photos/seed/chole/300/300', rating: 4.2, ratingCount: 7400 },
    { id: 202, name: 'Chole & Chapati', price: 149, originalPrice: 169, weight: 'Serves 1', image: 'https://picsum.photos/seed/chapati/300/300', rating: 4.1, ratingCount: 37700 },
    { id: 203, name: 'Butter Chicken & Rice', price: 269, originalPrice: 299, weight: 'Serves 1', image: 'https://picsum.photos/seed/butterchicken/300/300', rating: 4.1, ratingCount: 14000 },
    { id: 204, name: 'Chole Kulche', price: 179, originalPrice: 199, weight: 'Serves 1', image: 'https://picsum.photos/seed/kulche/300/300', rating: 4.3, ratingCount: 41700 },
    { id: 205, name: 'Paneer Makhani & Rice', price: 239, originalPrice: 269, weight: 'Serves 1', image: 'https://picsum.photos/seed/paneer/300/300', rating: 4.2, ratingCount: 2400 },
    { id: 206, name: 'Bombay Aloo Tiki Sandwich', price: 119, originalPrice: 139, weight: 'Serves 1', image: 'https://picsum.photos/seed/sandwich/300/300', rating: 4.0, ratingCount: 21900 },
  ],
  'Beauty': [
     { id: 301, name: 'LAKMÉ Lipstick', price: 250, originalPrice: 400, weight: '1 piece', image: 'https://picsum.photos/seed/lipstick/300/300', rating: 4.5, ratingCount: 1200 },
     { id: 302, name: 'Foundation', price: 500, originalPrice: 750, weight: '30ml', image: 'https://picsum.photos/seed/foundation/300/300', rating: 4.8, ratingCount: 950 },
  ],
   'Electronics': [
     { id: 401, name: 'Wireless Headphones', price: 2500, originalPrice: 4000, weight: '1 unit', image: 'https://picsum.photos/seed/headphones/300/300', rating: 4.7, ratingCount: 2500 },
     { id: 402, name: 'Smart Watch', price: 3500, originalPrice: 5000, weight: '1 unit', image: 'https://picsum.photos/seed/watch/300/300', rating: 4.6, ratingCount: 3200 },
  ],
};
