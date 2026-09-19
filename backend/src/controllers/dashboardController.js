const { calculateMemberStatus } = require('../utils/statusCalculator');
const Member = require('../models/Member');
const Payment = require('../models/Payment');

exports.getStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const memberStats = await Member.aggregate([
      { $match: { isActive: true } },
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
          latestValidTill: { $arrayElemAt: ['$latestPayment.validTill', 0] },
          status: {
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
      }
    ]);

    const totalMembers = memberStats.length;
    const activeMembers = memberStats.filter(m => m.status === 'ACTIVE').length;
    const feesDue = totalMembers - activeMembers;

    const recentMembers = await Member.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const recentMembersWithStatus = await Promise.all(
      recentMembers.map(async (member) => {
        const latestPayment = await Payment.findOne({ member: member._id, status: 'PAID' })
          .sort({ validTill: -1 })
          .lean();
        return {
          ...member,
          currentStatus: calculateMemberStatus(latestPayment?.validTill),
          validTill: latestPayment?.validTill || null
        };
      })
    );

    const dueMembers = memberStats
      .filter(m => m.status === 'DUE')
      .slice(0, 5);

    res.json({
      success: true,
      data: { totalMembers, activeMembers, feesDue, recentMembers: recentMembersWithStatus, recentDueMembers: dueMembers }
    });
  } catch (error) {
    next(error);
  }
};