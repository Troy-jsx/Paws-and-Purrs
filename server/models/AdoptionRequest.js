import mongoose from "mongoose";

const adoptionRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    animal: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    animalName: { type: String, required: true },
    status: { type: String, enum: ["new", "contacted"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.model("AdoptionRequest", adoptionRequestSchema);