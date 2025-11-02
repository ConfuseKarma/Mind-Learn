import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import lessonRoutes from "./routes/lesson.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import adminRoutes from "./routes/admin.routes.js";

export async function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/", (req, res) => res.json({ ok: true, service: "Mind&Learn API" }));

  app.use("/auth", authRoutes);
  app.use("/", lessonRoutes);
  app.use("/progress", progressRoutes);
  app.use("/admin", adminRoutes);

  return app;
}
