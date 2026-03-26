import { useEffect, useState } from "react";
import api from "../services/api";

export default function Menu() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    api.get("/foods").then((res) => {
      setFoods(res.data?.data || []);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Menu</h1>

      {foods.map((food) => (
        <div key={food._id || food.id} style={{ marginBottom: "10px" }}>
          {food.name} - {food.price} Birr
        </div>
      ))}
    </div>
  );
}