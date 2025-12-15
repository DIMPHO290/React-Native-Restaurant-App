import { FoodItem } from '@types';

export const MENU: FoodItem[] = [
  {
    id: 'b1',
    name: 'Classic Beef Burger',
    description: '200g beef patty, cheese, tomato, lettuce, house sauce.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    category: 'Burgers',
    sides: ['Chips', 'Salad', 'Pap'],
    drinks: [
      { label: 'Cola' },
      { label: 'Sparkling Water' },
      { label: 'Craft Beer', priceDelta: 20 }
    ],
    extras: [
      { label: 'Extra cheese', priceDelta: 12 },
      { label: 'Extra patty', priceDelta: 35 },
      { label: 'Sauces trio', priceDelta: 15 }
    ],
    options: [{ label: 'Lettuce', removable: true }, { label: 'Onion', removable: true }]
  },
  {
    id: 'm1',
    name: 'Grilled Chicken Plate',
    description: 'Free-range chicken breast with seasonal veg.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1604908554033-94d2c45f1c43',
    category: 'Mains',
    sides: ['Pap', 'Chips', 'Salad'],
    drinks: [{ label: 'Iced Tea' }, { label: 'Cola' }],
    extras: [{ label: 'Garlic butter', priceDelta: 10 }]
  },
  {
    id: 's1',
    name: 'Calamari Starter',
    description: 'Lightly fried, lemon aioli.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1481931713105-3fdf97f2ed9c',
    category: 'Starters'
  },
  {
    id: 'd1',
    name: 'Chocolate Mousse',
    description: 'Rich, velvety, 70% cocoa.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6cf7',
    category: 'Dessert'
  },
  {
    id: 'be1',
    name: 'Fresh Orange Juice',
    description: 'Cold-pressed.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1542444459-db6cc0f4a69b',
    category: 'Beverages'
  },
  {
    id: 'a1',
    name: 'House Red Wine (Glass)',
    description: 'Dry, fruity notes.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1514361892635-6a0e47b42f5b',
    category: 'Alcohols'
  }
];
