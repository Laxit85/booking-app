import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
  name: String,
  location: String,
  sportType: String,
  pricePerHour: Number,
});

export default mongoose.model("Court", courtSchema);
