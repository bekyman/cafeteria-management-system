import express from "express";
import cors from "cors";
import foodRoutes from "./routes/foodRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/foods", foodRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});