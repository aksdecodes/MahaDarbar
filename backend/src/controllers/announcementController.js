const Announcement = require('../models/Announcement');

exports.getActiveAnnouncements = async (req, res) => {
  try {
    const now = new Date();
    const announcements = await Announcement.find({
      isActive: true,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: null },
        { expiresAt: { $gt: now } }
      ]
    }).sort({ priority: -1, createdAt: -1 });

    res.status(200).json({ success: true, data: announcements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: announcements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ success: false, message: 'Title and message are required' });
    }
    const announcement = await Announcement.create(req.body);
    res.status(201).json({ success: true, data: announcement });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    res.status(200).json({ success: true, data: announcement });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
