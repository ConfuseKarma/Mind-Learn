// models/Attempt.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Attempt = sequelize.define("Attempt", {
  score: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.INTEGER, allowNull: false },
});
