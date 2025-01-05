import express from "express";
import { dbPool } from "../db.js"
import moment from "moment";

const mainRoutes = express.Router();

mainRoutes.get('/', (req, res) => {
    res.send("Hola");
})

mainRoutes.get('/agendas', async (req, res) => {
    const agendasReq = await dbPool.query(`
        SELECT *
        FROM agendas
        WHERE fechaInicio >= NOW()
        AND fechaInicio < DATE_ADD(NOW(), INTERVAL 5 MONTH)`);
    res.send(agendasReq[0]);
})

mainRoutes.post('/agenda', async (req, res) => {
    const data = req.body;
    const fechaInicio = moment(data.fecha).format("YYYY-MM-DD HH:mm:ss");
    const finalDate = new Date(data.fecha);
    finalDate.setHours(finalDate.getHours()+1+data.duracion);
    const fechaFin = moment(finalDate.toISOString()).format("YYYY-MM-DD HH:mm:ss");
    
    const [rowAgendas] = await dbPool.query(`
            SELECT *
            FROM agendas
            WHERE ? >= fechaInicio AND  ? < fechaFin`, [fechaInicio, fechaInicio]);
    if (rowAgendas.length > 0) {
        res.status(400).send({
            status: "E01",
            message: "Ya existe una agenda con esa fecha"
        })
        return;
    }

    const [reqData] = await dbPool.query(`
        INSERT INTO agendas (nombre, telefono, email, fechaInicio, fechaFin, duracion) 
        VALUES 
        (?, ?, ?, ?, ?, ?)`,
        [data.nombre, data.telefono, data.email, fechaInicio, fechaFin, data.duracion]);
    res.send({
        id: reqData.insertId
    });

})


export default mainRoutes;