const calculateMemberStatus = (validTill) => {
  if (!validTill) return 'DUE';
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const validDate = new Date(validTill);
  validDate.setHours(0, 0, 0, 0);
  return validDate >= now ? 'ACTIVE' : 'DUE';
};

const calculateValidityExtension = (currentValidTill, paymentDate, months = 1) => {
  let validFrom;
  let validTill;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (currentValidTill) {
    const currentValid = new Date(currentValidTill);
    currentValid.setHours(0, 0, 0, 0);
    if (currentValid >= now) {
      validFrom = new Date(currentValidTill);
      validFrom.setDate(validFrom.getDate() + 1);
    } else {
      validFrom = new Date(paymentDate);
    }
  } else {
    validFrom = new Date(paymentDate);
  }

  validTill = new Date(validFrom);
  validTill.setMonth(validTill.getMonth() + months);
  validTill.setDate(validTill.getDate() - 1);

  return { validFrom, validTill };
};

module.exports = { calculateMemberStatus, calculateValidityExtension };