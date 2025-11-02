import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  try {
    const passwordHash = bcrypt.hashSync(password, 10);
    await User.create({ name, email, passwordHash });
    res.status(201).json({ ok: true });
  } catch (e) {
    if (String(e).includes("unique"))
      return res.status(409).json({ error: "Email already registered" });
    res.status(500).json({ error: "Signup failed" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "dev_secret_change_me",
    { expiresIn: "7d" },
  );
  res.json({ token });
}
