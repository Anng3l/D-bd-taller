import express from "express";
import mysql from "mysql2";

import { fileURLToPath } from "url";
import path from "path"


//Controladores
import { createEmpleadosController, updateEmpleadosController, getAllEmpleadosController, deleteEmpleadosController } from "./controlador/empleados.js";

const app = express();
const port = 3000;


//Configurar conexión a DB
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '../frontend')));

/*
// Fallback para rutas SPA (Single Page App)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
*/


app.get("/", getAllEmpleadosController);


app.listen(port, () => {
    console.log(`Sever on http://localhost:${port}`);
})

