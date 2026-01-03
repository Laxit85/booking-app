import Slot from "../models/Slot.js";

export const getAvailableSlots = async (req, res) => {
  const { courtId, date } = req.query;
  const slots = await Slot.find({
    courtId,
    date,
    isBooked: false,
  });
  res.json(slots);
};

export const bookSlot = async (req, res) => {
  const { slotId } = req.body;

  const slot = await Slot.findById(slotId);
  if (!slot || slot.isBooked) {
    return res.status(400).json({ message: "Slot unavailable" });
  }

  slot.isBooked = true;
  slot.bookedBy = req.user.id;
  await slot.save();

  res.json({ message: "Booking confirmed", slot });
};
