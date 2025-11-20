// app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { sequelize } from "./db.js";
import { appConfig } from "./config/appConfig.js";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import studentRoutes from "./routes/student.routes.js";
import meRoutes from "./routes/me.routes.js";

export async function createApp() {
    const app = express();

    // Segurança básica
    app.use(helmet());

    // Rate limit simples (pode ajustar)
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
    });
    app.use(limiter);

    // CORS configurável
    const corsOptions = {
        origin: appConfig.corsOrigins.length
        ? appConfig.corsOrigins
        : "*",
        credentials: true,
    };
    app.use(cors(corsOptions));

    app.use(express.json());
    app.use(morgan("dev"));

    // Raiz com versão
    app.get("/", (req, res) => {
        res.json({
            ok: true,
            service: "Mind&Learn API",
            version: appConfig.version,
            env: appConfig.env,
        });
    });

    // Health check
    app.get("/health", async (req, res) => {
        const startedAt = Date.now();
        let dbOk = false;
        let dbError = null;

        try {
            await sequelize.authenticate();
            dbOk = true;
        } catch (err) {
            dbOk = false;
            dbError = err.message;
        }

        const latencyMs = Date.now() - startedAt;

        const payload = {
            ok: dbOk,
            service: "Mind&Learn API",
            version: appConfig.version,
            uptimeSeconds: Math.round(process.uptime()),
            db: {
                ok: dbOk,
                latencyMs,
                error: dbError,
            },
            timestamp: new Date().toISOString(),
        };

        if (!dbOk) return res.status(500).json(payload);
        return res.json(payload);
    });

    // Prefixo de versão
    const prefix = "/api/v1";

    app.use(prefix + "/auth", authRoutes);
    app.use(prefix + "/admin", adminRoutes);
    app.use(prefix + "/teacher", teacherRoutes);
    app.use(prefix + "/student", studentRoutes);
    app.use(prefix + "/me", meRoutes);

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    });

    return app;
}
