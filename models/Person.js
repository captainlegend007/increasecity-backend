import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true },
    prayer: { type: String, required: true },
    userOrder: { type: Object, default: {} },
  },
  {
    collection: "people",
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
  }
);

const testimonySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true },
    testimony: { type: String, required: true },
    userOrder: { type: Object, default: {} },
  },
  {
    collection: "testimonies",
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
  }
);

export const Person = mongoose.model("Person", personSchema);
export const Testimony = mongoose.model("Testimony", testimonySchema);
