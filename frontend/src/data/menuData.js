export const MENU_CATEGORIES = [
  { id: 'all', name: 'All Dishes' },
  { id: 'unlimited-thali', name: 'Unlimited Thalis' },
  { id: 'traditional-thali', name: 'Traditional Thalis' },
  { id: 'special-combos', name: 'Special Combos' },
  { id: 'curries-paneer', name: 'Curries, Paneer & Staples' },
  { id: 'non-veg', name: 'Non-Veg Specials' },
  { id: 'mess', name: 'Mess & Tiffin' }
];

export const UNLIMITED_THALIS = [
  {
    id: 'thali-1',
    name: 'Unlimited Veg Thali',
    price: 129,
    category: 'unlimited-thali',
    isVeg: true,
    tag: 'Popular',
    description: 'Puran Poli, Dal Fry, Veg Curry, Dry Veg, Rice, Roti, Curd, Papad, Salad & Sweet.',
    features: ['Pure Veg', 'Top Seller', 'Unlimited Refills'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'thali-2',
    name: 'Deluxe Unlimited Thali',
    price: 179,
    category: 'unlimited-thali',
    isVeg: true,
    tag: 'Bestseller',
    description: 'Sweet Dessert, Paneer Curry, Special Dry Veg, Veg Curry, Dal Fry, Curd, Papad, Rice & Roti.',
    features: ['Paneer Special', 'Unlimited', 'Royal Feast'],
    image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'thali-3',
    name: 'Simple Mini Unlimited Thali',
    price: 99,
    category: 'unlimited-thali',
    isVeg: true,
    tag: 'Student Favorite',
    description: 'Unlimited Rice, Dal, Veg Curry and Hot Phulkas. Perfect budget friendly daily meal for students.',
    features: ['Student Special', 'Homely Dinner', 'Unlimited'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80'
  }
];

export const TRADITIONAL_THALIS = [
  {
    id: 'trad-1',
    name: 'Dal Roti Thali',
    price: 79,
    category: 'traditional-thali',
    isVeg: true,
    badge: 'Home Special Daily',
    description: 'Includes 4 Phulkas, Dal Fry, Special Dry Sabzi, Salad & Chutney.'
  },
  {
    id: 'trad-2',
    name: 'Dal Khichdi Thali',
    price: 119,
    category: 'traditional-thali',
    isVeg: true,
    badge: 'Light & Delicious',
    description: 'Sour and flavorful tempered khichdi, served with roasted papad, curd, dahi, and a lemon wedge.'
  },
  {
    id: 'trad-3',
    name: 'Dal Tadka + Phulka Thali',
    price: 99,
    category: 'traditional-thali',
    isVeg: true,
    badge: '30 Mins Quick Serve',
    description: 'Smoky garlic lentil tadka served with hot soft phulkas, fresh onion salad, and homemade pickle.'
  },
  {
    id: 'trad-4',
    name: 'Chicken Curry + Rice + Roti Thali',
    price: 140,
    category: 'traditional-thali',
    isVeg: false,
    badge: 'Sunday Speciality',
    description: 'Rich Maharashtrian chicken gravy, served with fragrant basmati rice, 3 bhakri/roti, and spicy onion salad.'
  },
  {
    id: 'trad-5',
    name: 'Mutton Curry + Rice + Roti Thali',
    price: 180,
    category: 'traditional-thali',
    isVeg: false,
    badge: 'Sunday Speciality',
    description: 'Slow-cooked tender mutton piece cooked in authentic Marathwada spices, served with rice, roti, and tamda rassa.'
  },
  {
    id: 'trad-6',
    name: 'Egg Curry + Roti Thali',
    price: 99,
    category: 'traditional-thali',
    isVeg: false,
    badge: 'Homely Prep',
    description: 'Spicy boiled egg curry cooked in traditional onion-tomato gravy, served with 3 soft phulkas, and fresh salad.'
  }
];

export const SPECIAL_COMBOS = [
  {
    id: 'combo-1',
    name: 'Paneer Pulav + Raita + Combo',
    price: 99,
    category: 'special-combos',
    isVeg: true,
    badge: 'Student Special',
    description: 'Fragrant basmati paneer rice served with cucumber raita, fried papad, and spicy onion salad.'
  },
  {
    id: 'combo-2',
    name: 'Kaju Paneer + 3 Phulka',
    price: 199,
    category: 'special-combos',
    isVeg: true,
    badge: 'Chef Special',
    description: 'Rich cashew nuts and cottage cheese cooked in velvety red gravy, served with 3 soft phulkas.'
  },
  {
    id: 'combo-3',
    name: 'Godwa Paneer + Butter Roti',
    price: 219,
    category: 'special-combos',
    isVeg: true,
    badge: 'Party Feast',
    description: 'Maharashtrian style sweet & spicy gravy with freshly grated coconut & butter rotis.'
  },
  {
    id: 'combo-4',
    name: 'Chicken Pulav + Combo',
    price: 140,
    category: 'special-combos',
    isVeg: false,
    badge: 'Non-Veg Special',
    description: 'Spiced chicken rice cooked with roasted spices, served with sol kadhi or raita & gravies.'
  }
];

export const PANEER_SPECIALITIES = [
  { id: 'pan-1', name: 'Shahi Paneer', price: 150, isVeg: true, desc: 'Creamy cardamom paneer rich gravy' },
  { id: 'pan-2', name: 'Paneer Butter Masala', price: 150, isVeg: true, desc: 'Rich buttery tomato onion gravy' },
  { id: 'pan-3', name: 'Paneer Handi', price: 170, isVeg: true, desc: 'Tangy, spicy handi cooked paneer' },
  { id: 'pan-4', name: 'Paneer Bhurji', price: 150, isVeg: true, desc: 'Scrambled paneer with onion & green chili' },
  { id: 'pan-5', name: 'Paneer Kolhapuri', price: 170, isVeg: true, desc: 'Spiced Maharashtrian hot gravy' },
  { id: 'pan-6', name: 'Paneer Tikka Masala', price: 180, isVeg: true, desc: 'Char-grilled paneer pieces in masala' },
  { id: 'pan-7', name: 'Kaju Curry', price: 170, isVeg: true, desc: 'Rich cashew, onion & butter masala' }
];

export const SAOJI_NONVEG_SPECIALS = [
  { id: 'non-1', name: 'Nagpur Saoji Chicken Curry', price: 160, isVeg: false, desc: 'Authentic Saoji dark masala spicy chicken' },
  { id: 'non-2', name: 'Chicken Curry', price: 150, isVeg: true, desc: 'Homestyle Maharashtrian chicken' },
  { id: 'non-3', name: 'Chicken Overload', price: 190, isVeg: false, desc: 'Spicy heavy gravy extra chicken pieces' },
  { id: 'non-4', name: 'Butter Chicken', price: 180, isVeg: false, desc: 'Mild & rich creamy roasted chicken' },
  { id: 'non-5', name: 'Egg Curry', price: 100, isVeg: false, desc: 'Double egg boiled gravy' },
  { id: 'non-6', name: 'Egg Bhurji', price: 80, isVeg: false, desc: 'Scrambled 2 egg roast with green chili' }
];

export const MAHARASHTRIAN_VEG_CURRIES = [
  { id: 'veg-1', name: 'Shev Bhaji (Khandeshi)', price: 110, isVeg: true },
  { id: 'veg-2', name: 'Pithla Bhakri Combo', price: 120, isVeg: true },
  { id: 'veg-3', name: 'Aloo Rasa Spicy Gravy', price: 100, isVeg: true },
  { id: 'veg-4', name: 'Baingan Masala', price: 120, isVeg: true },
  { id: 'veg-5', name: 'Kala Masala Aloo', price: 110, isVeg: true }
];

export const HOMESTYLE_DALS = [
  { id: 'dal-1', name: 'Dal Fry', price: 80, isVeg: true },
  { id: 'dal-2', name: 'Dal Tadka (Ghee Tempered)', price: 100, isVeg: true },
  { id: 'dal-3', name: 'Dal Kolhapuri Spicy', price: 110, isVeg: true },
  { id: 'dal-4', name: 'Dal Makhani', price: 140, isVeg: true }
];

export const BREADS_RICE = [
  { id: 'br-1', name: 'Steamed Rice', price: 50, isVeg: true },
  { id: 'br-2', name: 'Jeera Rice', price: 70, isVeg: true },
  { id: 'br-3', name: 'Veg Pulav', price: 100, isVeg: true },
  { id: 'br-4', name: 'Hot Phulka (1 pc)', price: 10, isVeg: true },
  { id: 'br-5', name: 'Chapati (1 pc)', price: 15, isVeg: true },
  { id: 'br-6', name: 'Butter Roti', price: 18, isVeg: true }
];

export const PHYSICAL_MENU_CARDS = [
  {
    id: 'card-1',
    title: 'Unlimited Thali Menu',
    subtitle: 'Click to expand',
    image: '/assets/WhatsApp Image 2026-09-22 at 10.01.51 AM.jpeg'
  },
  {
    id: 'card-2',
    title: 'Traditional Thalis',
    subtitle: 'Click to expand',
    image: '/assets/WhatsApp Image 2026-09-22 at 10.01.52 AM (1).jpeg'
  },
  {
    id: 'card-3',
    title: 'Special Combos',
    subtitle: 'Click to expand',
    image: '/assets/WhatsApp Image 2026-09-22 at 10.01.52 AM (2).jpeg'
  },
  {
    id: 'card-4',
    title: 'Non-Veg Feast',
    subtitle: 'Click to expand',
    image: '/assets/WhatsApp Image 2026-09-22 at 10.01.52 AM.jpeg'
  },
  {
    id: 'card-5',
    title: 'Physical Menu',
    subtitle: 'Click to expand',
    image: '/assets/WhatsApp Image 2026-09-22 at 10.01.53 AM.jpeg'
  }
];

export const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Tanmay Kulkarni',
    category: 'Engineering Student @ Ameerpet',
    rating: 5,
    review: 'Finding authentic Maharashtrian food in Hyderabad was tough until I discovered Maharashtra Darbar. The Unlimited Veg Thali has true Pune & Kolhapur taste. Puran poli and pitla bhakri remind me of home every evening!'
  },
  {
    id: 'rev-2',
    name: 'Prashant Deshmukh',
    category: 'IT Professional',
    rating: 5,
    review: 'The Nagpur Saoji Chicken and Paneer Butter Masala are unmatched in Ameerpet. Monthly mess subscription has made my lunch & dinner super hassle free. Truly top-tier quality and warm hospitality.'
  },
  {
    id: 'rev-3',
    name: 'Sneha Patil',
    category: 'Coaching Student',
    rating: 5,
    review: 'Super hygienic kitchen and friendly owners! The ₹60 student pack daily meal is such a saver for students living in hostels near Taza Kitchen Lane.'
  }
];
