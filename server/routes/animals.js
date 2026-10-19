import { Router } from "express";
import Animal from "../models/Animal.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import AnimalOfMonth from "../models/AnimalOfMonth.js";

const router = Router();
const adminOnly = [requireAuth, requireRole("admin")];

function readFields(body) {
  const { name, gender, age, description } = body ?? {};
  return { name, gender, age: Number(age), description };
}

router.get("/", requireAuth, async (req, res) => {
  res.json(await Animal.find().sort("-createdAt"));
});

router.post("/", ...adminOnly, upload.single("image"), async (req, res) => {
  try {
    const animal = await Animal.create({
      ...readFields(req.body),
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });
    res.status(201).json(animal);
  } catch (err) {
    res.status(400).json({ message: "Check the name, gender, age and description"});
  }
});

router.put("/:id", ...adminOnly, upload.single("image"), async (req, res) => {
  try {
    const update = readFields(req.body);
    if (req.file) update.image = `/uploads/${req.file.filename}`;

    const animal = await Animal.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.json(animal);
  } catch (err) {
    res.status(400).json({ message: "Could not update animal"});
  }
});

router.delete("/:id", ...adminOnly, async (req, res) => {
  await Animal.findByIdAndDelete(req.params.id);
  await AnimalOfMonth.updateOne({ animal: req.params.id }, { animal: null });
  res.status(204).end();
});

export default router;