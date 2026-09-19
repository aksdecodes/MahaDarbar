import api from './api';

export const memberService = {
  // Returns { members, total, page, pages, limit }
  getAll: async (params = {}) => {
    const response = await api.get('/members', { params });
    return response.data.data;
  },
  // Returns the member object directly
  getById: async (id) => {
    const response = await api.get(`/members/${id}`);
    return response.data.data;
  },
  create: async (memberData) => {
    const response = await api.post('/members', memberData);
    return response.data.data;
  },
  update: async (id, memberData) => {
    const response = await api.put(`/members/${id}`, memberData);
    return response.data.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/members/${id}`);
    return response.data;
  }
};
