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
const registerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true },
    attendance: { type: String, required: true },
    userOrder: { type: Object, default: {} },
  },
  {
    collection: "registration",
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
  }
);

export const Person = mongoose.model("Person", personSchema);
export const Testimony = mongoose.model("Testimony", testimonySchema);
export const Register = mongoose.model("Register", registerSchema);
