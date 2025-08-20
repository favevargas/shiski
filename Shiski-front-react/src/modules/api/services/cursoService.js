import axiosInstance from '../config/axiosConfig';

// Cambiar la URL para coincidir con el backend
const CURSOS_URL = '/api/v1/cursos';

const cursoService = {
  getAllCursos: async () => {
    try {
      const response = await axiosInstance.get(CURSOS_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCursoById: async (id) => {
    try {
      const response = await axiosInstance.get(`${CURSOS_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCursosByCategoria: async (categoriaId) => {
    try {
      const response = await axiosInstance.get(`${CURSOS_URL}/categoria/${categoriaId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCurso: async (cursoData) => {
    try {
      const response = await axiosInstance.post(CURSOS_URL, cursoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCurso: async (id, cursoData) => {
    try {
      const response = await axiosInstance.put(`${CURSOS_URL}/${id}`, cursoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCurso: async (id) => {
    try {
      const response = await axiosInstance.delete(`${CURSOS_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default cursoService;