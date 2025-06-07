import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGODB_URI =
    "mongodb+srv://Legend:Legend1234@cluster0.ifnkofm.mongodb.net/ExpressDb";

  await mongoose.connect(MONGODB_URI).then(() => {
    console.log("Database Connected");
  });
};
