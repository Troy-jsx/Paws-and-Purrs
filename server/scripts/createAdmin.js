import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const [name, email, password] = process.argv.slice(2);

if (!name || !email || !password) {
  console.log('Usage: npm run create-admin -- "Lexi" lexi@pawsandpurrs.org yourpassword');
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);

const user = await User.findOneAndUpdate(
  { email: email.toLowerCase() },
  { name, email, role: "admin", passwordHash: await bcrypt.hash(password, 10) },
  { upsert: true, new: true }
);

console.log(`Admin ready: ${user.email}`);
await mongoose.disconnect();