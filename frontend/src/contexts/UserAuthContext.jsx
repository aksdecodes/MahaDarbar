import { createContext, useState, useContext, useEffect } from 'react';
import userAuthService from '../services/userAuthService';

const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (mobile, password) => {
    const response = await userAuthService.login(mobile, password);
    localStorage.setItem('userToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setUser(response.user);
    return response;
  };

  const register = async (data) => {
    const response = await userAuthService.register(data);
    localStorage.setItem('userToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setUser(response.user);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error('useUserAuth must be used within UserAuthProvider');
  return context;
};

export default UserAuthContext;
