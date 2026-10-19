import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import animalStatRoutes from "./routes/animalStats.js";
import animalRoutes from "./routes/animals.js"; //idk why this is tweaking ngl man but we ball
import animalOfMonthRoutes from "./routes/animalOfMonth.js";
import donationRoutes from "./routes/donations.js";
import adoptionRequestRoutes from "./routes/adoptionRequests.js";

mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
  },
});

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));


app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/animal-stats", animalStatRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/animal-of-the-month", animalOfMonthRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/adoption-requests", adoptionRequestRoutes);

app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body isn't valid JSON" });
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Image must be 5MB or smaller" });
  }
  if (err.message === "Only image files are allowed") {
    return res.status(400).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`API running on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err.message);
    process.exit(1);
  });