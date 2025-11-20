// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { appConfig } from "../config/appConfig.js";
import { SignupSchema, LoginSchema } from "../validation/authSchemas.js";

export async function signup(req, res) {
  const parse = SignupSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid payload", details: parse.error.flatten() });
  }
  const { name, email, password } = parse.data;

  try {
    const passwordHash = bcrypt.hashSync(password, 10);
    await User.create({ name, email, passwordHash, role: "student" });
    res.status(201).json({ ok: true });
  } catch (e) {
    if (String(e).includes("unique"))
      return res.status(409).json({ error: "Email already registered" });
    res.status(500).json({ error: "Signup failed" });
  }
}

export async function login(req, res) {
  const parse = LoginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid payload", details: parse.error.flatten() });
  }
  const { email, password } = parse.data;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, appConfig.jwtSecret, {
    expiresIn: appConfig.jwtExpiresIn,
  });
  res.json({ token, role: user.role, name: user.name });
}
