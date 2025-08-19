import axiosInstance from '../config/axiosConfig';

const USUARIOS_URL = '/usuarios';

const usuarioService = {
  getUserProfile: async () => {
    try {
      const response = await axiosInstance.get(`${USUARIOS_URL}/profile`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const response = await axiosInstance.put(`${USUARIOS_URL}/profile`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Solo para administradores
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get(`/admin/usuarios`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Solo para administradores
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`/admin/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Solo para administradores
  updateUser: async (id, userData) => {
    try {
      const response = await axiosInstance.put(`/admin/usuarios/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Solo para administradores
  deleteUser: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admin/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default usuarioService;