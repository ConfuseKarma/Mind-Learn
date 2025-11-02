import 'dotenv/config'
import { createApp } from './app.js'
import { sequelize } from './db.js'

await sequelize.authenticate()
await sequelize.sync() // cria tabelas se não existirem

const app = await createApp()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Mind&Learn API on http://localhost:${PORT}`))
