// models/Option.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Option = sequelize.define("Option", {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  explanation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
