import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    age: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Animal", animalSchema);