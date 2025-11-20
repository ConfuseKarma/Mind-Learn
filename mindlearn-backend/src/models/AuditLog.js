// models/AuditLog.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const AuditLog = sequelize.define("AuditLog", {
    userId: { type: DataTypes.INTEGER, allowNull: true },
    action: { type: DataTypes.STRING, allowNull: false },
    details: { type: DataTypes.TEXT },
});
