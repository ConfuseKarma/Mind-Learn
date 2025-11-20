// controllers/admin/admin.user.controller.js
import { User } from "../../models/index.js";
import { getPaginationParams, buildPagedResponse } from "../../utils/pagination.js";
import { logAudit } from "../../utils/audit.js";

// GET /admin/users
export async function listUsers(req, res, next) {
  try {
    const pagination = getPaginationParams(req);

    if (!pagination) {
      const users = await User.findAll({
        attributes: ["id", "name", "email", "role", "createdAt"],
        order: [["id", "ASC"]],
      });
      return res.json(users);
    }

    const { page, limit, offset } = pagination;
    const { rows, count } = await User.findAndCountAll({
      attributes: ["id", "name", "email", "role", "createdAt"],
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    res.json(buildPagedResponse(rows, count, page, limit));
  } catch (e) {
    next(e);
  }
}

// GET /admin/users/:id
export async function getUserAdmin(req, res, next) {
  const id = Number(req.params.id);

  try {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "role", "createdAt"],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (e) {
    next(e);
  }
}

// PATCH /admin/users/:id/role
export async function updateUserRole(req, res, next) {
  const id = Number(req.params.id);
  const { role } = req.body;

  if (!["admin", "teacher", "student"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const oldRole = user.role;
    user.role = role;
    await user.save();

    await logAudit(req.user, "ADMIN_UPDATE_USER_ROLE", {
      targetUserId: user.id,
      oldRole,
      newRole: role,
    });

    res.json({ id: user.id, role: user.role });
  } catch (e) {
    next(e);
  }
}

// DELETE /admin/users/:id
export async function deleteUser(req, res, next) {
  const id = Number(req.params.id);

  // opcional: impedir auto delete
  if (id === req.user.id) {
    return res.status(400).json({ error: "You cannot delete your own user" });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const oldRole = user.role;

    await user.destroy(); // Attempts e UserBadges em cascata

    await logAudit(req.user, "ADMIN_DELETE_USER", {
      targetUserId: id,
      oldRole,
    });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
