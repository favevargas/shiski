import axiosInstance from '../config/axiosConfig';


const USUARIOS_URL = '/api/v1/usuarios';

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
  }
};

export default usuarioService;