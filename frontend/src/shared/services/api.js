import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL
});

export const getFoods = async () => {
  try {
    const response = await api.get('/foods');
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

export default api;