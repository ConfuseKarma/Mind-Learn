// controllers/admin/admin.theme.controller.js
import { Theme, Lesson } from "../../models/index.js";
import { getPaginationParams, buildPagedResponse } from "../../utils/pagination.js";
import { logAudit } from "../../utils/audit.js";

// GET /admin/themes
export async function listThemesAdmin(req, res, next) {
  try {
    const pagination = getPaginationParams(req);

    if (!pagination) {
      const themes = await Theme.findAll({
        attributes: ["id", "name", "description", "createdAt"],
        order: [["id", "ASC"]],
      });
      return res.json(themes);
    }

    const { page, limit, offset } = pagination;
    const { rows, count } = await Theme.findAndCountAll({
      attributes: ["id", "name", "description", "createdAt"],
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    res.json(buildPagedResponse(rows, count, page, limit));
  } catch (e) {
    next(e);
  }
}

// GET /admin/themes/:id
export async function getThemeAdmin(req, res, next) {
  const id = Number(req.params.id);

  try {
    const theme = await Theme.findByPk(id, {
      include: {
        model: Lesson,
        attributes: ["id", "title", "difficulty"],
      },
    });

    if (!theme) return res.status(404).json({ error: "Theme not found" });
    res.json(theme);
  } catch (e) {
    next(e);
  }
}

// POST /admin/themes
export async function createThemeAdmin(req, res, next) {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });

  try {
    const theme = await Theme.create({ name, description });

    await logAudit(req.user, "ADMIN_CREATE_THEME", {
      themeId: theme.id,
      name: theme.name,
    });

    res.status(201).json(theme);
  } catch (e) {
    next(e);
  }
}

// PUT /admin/themes/:id
export async function updateThemeAdmin(req, res, next) {
  const id = Number(req.params.id);
  const { name, description } = req.body;

  try {
    const theme = await Theme.findByPk(id);
    if (!theme) return res.status(404).json({ error: "Theme not found" });

    if (name !== undefined) theme.name = name;
    if (description !== undefined) theme.description = description;

    await theme.save();

    await logAudit(req.user, "ADMIN_UPDATE_THEME", {
      themeId: theme.id,
    });

    res.json(theme);
  } catch (e) {
    next(e);
  }
}

// DELETE /admin/themes/:id
export async function deleteThemeAdmin(req, res, next) {
  const id = Number(req.params.id);

  try {
    const theme = await Theme.findByPk(id);
    if (!theme) return res.status(404).json({ error: "Theme not found" });

    const name = theme.name;
    await theme.destroy(); // Lessons são apagadas em cascata

    await logAudit(req.user, "ADMIN_DELETE_THEME", {
      themeId: id,
      name,
    });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
