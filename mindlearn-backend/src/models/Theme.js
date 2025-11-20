// models/Theme.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Theme = sequelize.define("Theme", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
});
