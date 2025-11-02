import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { myProgress } from "../controllers/progressController.js";
const router = Router();
router.get("/me", requireAuth, myProgress);
export default router;
