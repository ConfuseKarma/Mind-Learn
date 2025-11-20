// models/Lesson.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Lesson = sequelize.define("Lesson", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  difficulty: { type: DataTypes.INTEGER, defaultValue: 1 },
});
