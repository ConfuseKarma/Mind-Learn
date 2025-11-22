// routes/teacher.routes.js
import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  listMyLessons,
  getMyLesson,
  createLessonAsTeacher,
  updateMyLesson,
  deleteMyLesson,
} from "../controllers/teacher/teacher.lesson.controller.js";
import {
  listMyQuizzes,
  getMyQuiz,
  createQuizAsTeacher,
  updateMyQuiz,
  deleteMyQuiz,
} from "../controllers/teacher/teacher.quiz.controller.js";

const router = Router();

router.use(requireAuth, requireRole("teacher", "admin"));

router.get("/lessons", listMyLessons);
router.get("/lessons/:id", getMyLesson);
router.post("/lessons", createLessonAsTeacher);
router.put("/lessons/:id", updateMyLesson);
router.delete("/lessons/:id", deleteMyLesson);

router.get("/quizzes", listMyQuizzes);
router.get("/quizzes/:id", getMyQuiz);
router.post("/quizzes", createQuizAsTeacher);
router.put("/quizzes/:id", updateMyQuiz);
router.delete("/quizzes/:id", deleteMyQuiz);

export default router;
