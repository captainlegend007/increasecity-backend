import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  // const MONGODB_URI =
  //   "mongodb+srv://emmaekagha11:Lovejesus1234!@cluster0.jpe5jli.mongodb.net/IncreasecityDb";
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};
