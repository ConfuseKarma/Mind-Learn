import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { createTheme, createLesson } from "../controllers/adminController.js";
const router = Router();
router.post("/theme", requireAdmin, createTheme);
router.post("/lesson", requireAdmin, createLesson);
export default router;
