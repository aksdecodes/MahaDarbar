import publicApi from './publicApi';
import userApi from './userApi';

const userAuthService = {
  register: async (data) => {
    const response = await publicApi.post('/user-auth/register', data);
    return response.data;
  },
  login: async (mobile, password) => {
    const response = await publicApi.post('/user-auth/login', { mobile, password });
    return response.data;
  },
  getProfile: async () => {
    const response = await userApi.get('/user-auth/profile');
    return response.data;
  },
  getMyPayments: async () => {
    const response = await userApi.get('/user-auth/my-payments');
    return response.data;
  }
};

export default userAuthService;
