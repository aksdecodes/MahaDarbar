export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const getMembershipTypeLabel = (type) => {
  const labels = { Regular: 'Regular', Special: 'Special', Premium: 'Premium' };
  return labels[type] || type;
};

export const getStatusColor = (status) => {
  return status === 'ACTIVE' ? 'active' : 'due';
};
