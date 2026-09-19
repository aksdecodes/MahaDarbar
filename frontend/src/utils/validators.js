export const validateMobile = (mobile) => {
  return /^[6-9]\d{9}$/.test(mobile);
};

export const validateEmail = (email) => {
  if (!email) return true; // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateMemberForm = (data) => {
  const errors = {};
  if (!data.name?.trim()) errors.name = 'Full name is required';
  if (!data.mobile?.trim()) errors.mobile = 'Mobile number is required';
  else if (!validateMobile(data.mobile.trim())) errors.mobile = 'Enter a valid 10-digit mobile number starting with 6-9';
  if (!data.joiningDate) errors.joiningDate = 'Joining date is required';
  if (!data.monthlyFee) errors.monthlyFee = 'Monthly fee is required';
  else if (isNaN(data.monthlyFee) || Number(data.monthlyFee) <= 0) errors.monthlyFee = 'Enter a valid fee amount';
  if (data.email && !validateEmail(data.email)) errors.email = 'Enter a valid email address';
  return errors;
};
