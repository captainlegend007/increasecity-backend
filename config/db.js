import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGODB_URI =
    "mongodb+srv://emmaekagha6:Lovejesus1234!@cluster0.9pd6s3v.mongodb.net/ExpressDb";

  await mongoose.connect(MONGODB_URI).then(() => {
    console.log("Database Connected");
  });
};
