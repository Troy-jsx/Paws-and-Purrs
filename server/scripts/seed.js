import "dotenv/config";
import mongoose from "mongoose";
import Category from "../models/Category.js";
import AnimalStat from "../models/AnimalStat.js";

await mongoose.connect(process.env.MONGO_URI);

if ((await Category.countDocuments()) === 0) {
  await Category.insertMany([
    { name: "Food", raised: 18500, goal: 25000, order: 0 },
    { name: "Medical Care", raised: 12000, goal: 20000, order: 1 },
    { name: "Shelter Upkeep", raised: 9000, goal: 15000, order: 2 },
    { name: "Toys & Bedding", raised: 4200, goal: 6000, order: 3 },
    { name: "Transport", raised: 2500, goal: 8000, order: 4 },
  ]);
  console.log("Categories added");
} else {
  console.log("Categories already exist, skipped");
}

if ((await AnimalStat.countDocuments()) === 0) {
  await AnimalStat.insertMany([
    { label: "Dogs", value: 40, order: 0 },
    { label: "Cats", value: 30, order: 1 },
    { label: "Other", value: 30, order: 2 },
  ]);
  console.log("Animal stats added");
} else {
  console.log("Animal stats already exist, skipped");
}

await mongoose.disconnect();