// routes/admin.routes.js
import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

import {
  listUsers,
  getUserAdmin,
  updateUserRole,
  deleteUser,
} from "../controllers/admin/admin.user.controller.js";

import {
  listThemesAdmin,
  getThemeAdmin,
  createThemeAdmin,
  updateThemeAdmin,
  deleteThemeAdmin,
} from "../controllers/admin/admin.theme.controller.js";

import {
  listLessonsAdmin,
  getLessonAdmin,
  createLessonAdmin,
  updateLessonAdmin,
  deleteLessonAdmin,
} from "../controllers/admin/admin.lesson.controller.js";

import {
  listQuizzesAdmin,
  getQuizAdmin,
  adminCreateQuiz,
  adminUpdateQuiz,
  adminDeleteQuiz,
} from "../controllers/admin/admin.quiz.controller.js";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.get("/users", listUsers);
router.get("/users/:id", getUserAdmin);
router.patch("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

router.get("/themes", listThemesAdmin);
router.get("/themes/:id", getThemeAdmin);
router.post("/themes", createThemeAdmin);
router.put("/themes/:id", updateThemeAdmin);
router.delete("/themes/:id", deleteThemeAdmin);

router.get("/lessons", listLessonsAdmin);
router.get("/lessons/:id", getLessonAdmin);
router.post("/lessons", createLessonAdmin);
router.put("/lessons/:id", updateLessonAdmin);
router.delete("/lessons/:id", deleteLessonAdmin);

router.get("/quizzes", listQuizzesAdmin);
router.get("/quizzes/:id", getQuizAdmin);
router.post("/quizzes", adminCreateQuiz);
router.put("/quizzes/:id", adminUpdateQuiz);
router.delete("/quizzes/:id", adminDeleteQuiz);

export default router;
