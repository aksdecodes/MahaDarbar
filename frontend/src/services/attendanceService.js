import api from './api';

export const attendanceService = {
  // Public website endpoint (unauthenticated)
  getPublicToday: async () => {
    const response = await api.get('/attendance/public/today');
    return response.data;
  },

  // Token session verification before scan
  verifySessionToken: async (token) => {
    const response = await api.get(`/attendance/verify-session/${token}`);
    return response.data;
  },

  // Member scan attendance
  scanAttendance: async (token) => {
    const memberToken = localStorage.getItem('memberToken') || localStorage.getItem('token');
    const response = await api.post(
      '/attendance/scan',
      { token },
      memberToken ? { headers: { Authorization: `Bearer ${memberToken}` } } : {}
    );
    return response.data;
  },

  // Member get my attendance status for today
  getMyTodayAttendance: async () => {
    const memberToken = localStorage.getItem('memberToken') || localStorage.getItem('token');
    const response = await api.get(
      '/attendance/my/today',
      memberToken ? { headers: { Authorization: `Bearer ${memberToken}` } } : {}
    );
    return response.data;
  },

  // Admin create Lunch session
  createLunchSession: async () => {
    const response = await api.post('/attendance/sessions/lunch');
    return response.data;
  },

  // Admin create Dinner session
  createDinnerSession: async () => {
    const response = await api.post('/attendance/sessions/dinner');
    return response.data;
  },

  // Admin get today summary & counts
  getTodaySummary: async () => {
    const response = await api.get('/attendance/today');
    return response.data;
  }
};

export default attendanceService;
