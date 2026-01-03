import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));
