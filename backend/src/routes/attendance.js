const express = require('express');
const router = express.Router();
const {
  createLunchSession,
  createDinnerSession,
  getPublicToday,
  verifySessionToken,
  scanAttendance,
  getMyTodayAttendance,
  getTodaySummary,
  getTodayLunch,
  getTodayDinner
} = require('../controllers/attendanceController');

const { protect } = require('../middleware/auth');
const { protectUser } = require('../middleware/userAuth');

// 1. PUBLIC ROUTES (No auth required)
router.get('/public/today', getPublicToday);
router.get('/verify-session/:token', verifySessionToken);

// 2. MEMBER ROUTES (User auth required)
router.post('/scan', protectUser, scanAttendance);
router.get('/my/today', protectUser, getMyTodayAttendance);

// 3. ADMIN ROUTES (Admin auth required)
router.post('/sessions/lunch', protect, createLunchSession);
router.post('/sessions/dinner', protect, createDinnerSession);
router.get('/today', protect, getTodaySummary);
router.get('/today/lunch', protect, getTodayLunch);
router.get('/today/dinner', protect, getTodayDinner);

module.exports = router;
