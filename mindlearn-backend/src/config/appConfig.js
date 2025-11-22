// config/appConfig.js
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = require("../../package.json");

const env = process.env.NODE_ENV || "development";

function parseCorsOrigins(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const corsOrigins = parseCorsOrigins(process.env.CORS_ORIGINS || "");

export const appConfig = {
  env,
  isProd: env === "production",
  version: pkg.version,
  corsOrigins,
  jwtSecret: process.env.JWT_SECRET || "dev_secret_change_me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
