import { MenuItem, Review, Offer } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Chicken Lollipop',
    description: 'Crispy and spicy chicken wings served with schezwan sauce.',
    price: 220,
    category: 'STARTER',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Mutton Seekh Kebab',
    description: 'Succulent minced mutton mixed with aromatic spices, grilled to perfection.',
    price: 280,
    category: 'KEBAB',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Chicken Tikka',
    description: 'Boneless chicken chunks marinated in yogurt and spices, roasted in tandoor.',
    price: 240,
    category: 'KEBAB',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice cooked with tender chicken and traditional spices.',
    price: 350,
    category: 'RICE/BIRYANI',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Butter Naan',
    description: 'Soft, leavened bread brushed with melted butter.',
    price: 40,
    category: 'ROTI/BREAD',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'Chicken Butter Masala',
    description: 'Tender chicken in a rich, creamy tomato-based gravy.',
    price: 320,
    category: 'GRAVY CHICKEN',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '7',
    name: 'Mutton Rogan Josh',
    description: 'Classic Kashmiri lamb curry with a rich, aromatic gravy.',
    price: 380,
    category: 'GRAVY MUTTON',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    name: 'Chicken Egg Roll',
    description: 'Spiced chicken and egg wrapped in a crispy paratha.',
    price: 120,
    category: 'ROLL',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1662116765994-4e4473693f2f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '10',
    name: 'Cold Drinks',
    description: 'Refreshing chilled beverages including Mineral Water and Cold Drinks.',
    price: 40,
    category: 'BEVERAGES',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '11',
    name: 'Mineral Water',
    description: 'Chilled 1L packaged drinking water.',
    price: 20,
    category: 'BEVERAGES',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    rating: 5,
    text: 'Best kebabs in Varanasi! The Mutton Seekh is a must-try. Authentic flavors and great service.',
    avatar: 'https://i.pravatar.cc/150?u=rahul'
  },
  {
    id: '2',
    name: 'Priya Singh',
    rating: 5,
    text: 'The Galouti Kebab literally melts in your mouth. Amazing ambiance and very reasonable prices.',
    avatar: 'https://i.pravatar.cc/150?u=priya'
  },
  {
    id: '3',
    name: 'Amit Verma',
    rating: 4,
    text: 'Great place for non-veg lovers. The Biryani is very flavorful. Highly recommended.',
    avatar: 'https://i.pravatar.cc/150?u=amit'
  }
];

export const OFFERS: Offer[] = [
  {
    id: '2',
    title: 'Weekend Feast',
    description: 'Order for ₹1000 or more and get a free dessert.',
    discount: 'FREE DESSERT',
    validUntil: 'Fri - Sun'
  }
];

import { CategoryMenuData } from './types';

export const DETAILED_MENU: Record<string, CategoryMenuData> = {
  'STARTER': {
    category: 'STARTER',
    headers: {
      left: 'HALF 4 PCS',
      right: 'FULL 8 PCS'
    },
    items: [
      { name: 'CHICKEN ROASTED', halfPrice: 160, fullPrice: 310 },
      { name: 'CHICKEN BUTTER ROASTED', halfPrice: 200, fullPrice: 390 },
      { name: 'CHICKEN AFGHANI CREAMY', halfPrice: 280, fullPrice: 550 },
      { name: 'CHICKEN TIKKA DRY', halfPrice: 120, fullPrice: 240 },
      { name: 'CHICKEN TIKKA CREAMY', halfPrice: 130, fullPrice: 260 },
      { name: 'CHICKEN HARIYALI TIKKA', halfPrice: 140, fullPrice: 280 },
      { name: 'CHICKEN HARIYALI TIKKA CREAMY', halfPrice: 140, fullPrice: 280 }
    ]
  },
  'KEBAB': {
    category: 'KEBAB',
    headers: {
      left: 'HALF 2 PCS',
      right: 'FULL 4 PCS'
    },
    items: [
      { name: 'MUTTON SHAMI KEBAB', halfPrice: 80, fullPrice: 160 },
      { name: 'MUTTON SEEKH KEBAB', halfPrice: 90, fullPrice: 180 },
      { name: 'CHICKEN SEEKH KEBAB', halfPrice: 70, fullPrice: 140 }
    ]
  },
  'RICE/BIRYANI': {
    category: 'RICE/BIRYANI',
    headers: {
      left: 'HALF',
      right: 'FULL'
    },
    items: [
      { name: 'BIRYANI CHICKEN', halfPrice: 160, fullPrice: 320 },
      { name: 'BIRYANI MUTTON', halfPrice: 200, fullPrice: 400 },
      { name: 'PLAIN RICE', halfPrice: 50, fullPrice: 90 }
    ]
  },
  'ROTI/BREAD': {
    category: 'ROTI/BREAD',
    headers: {
      right: 'PER PC'
    },
    items: [
      { name: 'MUGHLAI PARATHA', price: 15 },
      { name: 'BUTTER NAAN', price: 30 },
      { name: 'PLAIN NAAN', price: 25 },
      { name: 'LACHHA PARATHA', price: 25 },
      { name: 'TANDOOR BUTTER ROTI', price: 17 },
      { name: 'TANDOOR PLAIN ROTI', price: 12 }
    ]
  },
  'BEVERAGES': {
    category: 'BEVERAGES',
    headers: {
      right: 'PER PC'
    },
    items: [
      { name: 'WATER BOTTLE', price: 'MRP' },
      { name: 'COLD DRINK', price: 'MRP' }
    ]
  },
  'GRAVY CHICKEN': {
    category: 'GRAVY CHICKEN',
    headers: {
      quarter: 'QUARTER\n2PCS',
      half: 'HALF\n4PCS',
      full: 'FULL\n8PCS'
    },
    items: [
      { name: 'BUTTER CHICKEN', quarterPrice: 200, halfPrice: 390, fullPrice: 700 },
      { name: 'CHICKEN MASALA', quarterPrice: 190, halfPrice: 370, fullPrice: 680 },
      { name: 'CHICKEN HANDI', quarterPrice: 180, halfPrice: 340, fullPrice: 650 },
      { name: 'CHICKEN ACHARI', quarterPrice: 200, halfPrice: 390, fullPrice: 700 },
      { name: 'BONELESS BUTTER CHICKEN', halfPrice: 200, fullPrice: 390 },
      { name: 'BONELESS CHICKEN MASALA', halfPrice: 190, fullPrice: 370 },
      { 
        name: '', 
        isHeader: true, 
        subHeaders: { half: 'HALF', full: 'FULL' } 
      },
      { name: 'CHICKEN BOTI', halfPrice: 140, fullPrice: 260 }
    ]
  },
  'GRAVY MUTTON': {
    category: 'GRAVY MUTTON',
    headers: {
      half: 'HALF\n2PCS',
      full: 'FULL\n4PCS'
    },
    items: [
      { name: 'MUTTON HANDI', halfPrice: 240, fullPrice: 460 },
      { 
        name: '', 
        isHeader: true, 
        subHeaders: { half: 'HALF', full: 'FULL' } 
      },
      { name: 'MUTTON BOTI', halfPrice: 180, fullPrice: 310 }
    ]
  },
  'ROLL': {
    category: 'ROLL',
    headers: {
      right: 'PER PC'
    },
    items: [
      { name: 'MUTTON KABAB ROLL SINGLE', price: 85 },
      { name: 'MUTTON KABAB ROLL DOUBLE', price: 130 },
      { name: 'MUTTON BOTI ROLL', price: 110 },
      { name: 'CHICKEN EGG ROLL', price: 95 },
      { name: 'CHICKEN DOUBLE EGG ROLL', price: 105 },
      { name: 'CHICKEN ROLL', price: 85 },
      { name: 'EGG ROLL', price: 60 },
      { name: 'DOUBLE EGG ROLL', price: 70 }
    ]
  }
};
