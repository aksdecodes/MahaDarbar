const router = require('express').Router();
const { getAllMembers, getMemberById, createMember, updateMember, deleteMember } = require('../controllers/memberController');
const { createPayment, getMemberPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getAllMembers).post(createMember);
router.route('/:id').get(getMemberById).put(updateMember).delete(deleteMember);
router.route('/:id/payments').get(getMemberPayments).post(createPayment);

module.exports = router;