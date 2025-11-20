// models/Badge.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Badge = sequelize.define("Badge", {
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
});
