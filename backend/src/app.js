import express from "express";
import { swaggerDocs } from "./config/swagger.js";

const app = express();

app.use(express.json());

// Swagger documentation
swaggerDocs(app);

export default app;