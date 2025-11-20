// server.js
import "dotenv/config";
import { sequelize } from "./db.js";
import "./models/index.js";
import { createApp } from "./app.js";

await sequelize.authenticate();
await sequelize.sync();

const app = await createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Mind&Learn API on http://localhost:${PORT}`);
});
