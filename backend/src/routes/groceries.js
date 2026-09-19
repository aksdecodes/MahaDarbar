const router = require('express').Router();
const { protect } = require('../middleware/auth');

const {
  getAllGroceries,
  getGroceryById,
  createGrocery,
  updateGrocery,
  deleteGrocery,
  getGrocerySummary,
  useStock,
  getUsageHistory
} = require('../controllers/groceryController');

const {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} = require('../controllers/supplierController');

const {
  getAllPurchases,
  getPurchaseById,
  createPurchase
} = require('../controllers/groceryPurchaseController');

// All grocery routes require JWT protection
router.use(protect);

// Summary route (MUST be placed before /:id)
router.get('/summary', getGrocerySummary);

// Usage history route (MUST be placed before /:id)
router.get('/usage', getUsageHistory);

// Purchases routes (MUST be placed before /:id)
router.route('/purchases')
  .get(getAllPurchases)
  .post(createPurchase);

router.get('/purchases/:id', getPurchaseById);

// Suppliers routes (MUST be placed before /:id)
router.route('/suppliers')
  .get(getAllSuppliers)
  .post(createSupplier);

router.route('/suppliers/:id')
  .put(updateSupplier)
  .delete(deleteSupplier);

// Inventory routes
router.route('/')
  .get(getAllGroceries)
  .post(createGrocery);

router.post('/:id/use-stock', useStock);

router.route('/:id')
  .get(getGroceryById)
  .put(updateGrocery)
  .delete(deleteGrocery);

module.exports = router;
