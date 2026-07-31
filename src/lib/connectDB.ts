import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "Docter-Tracker",
    });
    isConnected = true;
  
  } catch (error) {
    console.error("❌ DB connection error", error);
    throw error;
  }
}
