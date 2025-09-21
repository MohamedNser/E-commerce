import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { appRouter } from './src/modules/index.router.js'
import express from 'express'


//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })

const port = process.env.PORT 
const app = express()

appRouter(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))