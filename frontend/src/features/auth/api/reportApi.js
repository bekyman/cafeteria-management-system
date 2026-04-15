import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

const getToken = () => localStorage.getItem("token");

export const getReports = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const createReport = async (payload) => {
  const response = await axios.post(API_URL, payload, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};