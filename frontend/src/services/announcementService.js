import publicApi from './publicApi';
import api from './api'; // admin api

const announcementService = {
  // Public
  getActiveAnnouncements: async () => {
    const response = await publicApi.get('/announcements/active');
    return response.data;
  },
  // Admin
  getAllAnnouncements: async () => {
    const response = await api.get('/announcements');
    return response.data;
  },
  createAnnouncement: async (data) => {
    const response = await api.post('/announcements', data);
    return response.data;
  },
  updateAnnouncement: async (id, data) => {
    const response = await api.put(`/announcements/${id}`, data);
    return response.data;
  },
  deleteAnnouncement: async (id) => {
    const response = await api.delete(`/announcements/${id}`);
    return response.data;
  }
};

export default announcementService;
