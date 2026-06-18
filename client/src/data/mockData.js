export const restaurants = [
  {
    id: 1,
    name: 'Spice Junction',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    deliveryTime: 24,
    cuisine: 'Biryani',
    offer: '40% OFF'
  },
  {
    id: 2,
    name: 'Urban Burger Co.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    rating: 4.6,
    deliveryTime: 19,
    cuisine: 'Burger',
    offer: 'Free Fries'
  },
  {
    id: 3,
    name: 'La Roma Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    deliveryTime: 28,
    cuisine: 'Pizza',
    offer: 'Buy 1 Get 1'
  },
  {
    id: 4,
    name: 'South Bowl',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=80',
    rating: 4.5,
    deliveryTime: 22,
    cuisine: 'South Indian',
    offer: '20% OFF'
  }
];

export const foods = [
  {
    id: 1,
    restaurantId: 1,
    name: 'Hyderabadi Dum Biryani',
    description: 'Aromatic basmati rice layered with tender spiced chicken and saffron.',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=900&q=80',
    price: 279,
    rating: 4.9,
    category: 'Biryani',
    ingredients: ['Basmati rice', 'Chicken', 'Saffron', 'Mint', 'House masala']
  },
  {
    id: 2,
    restaurantId: 2,
    name: 'Loaded Classic Burger',
    description: 'Juicy grilled patty, cheese, caramelized onions, lettuce, and secret sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    price: 199,
    rating: 4.7,
    category: 'Burger',
    ingredients: ['Brioche bun', 'Patty', 'Cheddar', 'Lettuce', 'Signature sauce']
  },
  {
    id: 3,
    restaurantId: 3,
    name: 'Margherita Woodfire Pizza',
    description: 'San Marzano tomato, mozzarella, basil, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80',
    price: 329,
    rating: 4.8,
    category: 'Pizza',
    ingredients: ['Mozzarella', 'Tomato', 'Basil', 'Olive oil', 'Sourdough base']
  },
  {
    id: 4,
    restaurantId: 4,
    name: 'Crispy Masala Dosa',
    description: 'Golden dosa filled with potato masala, served with sambar and chutneys.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80',
    price: 149,
    rating: 4.6,
    category: 'South Indian',
    ingredients: ['Rice batter', 'Potato', 'Curry leaves', 'Coconut chutney', 'Sambar']
  },
  {
    id: 5,
    restaurantId: 1,
    name: 'Chilli Garlic Noodles',
    description: 'Wok-tossed noodles with fresh vegetables and a fiery garlic sauce.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80',
    price: 179,
    rating: 4.4,
    category: 'Chinese',
    ingredients: ['Noodles', 'Garlic', 'Bell pepper', 'Scallion', 'Soy glaze']
  },
  {
    id: 6,
    restaurantId: 3,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center and vanilla cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    price: 129,
    rating: 4.9,
    category: 'Desserts',
    ingredients: ['Dark chocolate', 'Butter', 'Cocoa', 'Vanilla cream']
  },
  {
    id: 7,
    restaurantId: 2,
    name: 'Mango Mint Cooler',
    description: 'Chilled mango, mint, lime, and sparkling water.',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80',
    price: 99,
    rating: 4.5,
    category: 'Beverages',
    ingredients: ['Mango', 'Mint', 'Lime', 'Sparkling water']
  }
];

export const reviews = [
  { name: 'Aarav Mehta', text: 'Fast delivery, hot food, and the packaging felt genuinely premium.', rating: 5 },
  { name: 'Nisha Rao', text: 'The menu is easy to browse and the order tracking is super clear.', rating: 5 },
  { name: 'Kunal Shah', text: 'Great offers and reliable delivery times. My new weekend habit.', rating: 4 }
];

export const categories = ['Pizza', 'Burger', 'Biryani', 'Chinese', 'South Indian', 'Desserts', 'Beverages'];
