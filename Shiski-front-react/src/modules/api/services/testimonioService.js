import axiosInstance from '../config/axiosConfig';

const TESTIMONIOS_URL = '/api/v1/testimonios';

const testimonioService = {
  getAllTestimonios: async () => {
    try {
      const response = await axiosInstance.get(TESTIMONIOS_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTestimoniosByCurso: async (cursoId) => {
    try {
      const response = await axiosInstance.get(`${TESTIMONIOS_URL}/curso/${cursoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default testimonioService;