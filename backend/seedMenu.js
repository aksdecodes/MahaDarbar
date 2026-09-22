require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./src/models/MenuItem');

const seedData = [
  // Unlimited Thali category
  { name: 'Unlimited Veg Thali', description: 'White Rice, Dal, Veg Curry, Raita, Dry Veg Curry, Roti, Salad — Pure Veg, Healthy, Satisfying', category: 'Unlimited Thali', price: 99, isVeg: true, isFeatured: true, includes: 'White Rice, Dal, Veg Curry, Raita, Dry Veg Curry, Roti, Salad', tags: ['unlimited', 'bestseller'] },
  { name: 'Deluxe Unlimited Thali', description: 'Sweet, Paneer Butter Masala, Pulav Rice, Veg Curry, Roti, Salad, Papad, Raita — Royal Taste, Pure Veg, Total Satisfaction', category: 'Unlimited Thali', price: 135, isVeg: true, isFeatured: true, includes: 'Sweet, Paneer Butter Masala, Pulav Rice, Veg Curry, Roti, Salad, Papad, Raita', tags: ['unlimited', 'premium'] },
  { name: 'Simple Mini Unlimited Thali', description: 'White Rice, Dal, Veg Curry, Roti — Simple, Pure, Satisfying', category: 'Unlimited Thali', price: 60, isVeg: true, isFeatured: true, includes: 'White Rice, Dal, Veg Curry, Roti', tags: ['unlimited', 'budget'] },

  // Traditional Thali category
  { name: 'Dal Batti Thali', description: 'Authentic Rajasthani taste — Pure Veg, Satisfying, Wholesome', category: 'Traditional Thali', price: 99, isVeg: true, isFeatured: true, tags: ['traditional'] },
  { name: 'Dal Khichdi', description: 'Light, Nutritious, Comforting — Easy to Digest, Healthy & Satisfying', category: 'Traditional Thali', price: 89, isVeg: true, isFeatured: true, tags: ['traditional', 'comfort'] },
  { name: 'Dal Tadka + Phulka', description: 'Homely Taste — Pure Veg, Satisfying, Healthy', category: 'Traditional Thali', price: 99, isVeg: true, tags: ['traditional'] },

  // Non Veg Thali category
  { name: 'Chicken Curry + Rice + Roti', description: 'Non Veg Thali with tender chicken curry, steamed rice and roti', category: 'Non Veg Thali', price: 160, isVeg: false, isFeatured: true, tags: ['nonveg', 'thali'] },
  { name: 'Mutton Curry + Rice + Roti', description: 'Premium non-veg thali with rich mutton curry, rice and fresh roti', category: 'Non Veg Thali', price: 320, isVeg: false, isFeatured: true, tags: ['nonveg', 'premium'] },
  { name: 'Egg Curry + Roti', description: 'Simple and satisfying egg curry with fresh roti', category: 'Non Veg Thali', price: 99, isVeg: false, tags: ['nonveg', 'budget'] },

  // Special Combos category
  { name: 'Paneer Pulav + Raita + Campa', description: 'Tasty, Filling, Satisfying — complete meal combo', category: 'Special Combos', price: 99, isVeg: true, isFeatured: true, tags: ['combo', 'bestseller'] },
  { name: 'Kaju Paneer + 3 Phulka', description: 'Rich, Creamy, Delicious — premium paneer combo', category: 'Special Combos', price: 199, isVeg: true, isFeatured: true, tags: ['combo', 'premium'] },
  { name: 'Kadhai Paneer + Butter Roti', description: 'Spicy, Flavorful, Irresistible — kadhai paneer combo', category: 'Special Combos', price: 299, isVeg: true, isFeatured: true, tags: ['combo', 'premium'] },

  // Paneer Specialties category
  { name: 'Shahi Paneer', description: 'Rich creamy paneer in royal gravy', category: 'Paneer Specialties', price: 180, isVeg: true, tags: ['paneer'] },
  { name: 'Paneer Butter Masala', description: 'Rich tomato-based paneer curry', category: 'Paneer Specialties', price: 180, isVeg: true, tags: ['paneer', 'bestseller'] },
  { name: 'Paneer Chatpata', description: 'Tangy spiced paneer preparation', category: 'Paneer Specialties', price: 190, isVeg: true, tags: ['paneer', 'spicy'] },
  { name: 'Paneer Bhurji', description: 'Scrambled cottage cheese with spices', category: 'Paneer Specialties', price: 160, isVeg: true, tags: ['paneer'] },
  { name: 'Paneer Kaju Masala', description: 'Paneer in rich cashew-based gravy', category: 'Paneer Specialties', price: 210, isVeg: true, tags: ['paneer', 'premium'] },
  { name: 'Paneer Tikka Masala', description: 'Tikka-marinated paneer in masala gravy', category: 'Paneer Specialties', price: 190, isVeg: true, tags: ['paneer'] },
  { name: 'Kadhai Paneer', description: 'Paneer cooked in kadhai with peppers', category: 'Paneer Specialties', price: 180, isVeg: true, tags: ['paneer'] },
  { name: 'Paneer Masala', description: 'Classic paneer masala preparation', category: 'Paneer Specialties', price: 160, isVeg: true, tags: ['paneer'] },
  { name: 'Kaju Masala', description: 'Rich cashew curry', category: 'Paneer Specialties', price: 210, isVeg: true, tags: ['premium'] },
  { name: 'Kaju Paneer', description: 'Paneer with cashew gravy', category: 'Paneer Specialties', price: 210, isVeg: true, tags: ['paneer', 'premium'] },
  { name: 'Kaju Curry', description: 'Cashew nut curry', category: 'Paneer Specialties', price: 210, isVeg: true, tags: ['premium'] },

  // Dal category
  { name: 'Dal Fry', description: 'Classic dal fry with tempering', category: 'Dal', price: 80, isVeg: true, tags: ['dal'] },
  { name: 'Dal Tadka', description: 'Yellow dal with aromatic tadka', category: 'Dal', price: 100, isVeg: true, tags: ['dal'] },
  { name: 'Dal Palak', description: 'Dal cooked with fresh spinach', category: 'Dal', price: 100, isVeg: true, tags: ['dal', 'healthy'] },
  { name: 'Dal Tamato', description: 'Tangy tomato-flavored dal', category: 'Dal', price: 80, isVeg: true, tags: ['dal'] },

  // Rice category
  { name: 'Steamed Rice', description: 'Plain steamed basmati rice', category: 'Rice', price: 50, isVeg: true, tags: ['rice'] },
  { name: 'Jeera Rice', description: 'Cumin-flavored aromatic rice', category: 'Rice', price: 90, isVeg: true, tags: ['rice'] },
  { name: 'Garlic Rice', description: 'Fragrant garlic-infused rice', category: 'Rice', price: 110, isVeg: true, tags: ['rice'] },
  { name: 'Veg Pulav', description: 'Mixed vegetable pulav', category: 'Rice', price: 100, isVeg: true, tags: ['rice'] },
  { name: 'Cheese Pulav', description: 'Cheesy vegetable pulav', category: 'Rice', price: 100, isVeg: true, tags: ['rice'] },
  { name: 'Kaju Pulav', description: 'Cashew-studded pulav', category: 'Rice', price: 120, isVeg: true, tags: ['rice', 'premium'] },
  { name: 'Paneer Pulav', description: 'Paneer-loaded pulav', category: 'Rice', price: 120, isVeg: true, tags: ['rice', 'paneer'] },

  // Veg Curries category
  { name: 'Aloo Mutter', description: 'Potato and peas curry', category: 'Veg Curries', price: 120, isVeg: true, tags: ['veg'] },
  { name: 'Aloo Jeera Dry', description: 'Cumin-flavored dry potato', category: 'Veg Curries', price: 110, isVeg: true, tags: ['veg', 'dry'] },
  { name: 'Mixed Veg', description: 'Assorted vegetables in gravy', category: 'Veg Curries', price: 120, isVeg: true, tags: ['veg'] },
  { name: 'Sev Bhaji', description: 'Traditional Maharashtrian sev bhaji', category: 'Veg Curries', price: 90, isVeg: true, tags: ['veg', 'maharashtrian'] },
  { name: 'Veg Kolhapuri', description: 'Spicy Kolhapuri-style vegetables', category: 'Veg Curries', price: 110, isVeg: true, tags: ['veg', 'spicy'] },
  { name: 'Aloo Chana', description: 'Potato and chickpea curry', category: 'Veg Curries', price: 110, isVeg: true, tags: ['veg'] },
  { name: 'Aloo Palak', description: 'Potato in spinach gravy', category: 'Veg Curries', price: 120, isVeg: true, tags: ['veg', 'healthy'] },
  { name: 'Veg Mancuria Curry', description: 'Veg manchurian in gravy', category: 'Veg Curries', price: 110, isVeg: true, tags: ['veg'] },
  { name: 'Kadai Vegetable', description: 'Mixed vegetables in kadai masala', category: 'Veg Curries', price: 140, isVeg: true, tags: ['veg'] },
  { name: 'Bhendi Masala', description: 'Okra/bhindi masala', category: 'Veg Curries', price: 120, isVeg: true, tags: ['veg'] },
  { name: 'Aloo Gobi Masala', description: 'Potato cauliflower curry', category: 'Veg Curries', price: 110, isVeg: true, tags: ['veg'] },
  { name: 'Gobi Mutter', description: 'Cauliflower and peas curry', category: 'Veg Curries', price: 100, isVeg: true, tags: ['veg'] },

  // Non Veg Curries category
  { name: 'Egg Curry', description: 'Boiled eggs in spiced gravy', category: 'Non Veg Curries', price: 90, isVeg: false, tags: ['egg'] },
  { name: 'Egg Bhurji', description: 'Indian-style scrambled eggs', category: 'Non Veg Curries', price: 60, isVeg: false, tags: ['egg'] },
  { name: 'Egg Boiled (2)', description: 'Two boiled eggs', category: 'Non Veg Curries', price: 30, isVeg: false, tags: ['egg'] },
  { name: 'Chicken Curry', description: 'Classic chicken curry', category: 'Non Veg Curries', price: 140, isVeg: false, tags: ['chicken'] },
  { name: 'Nagpur Saoji Chicken Curry', description: 'Spicy Nagpur-style saoji chicken', category: 'Non Veg Curries', price: 160, isVeg: false, tags: ['chicken', 'spicy', 'maharashtrian'] },
  { name: 'Chicken Chatpata', description: 'Tangy spiced chicken preparation', category: 'Non Veg Curries', price: 160, isVeg: false, tags: ['chicken', 'spicy'] },
  { name: 'Butter Chicken', description: 'Creamy butter chicken', category: 'Non Veg Curries', price: 180, isVeg: false, tags: ['chicken', 'bestseller'] },
  { name: 'Chicken Tikka Masala', description: 'Tikka chicken in rich masala', category: 'Non Veg Curries', price: 170, isVeg: false, tags: ['chicken'] },

  // Roti category
  { name: 'Pulka', description: 'Soft puffed roti', category: 'Roti', price: 10, isVeg: true, tags: ['bread'] },
  { name: 'Chapati', description: 'Fresh wheat chapati', category: 'Roti', price: 15, isVeg: true, tags: ['bread'] },
  { name: 'Butter Roti', description: 'Butter-topped roti', category: 'Roti', price: 15, isVeg: true, tags: ['bread'] },

  // Budget Combos category
  { name: 'Maharashtian Thali Unlimited', description: 'Budget unlimited Maharashtrian thali', category: 'Budget Combos', price: 60, isVeg: true, tags: ['combo', 'budget'] },
  { name: 'Dal Tadaka + 3 Roti', description: 'Dal tadka served with 3 fresh rotis', category: 'Budget Combos', price: 90, isVeg: true, tags: ['combo', 'budget'] },
  { name: 'Egg Burji + 3 Roti', description: 'Egg bhurji with 3 rotis', category: 'Budget Combos', price: 90, isVeg: false, tags: ['combo', 'budget'] },
  { name: 'Chicken Pulao + 1 Campa', description: 'Chicken pulao with a Campa drink', category: 'Budget Combos', price: 99, isVeg: false, tags: ['combo', 'budget'] },
  { name: 'Dal Khichdi Combo', description: 'Comforting dal khichdi meal', category: 'Budget Combos', price: 90, isVeg: true, tags: ['combo', 'budget'] },
  { name: 'PBM + 3 Roti', description: 'Paneer Butter Masala with 3 rotis', category: 'Budget Combos', price: 99, isVeg: true, tags: ['combo', 'budget'] },
  { name: 'Egg Curry + 3 Roti', description: 'Egg curry with 3 rotis', category: 'Budget Combos', price: 99, isVeg: false, tags: ['combo', 'budget'] },
  { name: 'Veg Pulao + 1 Campa', description: 'Veg pulao with a Campa drink', category: 'Budget Combos', price: 89, isVeg: true, tags: ['combo', 'budget'] },
  { name: 'Chicken Curry + 3 Roti', description: 'Chicken curry with 3 rotis', category: 'Budget Combos', price: 140, isVeg: false, tags: ['combo', 'budget'] },
  { name: 'Shev Bhaji + 3 Roti', description: 'Maharashtrian shev bhaji with 3 rotis', category: 'Budget Combos', price: 90, isVeg: true, tags: ['combo', 'budget', 'maharashtrian'] }
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  await connectDB();

  try {
    // Clear existing MenuItems
    await MenuItem.deleteMany();
    console.log('Cleared existing MenuItems.');

    // Insert new items
    const inserted = await MenuItem.insertMany(seedData);
    console.log(`Successfully seeded ${inserted.length} menu items!`);

    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
