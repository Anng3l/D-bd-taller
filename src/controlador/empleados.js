import mysql from "mysql2";

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "123456",
    database: "empleados_bd"
});

const createEmpleadosController = async (req, res) => {
    try {
        const {nombre, cargo, sueldo } = req.body;

        if (!nombre || !cargo || sueldo === undefined) {
            return res.status(400).json({ msg: "Faltan datos obligatorios" });
        }

        connection.query(
            "INSERT INTO personal (nombre, cargo, sueldo) VALUES (?, ?, ?)",
            [nombre, cargo, sueldo],
            (e, results) => {
                if (e) {
                    return res.status(500).json({ msg: "Error al crear un empleado" });
                } else {
                    // results.insertId tiene el id generado (auto_increment)
                    return res.status(201).json({ msg: "Empleado creado exitosamente", id: results.insertId });
                }
            }
        );
    } catch (e) {
        return res.status(500).json({ msg: "Error inesperado", error: e.message });
    }
};





const updateEmpleadosController = async (req, res) => {
    try
    {
        const { id } = req.params;
        const { nombre, cargo, sueldo } = req.body;

        connection.query("SELECT * FROM personal WHERE id = ?", [id], (e, results) => {
            if (e)
            {
                return res.status(500).json({msg: "Error al listar el empleado"});
            }

            if (results.length === 0)
            {
                return res.status(500).json({msg: "Empleado no encontrado"});
            }

            const empleadoActual = results[0];

            const nuevoNombre = nombre ?? empleadoActual.nombre;
            const nuevoCargo = cargo ?? empleadoActual.cargo;
            const nuevoSueldo = sueldo ?? empleadoActual.sueldo;

            connection.query(`UPDATE personal SET nombre = ?, cargo = ?, sueldo = ? WHERE id = ?`, [nuevoNombre, nuevoCargo, nuevoSueldo, id], (e, results) => {
                if (e)
                {
                    return res.status(500).json({msg: "Error al actualizar un empleado"});
                }
                else
                {
                    return res.status(200).json({msg: "Empleado actualizado exitosamente"});
                }
            });
        });
    }
    catch(e)
    {
        return e;
    }
}



const getAllEmpleadosController = async (req, res) => {
    try
    {
        connection.query("SELECT * FROM personal", (e, results) => {
        if (e)
        {
            return res.status(500).json({msg: "Error en el listado"});
        }
        
        return res.status(200).json(results);
        })
    }
    catch(e)
    {
        return e;
    }
}





const deleteEmpleadosController = async (req, res) => {
    try
    {
        const { id } = req.params;

        connection.query(`DELETE FROM personal WHERE id = ?`, [id], (e, results) => {
            if (e)
            {
                return res.status(500).json({msg: "Error al eliminar un empleado"});
            }
            else
            {
                return res.status(200).json({msg: "Empleado eliminado exitosamente"});
            }
        })
    }
    catch(e)
    {
        return e;
    }
}









export {
    getAllEmpleadosController,
    createEmpleadosController,
    updateEmpleadosController,
    deleteEmpleadosController

}