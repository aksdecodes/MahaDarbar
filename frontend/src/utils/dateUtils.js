export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
};

export const formatDateInput = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

export const getDaysRemaining = (validTill) => {
  if (!validTill) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const validDate = new Date(validTill);
  validDate.setHours(0, 0, 0, 0);
  const diff = Math.ceil((validDate - today) / (1000 * 60 * 60 * 24));
  return diff;
};

export const isExpired = (validTill) => {
  if (!validTill) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const validDate = new Date(validTill);
  validDate.setHours(0, 0, 0, 0);
  return validDate < today;
};
