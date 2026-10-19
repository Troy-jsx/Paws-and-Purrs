import { Router } from "express";
import AnimalOfMonth from "../models/AnimalOfMonth.js";
import Animal from "../models/Animal.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();


router.get("/", requireAuth, async (req, res) => {
  const doc = await AnimalOfMonth.findOne().populate("animal");
  res.json(doc?.animal ?? null);
});


router.put("/", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const { animalId } = req.body ?? {};
    if (!animalId || !(await Animal.exists({ _id: animalId }))) {
      return res.status(400).json({ message: "Choose an animal from the adoption list" });
    }

    const doc = await AnimalOfMonth.findOneAndUpdate(
      {},
      { animal: animalId },
      { new: true, upsert: true }
    ).populate("animal");

    res.json(doc.animal);
  } catch (err) {
    res.status(500).json({ message: "Could not save Animal of the Month"});
  }
});

export default router;