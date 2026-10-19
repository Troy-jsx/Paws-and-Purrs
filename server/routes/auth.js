import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

//register (we always create a donor big man)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body ?? {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    if (await User.exists({ email: email.toLowerCase() })) {
      return res.status(409).json({ message: "An account with that email already exists" });
    }

    const user = await User.create({
      name,
      email,
      phone,
      passwordHash: await bcrypt.hash(password, 10),
    });

    res.status(201).json({ token: signToken(user), user: user.toSafeJSON() });
  } catch (err) {
  console.error("Register error:", err);
  res.status(500).json({ message: "Could not create account"});
}
});

//log in
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    const user = await User.findOne({ email: email?.toLowerCase() });
    const valid = user && (await bcrypt.compare(password ?? "", user.passwordHash));
    if (!valid) return res.status(401).json({ message: "Incorrect email or password" });

    res.json({ token: signToken(user), user: user.toSafeJSON() });
  } catch (err) {
    res.status(500).json({ message: "Could not log in" });
  }
});

//current user
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user: user.toSafeJSON() });
});

export default router;