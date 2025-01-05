import {createPool}  from "mysql2/promise";
import 'dotenv/config'
import { ENV } from "./config.js"

export const dbPool = await createPool({
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    database: ENV.DB_NAME
})