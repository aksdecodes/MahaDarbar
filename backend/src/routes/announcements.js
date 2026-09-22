const express = require('express');
const router = express.Router();
const {
  getActiveAnnouncements,
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/announcementController');
const { protect } = require('../middleware/auth');

router.route('/active')
  .get(getActiveAnnouncements);

router.route('/')
  .get(protect, getAllAnnouncements)
  .post(protect, createAnnouncement);

router.route('/:id')
  .put(protect, updateAnnouncement)
  .delete(protect, deleteAnnouncement);

module.exports = router;
