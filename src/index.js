import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

import {
  createEmpleadosController,
  updateEmpleadosController,
  getAllEmpleadosController,
  deleteEmpleadosController
} from "./controlador/empleados.js";

const app = express();
const port = 3000;

app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos del frontend
const frontendPath = path.join(__dirname, './frontend');
app.use(express.static(frontendPath));

// Rutas API
app.get("/api/empleados", getAllEmpleadosController);
app.post("/api/empleados", createEmpleadosController);
app.put("/api/empleados/:id", updateEmpleadosController);
app.delete("/api/empleados/:id", deleteEmpleadosController);



// Fallback manual para SPA (sin usar comodines)
app.use((req, res, next) => {
  const indexPath = path.join(frontendPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("No se encontró el frontend");
  }
});

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
