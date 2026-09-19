const Supplier = require('../models/Supplier');
const GroceryItem = require('../models/GroceryItem');
const GroceryPurchase = require('../models/GroceryPurchase');

exports.getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({ isActive: true }).sort({ name: 1 }).lean();
    
    // Enrich with item count and purchase stats
    const enrichedSuppliers = await Promise.all(
      suppliers.map(async (supplier) => {
        const itemCount = await GroceryItem.countDocuments({ supplier: supplier._id, isActive: true });
        
        const purchaseStats = await GroceryPurchase.aggregate([
          { $match: { supplier: supplier._id } },
          { $group: { _id: null, totalSpent: { $sum: '$totalAmount' }, totalCount: { $sum: 1 } } }
        ]);

        return {
          ...supplier,
          itemCount,
          totalPurchases: purchaseStats[0]?.totalSpent || 0,
          purchaseCount: purchaseStats[0]?.totalCount || 0
        };
      })
    );

    res.json({
      success: true,
      data: enrichedSuppliers
    });
  } catch (error) {
    next(error);
  }
};

exports.createSupplier = async (req, res, next) => {
  try {
    const { name, contact, email, address, notes } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Supplier name is required' });
    }

    const supplier = await Supplier.create({
      name, contact, email, address, notes
    });

    res.status(201).json({
      success: true,
      data: supplier
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const { name, contact, email, address, notes } = req.body;
    const supplier = await Supplier.findOne({ _id: req.params.id, isActive: true });
    
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    if (name) supplier.name = name;
    if (contact !== undefined) supplier.contact = contact;
    if (email !== undefined) supplier.email = email;
    if (address !== undefined) supplier.address = address;
    if (notes !== undefined) supplier.notes = notes;

    await supplier.save();

    res.json({
      success: true,
      data: supplier
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne({ _id: req.params.id, isActive: true });
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    supplier.isActive = false;
    await supplier.save();

    res.json({
      success: true,
      message: 'Supplier deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
};
