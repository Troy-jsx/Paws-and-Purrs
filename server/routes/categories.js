import { Router } from "express";
import Category from "../models/Category.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  res.json(await Category.find().sort("order"));
});

router.put("/", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const updates = Array.isArray(req.body) ? req.body : [];
    const invalid = updates.some(
      (c) => !c.id || !(Number(c.raised) >= 0) || !(Number(c.goal) >= 0)
    );
    if (invalid) {
      return res.status(400).json({ message: "Each category needs an id and amounts of 0 or more" });
    }

    await Category.bulkWrite(
      updates.map((c) => ({
        updateOne: {
          filter: { _id: c.id },
          update: { raised: Number(c.raised), goal: Number(c.goal) },
        },
      }))
    );

    res.json(await Category.find().sort("order"));
  } catch (err) {
    res.status(500).json({ message: "Could not save categories"});
  }
});

router.post("/", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const { name, goal = 0 } = req.body ?? {};
    if (!name) return res.status(400).json({ message: "Name is required" });
    const count = await Category.countDocuments();
    res.status(201).json(await Category.create({ name, goal: Number(goal), order: count }));
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "That category already exists" });
    res.status(500).json({ message: "Could not add category"});
  }
});

router.delete("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;