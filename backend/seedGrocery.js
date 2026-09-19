require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/database');
const Supplier = require('./src/models/Supplier');
const GroceryItem = require('./src/models/GroceryItem');
const GroceryPurchase = require('./src/models/GroceryPurchase');

const seedGroceryData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing grocery data (preserving Members, Payments & Admins)...');
    await Supplier.deleteMany({});
    await GroceryItem.deleteMany({});
    await GroceryPurchase.deleteMany({});

    // 1. Create Suppliers
    const suppliersData = [
      { name: 'Shree Traders', contact: '9822114455', email: 'sales@shreetraders.com', address: 'Market Yard, Pune', notes: 'Grains & Pulses wholesaler' },
      { name: 'Om Foods & Spices', contact: '9822336677', email: 'omfoods@gmail.com', address: 'Gultekadi, Pune', notes: 'Spices and Oil vendor' },
      { name: 'Maharashtra Wholesale Mart', contact: '9890445566', email: 'info@mahamart.in', address: 'APMC Market, Vashi', notes: 'General grocery supplier' },
      { name: 'Fresh Vegetable Supplier', contact: '9766554433', email: 'freshveg@gmail.com', address: 'Subhash Nagar, Pune', notes: 'Daily fresh vegetables' }
    ];

    const suppliers = await Supplier.insertMany(suppliersData);
    console.log(`Created ${suppliers.length} suppliers.`);

    const shree = suppliers.find(s => s.name === 'Shree Traders')._id;
    const om = suppliers.find(s => s.name === 'Om Foods & Spices')._id;
    const maha = suppliers.find(s => s.name === 'Maharashtra Wholesale Mart')._id;
    const veg = suppliers.find(s => s.name === 'Fresh Vegetable Supplier')._id;

    // 2. Create Grocery Items (Normal, Low Stock, Out of Stock)
    const itemsData = [
      // Grains
      { itemName: 'Basmati Rice', category: 'Grains', currentStock: 80, unit: 'KG', minimumStock: 25, averagePrice: 68, supplier: shree, description: 'Premium long grain rice for mess daily meals' },
      { itemName: 'Indrayani Rice', category: 'Grains', currentStock: 15, unit: 'KG', minimumStock: 30, averagePrice: 55, supplier: shree, description: 'Soft Maharashtrian rice (Low Stock)' },
      { itemName: 'Wheat Flour (Atta)', category: 'Grains', currentStock: 120, unit: 'KG', minimumStock: 40, averagePrice: 38, supplier: shree, description: 'Whole wheat flour for chapati' },
      { itemName: 'Jowar Flour', category: 'Grains', currentStock: 8, unit: 'KG', minimumStock: 15, averagePrice: 48, supplier: shree, description: 'Jowar flour for bhakri (Low Stock)' },
      
      // Pulses
      { itemName: 'Toor Dal', category: 'Pulses', currentStock: 35, unit: 'KG', minimumStock: 15, averagePrice: 140, supplier: shree, description: 'Yellow split pigeon peas for varan' },
      { itemName: 'Moong Dal', category: 'Pulses', currentStock: 20, unit: 'KG', minimumStock: 10, averagePrice: 125, supplier: shree, description: 'Split green gram' },
      { itemName: 'Chana Dal', category: 'Pulses', currentStock: 4, unit: 'KG', minimumStock: 10, averagePrice: 90, supplier: shree, description: 'Bengal gram dal (Low Stock)' },
      { itemName: 'Matki (Moth Beans)', category: 'Pulses', currentStock: 0, unit: 'KG', minimumStock: 10, averagePrice: 110, supplier: shree, description: 'Sprouted moth beans for usal (Out of Stock)' },

      // Oils & Ghee
      { itemName: 'Sunflower Oil', category: 'Oil', currentStock: 45, unit: 'L', minimumStock: 20, averagePrice: 135, supplier: om, description: 'Refined sunflower cooking oil' },
      { itemName: 'Groundnut Oil', category: 'Oil', currentStock: 5, unit: 'L', minimumStock: 15, averagePrice: 175, supplier: om, description: 'Filtered peanut oil (Low Stock)' },

      // Spices
      { itemName: 'Kanda Lasun Masala', category: 'Spices', currentStock: 12, unit: 'KG', minimumStock: 5, averagePrice: 280, supplier: om, description: 'Authentic Maharashtrian onion-garlic masala' },
      { itemName: 'Red Chilli Powder', category: 'Spices', currentStock: 6, unit: 'KG', minimumStock: 3, averagePrice: 320, supplier: om, description: 'Reshampatti red chilli powder' },
      { itemName: 'Turmeric Powder', category: 'Spices', currentStock: 5, unit: 'KG', minimumStock: 2, averagePrice: 190, supplier: om, description: 'Pure Haldi powder' },
      { itemName: 'Garam Masala', category: 'Spices', currentStock: 0, unit: 'KG', minimumStock: 2, averagePrice: 420, supplier: om, description: 'Aromatic spice mix (Out of Stock)' },

      // Dairy & Essentials
      { itemName: 'Milk', category: 'Dairy', currentStock: 30, unit: 'L', minimumStock: 10, averagePrice: 58, supplier: maha, description: 'Daily buffalo milk for tea & curd' },
      { itemName: 'Sugar', category: 'Essentials', currentStock: 50, unit: 'KG', minimumStock: 20, averagePrice: 42, supplier: maha, description: 'Fine crystal sugar' },
      { itemName: 'Salt', category: 'Essentials', currentStock: 25, unit: 'KG', minimumStock: 10, averagePrice: 22, supplier: maha, description: 'Iodized table salt' },

      // Vegetables
      { itemName: 'Onions', category: 'Vegetables', currentStock: 60, unit: 'KG', minimumStock: 25, averagePrice: 28, supplier: veg, description: 'Red onions for gravy & salads' },
      { itemName: 'Potatoes', category: 'Vegetables', currentStock: 40, unit: 'KG', minimumStock: 20, averagePrice: 24, supplier: veg, description: 'Fresh potatoes' },
      { itemName: 'Tomatoes', category: 'Vegetables', currentStock: 6, unit: 'KG', minimumStock: 15, averagePrice: 35, supplier: veg, description: 'Ripe tomatoes (Low Stock)' }
    ];

    const items = await GroceryItem.insertMany(itemsData);
    console.log(`Created ${items.length} grocery items.`);

    // 3. Create Sample Purchases
    const now = new Date();
    const purchasesData = [
      {
        item: items.find(i => i.itemName === 'Basmati Rice')._id,
        supplier: shree,
        quantity: 50,
        unitPrice: 68,
        totalAmount: 3400,
        purchaseDate: new Date(now.getFullYear(), now.getMonth(), 2),
        paymentMode: 'UPI',
        notes: 'Monthly bulk rice order'
      },
      {
        item: items.find(i => i.itemName === 'Wheat Flour (Atta)')._id,
        supplier: shree,
        quantity: 100,
        unitPrice: 38,
        totalAmount: 3800,
        purchaseDate: new Date(now.getFullYear(), now.getMonth(), 3),
        paymentMode: 'CASH',
        notes: 'Atta 50kg x 2 bags'
      },
      {
        item: items.find(i => i.itemName === 'Sunflower Oil')._id,
        supplier: om,
        quantity: 30,
        unitPrice: 135,
        totalAmount: 4050,
        purchaseDate: new Date(now.getFullYear(), now.getMonth(), 5),
        paymentMode: 'BANK_TRANSFER',
        notes: '15L tin x 2'
      },
      {
        item: items.find(i => i.itemName === 'Kanda Lasun Masala')._id,
        supplier: om,
        quantity: 10,
        unitPrice: 280,
        totalAmount: 2800,
        purchaseDate: new Date(now.getFullYear(), now.getMonth(), 8),
        paymentMode: 'UPI',
        notes: 'Fresh batch masala'
      },
      {
        item: items.find(i => i.itemName === 'Onions')._id,
        supplier: veg,
        quantity: 50,
        unitPrice: 28,
        totalAmount: 1400,
        purchaseDate: new Date(now.getFullYear(), now.getMonth(), 10),
        paymentMode: 'CASH',
        notes: 'Weekly onion sack'
      },
      {
        item: items.find(i => i.itemName === 'Toor Dal')._id,
        supplier: shree,
        quantity: 25,
        unitPrice: 140,
        totalAmount: 3500,
        purchaseDate: new Date(now.getFullYear(), now.getMonth(), 12),
        paymentMode: 'UPI',
        notes: 'Yellow dal batch'
      }
    ];

    const purchases = await GroceryPurchase.insertMany(purchasesData);
    console.log(`Created ${purchases.length} purchase records.`);

    console.log('Grocery demo seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Grocery seeding error:', error);
    process.exit(1);
  }
};

seedGroceryData();
