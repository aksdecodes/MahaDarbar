const Member = require('../models/Member');
const Payment = require('../models/Payment');
const { generateMemberId } = require('../utils/memberIdGenerator');
const { calculateMemberStatus } = require('../utils/statusCalculator');

exports.getAllMembers = async (req, res, next) => {
  try {
    const { search = '', status = '', page = 1, limit = 20, sort = 'createdAt', order = 'desc' } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const matchQuery = { isActive: true };
    if (search) {
      const regex = new RegExp(search, 'i');
      matchQuery.$or = [{ name: regex }, { mobile: regex }, { memberId: regex }];
    }

    const sortDir = order === 'asc' ? 1 : -1;
    const allowedSorts = ['name', 'memberId', 'joiningDate', 'createdAt', 'monthlyFee'];
    const sortField = allowedSorts.includes(sort) ? sort : 'createdAt';

    let members = await Member.aggregate([
      { $match: matchQuery },
      {
        $lookup: {
          from: 'payments',
          let: { memberId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$member', '$$memberId'] }, status: 'PAID' } },
            { $sort: { validTill: -1 } },
            { $limit: 1 }
          ],
          as: 'latestPayment'
        }
      },
      {
        $addFields: {
          validTill: { $arrayElemAt: ['$latestPayment.validTill', 0] },
          lastPaymentDate: { $arrayElemAt: ['$latestPayment.paymentDate', 0] },
          currentStatus: {
            $cond: {
              if: {
                $and: [
                  { $gt: [{ $size: '$latestPayment' }, 0] },
                  { $gte: [{ $arrayElemAt: ['$latestPayment.validTill', 0] }, today] }
                ]
              },
              then: 'ACTIVE',
              else: 'DUE'
            }
          }
        }
      },
      { $unset: 'latestPayment' }
    ]);

    if (status === 'ACTIVE' || status === 'DUE') {
      members = members.filter(m => m.currentStatus === status);
    }

    const total = members.length;
    members.sort((a, b) => {
      let aVal = a[sortField]; let bVal = b[sortField];
      if (sortField === 'validTill') { aVal = a.validTill; bVal = b.validTill; }
      if (aVal < bVal) return -1 * sortDir;
      if (aVal > bVal) return 1 * sortDir;
      return 0;
    });

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedMembers = members.slice(startIndex, startIndex + limitNum);

    res.json({ success: true, data: { members: paginatedMembers, total, page: pageNum, pages: Math.ceil(total / limitNum), limit: limitNum } });
  } catch (error) { next(error); }
};

exports.getMemberById = async (req, res, next) => {
  try {
    const member = await Member.findOne({ _id: req.params.id, isActive: true }).lean();
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    const latestPayment = await Payment.findOne({ member: member._id, status: 'PAID' }).sort({ validTill: -1 }).lean();
    res.json({ success: true, data: { ...member, currentStatus: calculateMemberStatus(latestPayment?.validTill), latestPayment } });
  } catch (error) { next(error); }
};

exports.createMember = async (req, res, next) => {
  try {
    const { name, mobile, email, address, joiningDate, monthlyFee, membershipType } = req.body;
    if (!name || !mobile || !joiningDate || monthlyFee === undefined) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    const exists = await Member.findOne({ mobile, isActive: true });
    if (exists) return res.status(400).json({ success: false, message: 'Mobile number already used' });
    const memberId = await generateMemberId();
    const newMember = await Member.create({ memberId, name, mobile, email, address, joiningDate, monthlyFee, membershipType });
    res.status(201).json({ success: true, data: newMember });
  } catch (error) { next(error); }
};

exports.updateMember = async (req, res, next) => {
  try {
    const { name, mobile, email, address, joiningDate, monthlyFee, membershipType } = req.body;
    const member = await Member.findOne({ _id: req.params.id, isActive: true });
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    if (mobile && mobile !== member.mobile) {
      const exists = await Member.findOne({ mobile, isActive: true });
      if (exists) return res.status(400).json({ success: false, message: 'Mobile number already used' });
    }
    Object.assign(member, { name, mobile, email, address, joiningDate, monthlyFee, membershipType });
    await member.save();
    res.json({ success: true, data: member });
  } catch (error) { next(error); }
};

exports.deleteMember = async (req, res, next) => {
  try {
    const member = await Member.findOne({ _id: req.params.id, isActive: true });
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    member.isActive = false;
    await member.save();
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (error) { next(error); }
};