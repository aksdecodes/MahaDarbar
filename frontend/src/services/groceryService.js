import api from './api';

export const groceryService = {
  // Inventory
  getGroceries: async (params = {}) => {
    const response = await api.get('/groceries', { params });
    return response.data.data;
  },
  getGroceryById: async (id) => {
    const response = await api.get(`/groceries/${id}`);
    return response.data.data;
  },
  createGrocery: async (groceryData) => {
    const response = await api.post('/groceries', groceryData);
    return response.data.data;
  },
  updateGrocery: async (id, groceryData) => {
    const response = await api.put(`/groceries/${id}`, groceryData);
    return response.data.data;
  },
  deleteGrocery: async (id) => {
    const response = await api.delete(`/groceries/${id}`);
    return response.data;
  },
  useStock: async (id, usageData) => {
    const response = await api.post(`/groceries/${id}/use-stock`, usageData);
    return response.data;
  },
  getUsageHistory: async (params = {}) => {
    const response = await api.get('/groceries/usage', { params });
    return response.data.data;
  },

  // Purchases
  getPurchases: async (params = {}) => {
    const response = await api.get('/groceries/purchases', { params });
    return response.data.data;
  },
  getPurchaseById: async (id) => {
    const response = await api.get(`/groceries/purchases/${id}`);
    return response.data.data;
  },
  createPurchase: async (purchaseData) => {
    const response = await api.post('/groceries/purchases', purchaseData);
    return response.data.data;
  },

  // Suppliers
  getSuppliers: async () => {
    const response = await api.get('/groceries/suppliers');
    return response.data.data;
  },
  createSupplier: async (supplierData) => {
    const response = await api.post('/groceries/suppliers', supplierData);
    return response.data.data;
  },
  updateSupplier: async (id, supplierData) => {
    const response = await api.put(`/groceries/suppliers/${id}`, supplierData);
    return response.data.data;
  },
  deleteSupplier: async (id) => {
    const response = await api.delete(`/groceries/suppliers/${id}`);
    return response.data;
  },

  // Summary
  getGrocerySummary: async () => {
    const response = await api.get('/groceries/summary');
    return response.data.data;
  }
};
