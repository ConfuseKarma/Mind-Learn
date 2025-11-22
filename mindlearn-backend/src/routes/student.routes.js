// routes/student.routes.js
import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  listThemes,
  listLessonsByTheme,
  getLesson,
  attemptLesson,
} from "../controllers/student/student.lesson.controller.js";
import { myProgress } from "../controllers/student/student.progress.controller.js";
import {
  listQuizzes,
  getQuiz,
  attemptQuiz,
} from "../controllers/student/student.quiz.controller.js";
import {
  listMyActivity,
  getAttemptResolution,
} from "../controllers/student/student.activity.controller.js";

const router = Router();

router.use(requireAuth, requireRole("student", "teacher", "admin"));

router.get("/themes", listThemes);
router.get("/themes/:id/lessons", listLessonsByTheme);
router.get("/lessons/:id", getLesson);
router.post("/lessons/:id/attempt", attemptLesson);

router.get("/quizzes", listQuizzes);
router.get("/quizzes/:id", getQuiz);
router.post("/quizzes/:id/attempt", attemptQuiz);

router.get("/me/progress", myProgress);

router.get("/me/activity", requireRole("student"), listMyActivity);
router.get("/me/activity/:id", requireRole("student"), getAttemptResolution);

export default router;
