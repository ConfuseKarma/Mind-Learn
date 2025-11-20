// controllers/meController.js
import { User } from "../models/index.js";

export async function getMe(req, res) {
    const user = await User.findByPk(req.user.id, {
        attributes: ["id", "name", "email", "role", "createdAt"],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
}
