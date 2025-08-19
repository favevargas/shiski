import axiosInstance from '../config/axiosConfig';

const AUTH_URL = '/api/v1/auth';

const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post(`${AUTH_URL}/login`, credentials);
      if (response.data.token) {
        // Guarda el token y la información del usuario
        const storage = credentials.rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', response.data.token);
        storage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post(`${AUTH_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
    return user;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  },

  hasRole: (role) => {
    const user = authService.getCurrentUser();
    return user && user.roles && user.roles.includes(role);
  }
};

export default authService;