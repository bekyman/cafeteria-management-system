const BASE_URL = "http://localhost:5000/api/reports";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function fetchDashboard() {
  const res = await fetch(`${BASE_URL}/dashboard`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch dashboard");

  return res.json();
}

export async function fetchRevenue(startDate, endDate) {
  const res = await fetch(
    `${BASE_URL}/revenue?startDate=${startDate}&endDate=${endDate}`,
    { headers: getHeaders() }
  );

  if (!res.ok) throw new Error("Failed to fetch revenue");

  return res.json();
}

export async function fetchTopFoods(limit = 5) {
  const res = await fetch(`${BASE_URL}/top-foods?limit=${limit}`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch top foods");

  return res.json();
}