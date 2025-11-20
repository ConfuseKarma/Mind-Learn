// src/config/appConfig.js
import { createRequire } from "module";

const require = createRequire(import.meta.url);
// Ajuste o caminho se seu package.json não estiver na raiz
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
  version: pkg.version, // vem direto do package.json
  corsOrigins,
  jwtSecret: process.env.JWT_SECRET || "dev_secret_change_me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
