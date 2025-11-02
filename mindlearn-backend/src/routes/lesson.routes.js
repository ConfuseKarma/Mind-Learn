import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  listThemes,
  listLessonsByTheme,
  getLesson,
  attemptLesson,
} from "../controllers/lessonController.js";
const router = Router();
router.get("/themes", requireAuth, listThemes);
router.get("/themes/:id/lessons", requireAuth, listLessonsByTheme);
router.get("/lessons/:id", requireAuth, getLesson);
router.post("/lessons/:id/attempt", requireAuth, attemptLesson);
export default router;
