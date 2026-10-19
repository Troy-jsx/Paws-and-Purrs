import { Router } from "express";
import AdoptionRequest from "../models/AdoptionRequest.js";
import Animal from "../models/Animal.js";
import User from "../models/User.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  try {
    const { animalId } = req.body ?? {};
    const [animal, user] = await Promise.all([
      Animal.findById(animalId),
      User.findById(req.user.id),
    ]);
    if (!animal) return res.status(404).json({ message: "That animal is no longer listed" });
    if (!user) return res.status(404).json({ message: "User not found" });

    const existing = await AdoptionRequest.findOne({ user: user._id, animal: animal._id });
    if (existing) return res.json(existing);

    const request = await AdoptionRequest.create({
      user: user._id,
      animal: animal._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      animalName: animal.name,
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: "Could not send adoption request" });
  }
});

router.get("/", requireAuth, requireRole("admin"), async (req, res) => {
  res.json(await AdoptionRequest.find().sort("-createdAt"));
});

export default router;