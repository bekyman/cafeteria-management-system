import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getFoods = async () => {
  try {
    const response = await api.get('/foods');
    return response.data; 
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

export default api;