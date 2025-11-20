// middleware/auth.js
import jwt from "jsonwebtoken";
import { appConfig } from "../config/appConfig.js";

export function requireAuth(req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing token" });
    try {
        const decoded = jwt.verify(token, appConfig.jwtSecret);
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
        return next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}

export function requireRole(...allowed) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: "Not authenticated" });
        if (!allowed.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
}
