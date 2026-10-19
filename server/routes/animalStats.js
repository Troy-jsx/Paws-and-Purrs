import { Router } from "express";
import AnimalStat from "../models/AnimalStat.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  res.json(await AnimalStat.find().sort("order"));
});

router.put("/", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const updates = Array.isArray(req.body) ? req.body : [];
    if (updates.some((a) => !a.id || !(Number(a.value) >= 0))) {
      return res.status(400).json({ message: "Each entry needs an id and a value of 0 or more" });
    }

    await AnimalStat.bulkWrite(
      updates.map((a) => ({
        updateOne: { filter: { _id: a.id }, update: { value: Number(a.value) } },
      }))
    );

    res.json(await AnimalStat.find().sort("order"));
  } catch (err) {
    res.status(500).json({ message: "Could not save animal stats"});
  }
});

export default router;