import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    categoryName: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
    anonymous: { type: Boolean, default: false },
    reference: { type: String, required: true, unique: true },
    status: { type: String, enum: ["pledged", "paid"], default: "pledged" },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);