import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();

// CORS setup
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);

export default app;
