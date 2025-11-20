// models/UserBadge.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const UserBadge = sequelize.define(
    "UserBadge",
    {},
    { timestamps: true },
);
