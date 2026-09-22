const MenuItem = require('../models/MenuItem');

exports.getMenuItems = async (req, res) => {
  try {
    const { category, search, isVeg } = req.query;
    let query = { isAvailable: true };

    if (category) {
      query.category = category;
    }
    
    if (isVeg !== undefined) {
      query.isVeg = isVeg === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const menuItems = await MenuItem.find(query).sort({ category: 1, name: 1 });
    res.status(200).json({ success: true, data: menuItems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findOne({ _id: req.params.id, isAvailable: true });
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'MenuItem not found' });
    }
    res.status(200).json({ success: true, data: menuItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: menuItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'MenuItem not found' });
    }
    res.status(200).json({ success: true, data: menuItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'MenuItem not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
