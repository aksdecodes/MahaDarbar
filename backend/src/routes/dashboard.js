const router = require('express').Router();
const { getStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/stats', getStats);

module.exports = router;