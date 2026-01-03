import mongoose from "mongoose";
import dotenv from "dotenv";
import Court from "./src/models/Court.js";
import Slot from "./src/models/Slot.js";

dotenv.config();

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  // Clear old data
  await Court.deleteMany();
  await Slot.deleteMany();

  // Create Courts
  const courtsData = [
    { _id: "1", name: "Downtown Basketball Court", location: "123 Main St, Downtown", sportType: "Basketball", pricePerHour: 45 },
    { _id: "2", name: "Elite Tennis Center", location: "456 Oak Ave, Uptown", sportType: "Tennis", pricePerHour: 60 },
    { _id: "3", name: "Prime Soccer Turf", location: "789 Pine Rd, Westside", sportType: "Soccer", pricePerHour: 80 },
    { _id: "4", name: "Ace Badminton Arena", location: "321 Elm St, Eastside", sportType: "Badminton", pricePerHour: 35 },
    { _id: "5", name: "Pro Volleyball Arena", location: "555 Beach Blvd, Coastal", sportType: "Volleyball", pricePerHour: 40 },
    { _id: "6", name: "Champion Cricket Ground", location: "888 Stadium Road, Sports Complex", sportType: "Cricket", pricePerHour: 100 },
    { _id: "7", name: "Urban Squash Club", location: "234 City Center, Midtown", sportType: "Squash", pricePerHour: 30 },
    { _id: "8", name: "Victory Hockey Turf", location: "777 Sports Avenue, North District", sportType: "Hockey", pricePerHour: 70 },
  ];

  for (let courtData of courtsData) {
    await Court.create(courtData);
  }

  // Generate slots for each court
  const times = [
    "6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM",
    "12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM","11:00 PM"
  ];

  for (let courtData of courtsData) {
    for (let time of times) {
      await Slot.create({
        courtId: courtData._id,
        date: "2026-01-05",
        time,
        isBooked: false
      });
    }
  }

  console.log("Courts & Slots Seeded Successfully");
  process.exit();
};

seedDB();
