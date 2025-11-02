import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listQuizzes, getQuiz, attemptQuiz } from "../controllers/quizController.js";
const router = Router();
router.get("/", requireAuth, listQuizzes);
router.get("/:id", requireAuth, getQuiz);
router.post("/:id/attempt", requireAuth, attemptQuiz);
export default router;
