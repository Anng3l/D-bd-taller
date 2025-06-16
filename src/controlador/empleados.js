import mysql from "mysql2";

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "123456",
    database: "empleados_bd"
});

const createEmpleadosController = async (req, res) => {
    try
    {
        return;
    }
    catch(e)
    {
        return;
    }
    
}



const updateEmpleadosController = async (req, res) => {
    try
    {
        return;
    }
    catch(e)
    {
        return;
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
        return res.json(results);
        })
    }
    catch(e)
    {

    }
}



const deleteEmpleadosController = async (req, res) => {
    try
    {

    }
    catch(e)
    {

    }
}









export {
    getAllEmpleadosController,
    createEmpleadosController,
    updateEmpleadosController,
    deleteEmpleadosController

}