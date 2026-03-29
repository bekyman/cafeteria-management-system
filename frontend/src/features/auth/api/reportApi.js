import axios from "axios";

export const fetchDashboard = async () => {
  const response = await axios.get("/api/reports/dashboard");
  return response.data;
};
