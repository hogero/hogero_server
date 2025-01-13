import express from "express";
import { dbPool } from "../db.js"
import moment from "moment";
import { generateUniqueCode } from "../utils.js";

const mainRoutes = express.Router();

mainRoutes.get('/', (req, res) => {
    res.send("Hola");
})

mainRoutes.get('/agendas', async (req, res) => {
    const agendasReq = await dbPool.query(`
        SELECT fechaInicio,fechaFin,duracion
        FROM agendas
        WHERE fechaInicio >= NOW()
        AND fechaInicio < DATE_ADD(NOW(), INTERVAL 5 MONTH)`);
    res.send(agendasReq[0]);
})

mainRoutes.get('/agenda', async (req, res) => {
    const { agendaId } = req.query;
    const agendasReq = await dbPool.query(`
        SELECT *
        FROM agendas
        WHERE agendaId=?`, [agendaId]);
    res.send(agendasReq[0]);
})

mainRoutes.post('/agenda', async (req, res) => {
    const data = req.body;
    const fechaInicio = moment(data.fechaInicio).format("YYYY-MM-DD HH:00:00");
    const finalDate = new Date(data.fechaInicio);
    finalDate.setHours(finalDate.getHours() + 1 + data.duracion);
    const fechaFin = moment(finalDate.toISOString()).format("YYYY-MM-DD HH:00:00");

    const [rowAgendas] = await dbPool.query(`
            SELECT id
            FROM agendas
            WHERE ? >= fechaInicio AND  ? < fechaFin`, [fechaInicio, fechaInicio]);
    if (rowAgendas.length > 0) {
        res.status(400).send({
            status: "E01",
            message: "Ya existe una agenda con esa fecha"
        })
        return;
    }

    const agendaId = generateUniqueCode();

    const [reqData] = await dbPool.query(`
        INSERT INTO agendas (nombre, telefono, email, fechaInicio, fechaFin, duracion, direccion, agendaId) 
        VALUES 
        (?, ?, ?, ?, ?, ?)`,
        [data.nombre, data.telefono, data.email, fechaInicio, fechaFin, data.duracion, data.direccion, agendaId]);
    res.send({
        id: reqData.insertId,
        agendaId: agendaId

    });

})


export default mainRoutes;