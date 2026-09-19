const GroceryItem = require('../models/GroceryItem');
const GroceryPurchase = require('../models/GroceryPurchase');
const GroceryUsage = require('../models/GroceryUsage');

exports.getAllGroceries = async (req, res, next) => {
  try {
    const {
      search = '',
      category = '',
      status = '',
      page = 1,
      limit = 20,
      sort = 'itemName',
      order = 'asc'
    } = req.query;

    let query = { isActive: true };

    if (category && category !== 'ALL') {
      query.category = category;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { itemName: regex },
        { category: regex },
        { description: regex }
      ];
    }

    let items = await GroceryItem.find(query)
      .populate('supplier', 'name contact email')
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .exec();

    // Convert to plain JS objects to retain virtual 'status'
    let plainItems = items.map(item => item.toObject());

    // Filter by dynamic stock status if status filter is specified
    if (status && status !== 'ALL') {
      plainItems = plainItems.filter(item => item.status === status);
    }

    const total = plainItems.length;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedItems = plainItems.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      data: {
        groceries: paginatedItems,
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

exports.getGroceryById = async (req, res, next) => {
  try {
    const item = await GroceryItem.findOne({ _id: req.params.id, isActive: true })
      .populate('supplier', 'name contact email address');

    if (!item) {
      return res.status(404).json({ success: false, message: 'Grocery item not found' });
    }

    res.json({
      success: true,
      data: item.toObject()
    });
  } catch (error) {
    next(error);
  }
};

exports.createGrocery = async (req, res, next) => {
  try {
    const {
      itemName,
      category,
      currentStock = 0,
      unit,
      minimumStock = 0,
      averagePrice = 0,
      supplier,
      description
    } = req.body;

    if (!itemName || !itemName.trim()) {
      return res.status(400).json({ success: false, message: 'Item name is required' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ success: false, message: 'Category is required' });
    }
    if (!unit || !unit.trim()) {
      return res.status(400).json({ success: false, message: 'Unit is required' });
    }

    const newItem = await GroceryItem.create({
      itemName: itemName.trim(),
      category: category.trim(),
      currentStock: Number(currentStock) || 0,
      unit: unit.trim(),
      minimumStock: Number(minimumStock) || 0,
      averagePrice: Number(averagePrice) || 0,
      supplier: supplier || null,
      description: description ? description.trim() : ''
    });

    const populatedItem = await GroceryItem.findById(newItem._id).populate('supplier', 'name contact');

    res.status(201).json({
      success: true,
      data: populatedItem.toObject()
    });
  } catch (error) {
    next(error);
  }
};

exports.updateGrocery = async (req, res, next) => {
  try {
    const {
      itemName,
      category,
      currentStock,
      unit,
      minimumStock,
      averagePrice,
      supplier,
      description
    } = req.body;

    const item = await GroceryItem.findOne({ _id: req.params.id, isActive: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Grocery item not found' });
    }

    if (itemName !== undefined) item.itemName = itemName.trim();
    if (category !== undefined) item.category = category.trim();
    if (currentStock !== undefined) item.currentStock = Number(currentStock);
    if (unit !== undefined) item.unit = unit.trim();
    if (minimumStock !== undefined) item.minimumStock = Number(minimumStock);
    if (averagePrice !== undefined) item.averagePrice = Number(averagePrice);
    if (supplier !== undefined) item.supplier = supplier || null;
    if (description !== undefined) item.description = description.trim();

    await item.save();

    const updatedItem = await GroceryItem.findById(item._id).populate('supplier', 'name contact');

    res.json({
      success: true,
      data: updatedItem.toObject()
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteGrocery = async (req, res, next) => {
  try {
    const item = await GroceryItem.findOne({ _id: req.params.id, isActive: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Grocery item not found' });
    }

    item.isActive = false;
    await item.save();

    res.json({
      success: true,
      message: 'Grocery item deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrocerySummary = async (req, res, next) => {
  try {
    const activeItems = await GroceryItem.find({ isActive: true })
      .populate('supplier', 'name')
      .exec();

    const plainItems = activeItems.map(item => item.toObject());

    const totalItems = plainItems.length;
    const inStockItems = plainItems.filter(i => i.status === 'IN_STOCK').length;
    const lowStockItems = plainItems.filter(i => i.status === 'LOW_STOCK').length;
    const outOfStockItems = plainItems.filter(i => i.status === 'OUT_OF_STOCK').length;

    // Low stock items list for dashboard widget
    const lowStockList = plainItems
      .filter(i => i.status === 'LOW_STOCK' || i.status === 'OUT_OF_STOCK')
      .slice(0, 5);

    // Compute monthly purchase total for current calendar month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyPurchaseAgg = await GroceryPurchase.aggregate([
      { $match: { purchaseDate: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const monthlyPurchase = monthlyPurchaseAgg[0]?.total || 0;

    res.json({
      success: true,
      data: {
        totalItems,
        inStockItems,
        lowStockItems,
        outOfStockItems,
        monthlyPurchase,
        lowStockList
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.useStock = async (req, res, next) => {
  try {
    const { quantity, reason } = req.body;
    const qty = Number(quantity);

    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity to use must be a positive number' });
    }

    const item = await GroceryItem.findOne({ _id: req.params.id, isActive: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Grocery item not found' });
    }

    if (qty > item.currentStock) {
      return res.status(400).json({
        success: false,
        message: `Cannot use more than available stock (${item.currentStock} ${item.unit})`
      });
    }

    // Deduct stock
    item.currentStock = Math.round((item.currentStock - qty) * 100) / 100;
    await item.save();

    // Create usage record
    const usage = await GroceryUsage.create({
      item: item._id,
      quantity: qty,
      reason: reason ? reason.trim() : 'Daily Mess Use',
      usageDate: new Date()
    });

    const populatedUsage = await GroceryUsage.findById(usage._id).populate('item', 'itemName category unit');

    res.json({
      success: true,
      message: 'Stock updated successfully!',
      data: {
        item: item.toObject(),
        usage: populatedUsage
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsageHistory = async (req, res, next) => {
  try {
    const { search = '', page = 1, limit = 20 } = req.query;

    const usages = await GroceryUsage.find()
      .populate('item', 'itemName category unit currentStock minimumStock')
      .sort({ usageDate: -1, createdAt: -1 })
      .lean();

    let filteredUsages = usages;
    if (search) {
      const regex = new RegExp(search, 'i');
      filteredUsages = usages.filter(u =>
        regex.test(u.item?.itemName) ||
        regex.test(u.reason)
      );
    }

    const total = filteredUsages.length;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedUsages = filteredUsages.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      data: {
        usages: paginatedUsages,
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

