import 'dotenv/config'

export const ENV = {
    APP_PORT: process.env.APP_PORT ?? 4000,
    APP_HOST: process.env.APP_HOST ?? "localhost",
    DB_USER: process.env.DB_USER ?? "root",
    DB_PASSWORD: process.env.DB_PASSWORD ?? "mysqlPass2+",
    DB_HOST: process.env.DB_HOST ?? "localhost",
    DB_PORT: process.env.DB_PORT ?? 3306,
    DB_NAME: process.env.DB_NAME ?? "hogero"
}