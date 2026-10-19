import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["donor", "admin"], default: "donor" },
  },
  { timestamps: true }
);

userSchema.methods.toSafeJSON = function () {
  return { id: this._id, name: this.name, email: this.email, phone: this.phone, role: this.role };
};

export default mongoose.model("User", userSchema);