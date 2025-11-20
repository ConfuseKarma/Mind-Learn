// models/Question.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Question = sequelize.define("Question", {
  text: { type: DataTypes.TEXT, allowNull: false },
});
