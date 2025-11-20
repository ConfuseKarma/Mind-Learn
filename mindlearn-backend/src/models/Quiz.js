// models/Quiz.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Quiz = sequelize.define("Quiz", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  difficulty: { type: DataTypes.INTEGER, defaultValue: 1 },
});
