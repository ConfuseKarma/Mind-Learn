// models/UserBadge.js
import { sequelize } from "../db.js";

export const UserBadge = sequelize.define("UserBadge", {}, { timestamps: true });
