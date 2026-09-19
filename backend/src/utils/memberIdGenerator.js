const Member = require('../models/Member');

const generateMemberId = async () => {
  const lastMember = await Member.findOne({}, { memberId: 1 }).sort({ createdAt: -1 }).lean();
  if (!lastMember || !lastMember.memberId) return 'MD001';
  
  let nextNum = parseInt(lastMember.memberId.replace('MD', ''), 10) + 1;
  let newId = `MD${String(nextNum).padStart(3, '0')}`;
  
  while (await Member.exists({ memberId: newId })) {
    nextNum++;
    newId = `MD${String(nextNum).padStart(3, '0')}`;
  }
  return newId;
};

module.exports = { generateMemberId };