import axiosInstance from '../config/axiosConfig';

const CARRITO_URL = '/api/v1/carrito';

const carritoService = {
  // Obtener carrito del usuario
  obtenerCarrito: async (usuarioId) => {
    try {
      const response = await axiosInstance.get(`${CARRITO_URL}/${usuarioId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Agregar producto al carrito
  agregarProducto: async (carritoData) => {
    try {
      const response = await axiosInstance.post(CARRITO_URL, carritoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar cantidad de producto
  actualizarCantidad: async (carritoData) => {
    try {
      const response = await axiosInstance.put(CARRITO_URL, carritoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar producto del carrito
  eliminarProducto: async (carritoId) => {
    try {
      await axiosInstance.delete(`${CARRITO_URL}/${carritoId}`);
    } catch (error) {
      throw error;
    }
  },

  // Vaciar carrito completo
  vaciarCarrito: async (usuarioId) => {
    try {
      await axiosInstance.delete(`${CARRITO_URL}/vaciar/${usuarioId}`);
    } catch (error) {
      throw error;
    }
  }
};

export default carritoService;