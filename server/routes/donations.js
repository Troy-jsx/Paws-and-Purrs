import { Router } from "express";
import Donation from "../models/Donation.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();
const adminOnly = [requireAuth, requireRole("admin")];

async function makeReference(categoryName) {
  const prefix = categoryName.replace(/[^a-z]/gi, "").slice(0, 4).toUpperCase() || "DON";
  for (let i = 0; i < 10; i++) {
    const code = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    if (!(await Donation.exists({ reference: code }))) return code;
  }
  throw new Error("Could not generate a unique reference");
}

function startOfPeriod(period) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (period === "week") start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  if (period === "month") start.setDate(1);
  return start;
}

router.post("/", requireAuth, async (req, res) => {
  try {
    const { categoryId, amount, anonymous = false } = req.body ?? {};
    if (!categoryId || !(Number(amount) >= 1)) {
      return res.status(400).json({ message: "Choose a category and an amount of at least R1" });
    }

    const [category, user] = await Promise.all([
      Category.findById(categoryId),
      User.findById(req.user.id),
    ]);
    if (!category) return res.status(404).json({ message: "Category not found" });
    if (!user) return res.status(404).json({ message: "User not found" });

    const donation = await Donation.create({
      user: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      category: category._id,
      categoryName: category.name,
      amount: Number(amount),
      anonymous: Boolean(anonymous),
      reference: await makeReference(category.name),
    });

    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: "Could not create donation"});
  }
});

router.get("/mine", requireAuth, async (req, res) => {
  res.json(await Donation.find({ user: req.user.id }).sort("-createdAt"));
});

router.get("/", ...adminOnly, async (req, res) => {
  const period = ["today", "week", "month"].includes(req.query.period) ? req.query.period : "today";
  const donations = await Donation.find({ createdAt: { $gte: startOfPeriod(period) } }).sort("-createdAt");
  res.json(donations);
});

router.patch("/:id/paid", ...adminOnly, async (req, res) => {
  const donation = await Donation.findOneAndUpdate(
    { _id: req.params.id, status: "pledged" },
    { status: "paid" },
    { new: true }
  );
  if (!donation) return res.status(404).json({ message: "Donation not found or already paid" });

  await Category.findByIdAndUpdate(donation.category, { $inc: { raised: donation.amount } });
  res.json(donation);
});

export default router;