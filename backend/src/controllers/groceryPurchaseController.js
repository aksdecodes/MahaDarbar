const GroceryPurchase = require('../models/GroceryPurchase');
const GroceryItem = require('../models/GroceryItem');
const Supplier = require('../models/Supplier');

exports.getAllPurchases = async (req, res, next) => {
  try {
    const { search = '', page = 1, limit = 20 } = req.query;

    let query = {};

    const purchases = await GroceryPurchase.find(query)
      .populate('item', 'itemName category unit currentStock minimumStock')
      .populate('supplier', 'name contact email')
      .sort({ purchaseDate: -1, createdAt: -1 })
      .lean();

    // In-memory search if search param is provided
    let filteredPurchases = purchases;
    if (search) {
      const regex = new RegExp(search, 'i');
      filteredPurchases = purchases.filter(p => 
        regex.test(p.item?.itemName) ||
        regex.test(p.supplier?.name) ||
        regex.test(p.paymentMode) ||
        regex.test(p.notes)
      );
    }

    const total = filteredPurchases.length;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedPurchases = filteredPurchases.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      data: {
        purchases: paginatedPurchases,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getPurchaseById = async (req, res, next) => {
  try {
    const purchase = await GroceryPurchase.findById(req.params.id)
      .populate('item')
      .populate('supplier');

    if (!purchase) {
      return res.status(404).json({ success: false, message: 'Purchase record not found' });
    }

    res.json({
      success: true,
      data: purchase
    });
  } catch (error) {
    next(error);
  }
};

exports.createPurchase = async (req, res, next) => {
  try {
    const { item, supplier, quantity, unitPrice, purchaseDate, paymentMode, notes } = req.body;

    if (!item) {
      return res.status(400).json({ success: false, message: 'Grocery item is required' });
    }
    if (!supplier) {
      return res.status(400).json({ success: false, message: 'Supplier is required' });
    }

    const qty = Number(quantity);
    const price = Number(unitPrice);

    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
    }
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ success: false, message: 'Unit price must be a non-negative number' });
    }

    // Validate item exists and is active
    const groceryItem = await GroceryItem.findOne({ _id: item, isActive: true });
    if (!groceryItem) {
      return res.status(404).json({ success: false, message: 'Grocery item not found or inactive' });
    }

    // Validate supplier exists and is active
    const supplierDoc = await Supplier.findOne({ _id: supplier, isActive: true });
    if (!supplierDoc) {
      return res.status(404).json({ success: false, message: 'Supplier not found or inactive' });
    }

    // Compute backend totalAmount
    const totalAmount = qty * price;

    // Create Purchase Record
    const purchase = await GroceryPurchase.create({
      item,
      supplier,
      quantity: qty,
      unitPrice: price,
      totalAmount,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(),
      paymentMode: paymentMode || 'CASH',
      notes
    });

    // Calculate new average price using weighted average
    const currentStock = groceryItem.currentStock || 0;
    const currentAvgPrice = groceryItem.averagePrice || 0;
    const totalOldValue = currentStock * currentAvgPrice;
    const totalNewPurchaseValue = totalAmount;
    const newTotalStock = currentStock + qty;
    const newAvgPrice = newTotalStock > 0 ? (totalOldValue + totalNewPurchaseValue) / newTotalStock : price;

    // Update Stock & Average Price
    groceryItem.currentStock = newTotalStock;
    groceryItem.averagePrice = Math.round(newAvgPrice * 100) / 100;
    
    // Optionally update item supplier reference if not set
    if (!groceryItem.supplier) {
      groceryItem.supplier = supplier;
    }

    await groceryItem.save();

    // Populate created purchase for response
    const populatedPurchase = await GroceryPurchase.findById(purchase._id)
      .populate('item', 'itemName category unit currentStock minimumStock')
      .populate('supplier', 'name contact email');

    res.status(201).json({
      success: true,
      data: {
        purchase: populatedPurchase,
        updatedStock: groceryItem.currentStock,
        status: groceryItem.status
      }
    });
  } catch (error) {
    next(error);
  }
};
