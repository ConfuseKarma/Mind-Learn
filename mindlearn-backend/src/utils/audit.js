// utils/audit.js
import { AuditLog } from "../models/index.js";

export async function logAudit(user, action, details) {
    try {
        await AuditLog.create({
            userId: user?.id || null,
            action,
            details:
            typeof details === "string"
            ? details
            : JSON.stringify(details ?? {}),
        });
    } catch (e) {
        console.error("Failed to write audit log:", e);
    }
}
