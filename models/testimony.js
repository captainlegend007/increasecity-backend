import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true },
    testimony: { type: String, required: true },
  },
  { timestamps: true, minimize: false }
);

export const Testimony = mongoose.model("Testimony", personSchema);
