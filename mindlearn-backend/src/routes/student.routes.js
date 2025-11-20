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

const router = Router();

// aluno pode consumir, mas professor e admin também podem usar para testar
router.use(requireAuth, requireRole("student", "teacher", "admin"));

// Lessons
router.get("/themes", listThemes);
router.get("/themes/:id/lessons", listLessonsByTheme);
router.get("/lessons/:id", getLesson);
router.post("/lessons/:id/attempt", attemptLesson);

// Quizzes
router.get("/quizzes", listQuizzes);
router.get("/quizzes/:id", getQuiz);
router.post("/quizzes/:id/attempt", attemptQuiz);

// Progress
router.get("/me/progress", myProgress);

export default router;
