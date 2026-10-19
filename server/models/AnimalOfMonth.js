import mongoose from "mongoose";

const animalOfMonthSchema = new mongoose.Schema(
  {
    animal: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", default: null },
  },
  { timestamps: true }
);

export default mongoose.model("AnimalOfMonth", animalOfMonthSchema);