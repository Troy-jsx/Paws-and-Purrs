import mongoose from "mongoose";

const animalStatSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true, unique: true },
  value: { type: Number, default: 0, min: 0 },
  order: { type: Number, default: 0 },
});

export default mongoose.model("AnimalStat", animalStatSchema);