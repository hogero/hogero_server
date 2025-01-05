import express from "express";
import bodyParser from "body-parser";
import mainRoutes from "./routes/main.js";
import { ENV } from "./config.js"

const app = express();
app.listen(ENV.APP_PORT, () => {
    console.log(`Servidor iniciado en http://${ENV.APP_HOST}:${ENV.APP_PORT}`);
});

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Request -> JSON

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rewrite routes
app.use('', mainRoutes);