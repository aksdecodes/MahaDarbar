import api from './api';

export const paymentService = {
  // Returns array of payments
  getMemberPayments: async (memberId) => {
    const response = await api.get(`/members/${memberId}/payments`);
    return response.data.data;
  },
  // Returns the created payment object
  createPayment: async (memberId, paymentData) => {
    const response = await api.post(`/members/${memberId}/payments`, paymentData);
    return response.data.data;
  }
};
