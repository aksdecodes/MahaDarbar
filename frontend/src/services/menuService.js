import publicApi from './publicApi';

const menuService = {
  getMenuItems: async (params = {}) => {
    const response = await publicApi.get('/menu', { params });
    return response.data;
  },
  getMenuItemById: async (id) => {
    const response = await publicApi.get(`/menu/${id}`);
    return response.data;
  }
};

export default menuService;
