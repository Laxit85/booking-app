import express from "express";
import { getAvailableSlots, bookSlot } from "../controllers/booking.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/slots", getAvailableSlots);
router.post("/book", protect, bookSlot);

export default router;
