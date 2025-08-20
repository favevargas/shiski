import axiosInstance from '../config/axiosConfig';

const CARRITO_URL = '/carrito';

const carritoService = {
  getCarrito: async () => {
    try {
      const response = await axiosInstance.get(CARRITO_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addToCarrito: async (cursoId) => {
    try {
      const response = await axiosInstance.post(`${CARRITO_URL}/add/${cursoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeFromCarrito: async (cursoId) => {
    try {
      const response = await axiosInstance.delete(`${CARRITO_URL}/remove/${cursoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  clearCarrito: async () => {
    try {
      const response = await axiosInstance.delete(`${CARRITO_URL}/clear`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  checkout: async () => {
    try {
      const response = await axiosInstance.post(`${CARRITO_URL}/checkout`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default carritoService;