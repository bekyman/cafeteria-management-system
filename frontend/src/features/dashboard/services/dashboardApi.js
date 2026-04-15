import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

const getToken = () => localStorage.getItem("token");

export const fetchDashboardStats = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};