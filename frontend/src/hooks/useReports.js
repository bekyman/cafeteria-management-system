import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/reportApi";

export default function useReports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const result = await fetchDashboard();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return { data, loading, error, refresh: loadDashboard };
}