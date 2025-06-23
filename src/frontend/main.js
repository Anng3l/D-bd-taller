const listUsers = async () => {
    try
    {
        const response = await fetch("http://localhost:3000/api/empleados");
        const data = await response.json();

        let content = ``;
        let index = 0;
        data.forEach(empleado => {
            content += `
            <tr>
                <td class="centrado">${index+1}</td>
                <td class="centrado">${empleado.id}</td>
                <td class="centrado">${empleado.nombre}</td>
                <td class="centrado">${empleado.cargo}</td>
                <td class="centrado">${empleado.sueldo}</td>
                <td class="centrado">
                    <button class="btn btn-sm btn-primary" onClick="showEditPanel('${empleado.id}', '${empleado.nombre}', '${empleado.cargo}', '${empleado.sueldo}')"> <i class="fa-solid fa-pencil"></i> </button>
                    <button class="btn btn-sm btn-danger" onClick="deleteEmpleado(${empleado.id})"> <i class="fa-solid fa-trash"></i> </button>
                </td>
            </tr>`;
            index++;
        });


        const elemento = document.getElementById("tableBodyUsers");

        elemento.innerHTML=content;
    }
    catch(e)
    {
        alert(e);
    }
};

// ------------------------- Data Table -------------------------
let dataTable;
let dataTableInitialized = false;

const dataTableConfig = {
    pageLength: 10,
    //Indicar que sea una tabla que se pueda destruir
    destroy: true,

};

const initDataTable = async () => {
    if (dataTableInitialized === true)
    {
        dataTable.destroy();
    }
    
    await listUsers();


    dataTable = $("#dataTableUsers").DataTable(dataTableConfig);
    
    
    dataTableInitialized = true;
};



window.addEventListener("load", async () => {
    await initDataTable();
});


















const createEmpleado = async () => {
    try
    {
        const id = Math.floor(Math.random() * (100000000000 - 100 + 1)) + 100;
        const nombreCampo = document.getElementById("editNombre");
        const cargoCampo = document.getElementById("editCargo");
        const sueldoCampo = document.getElementById("editSueldo");
        

        const resultado = await fetch(`/api/empleados`, {
            method: "POST",
            
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre: nombreCampo.value,
                cargo: cargoCampo.value,
                sueldo: sueldoCampo.value
            })
        });
        const data = await resultado.json();

        alert(data.msg);
        await initDataTable();
        cancelarUpdate();
    }
    catch(e)
    {
        alert(e);
    }
}
function showCreatePanel() {
    const element = document.getElementById("editPanel");
    element.style.display="block";
    const titulo = document.getElementById("tituloPanel");
    titulo.innerText = "Crear Empleado";
    const boton = document.getElementById("actualizarButton");
    boton.onclick = createEmpleado;
    boton.innerText = "Crear";

    const nombreCampo = document.getElementById("editNombre");
    nombreCampo.value = "";
    const cargoCampo = document.getElementById("editCargo");
    cargoCampo.value = "";
    const sueldoCampo = document.getElementById("editSueldo");
    sueldoCampo.value = "";

}
function closeCreatePanel() {
    const element = document.getElementById("createPanel");
    element.style.display="none";
}



















const updateEmpleado = async (idEmpleado) => {
    try
    {
        const nombreCampo = document.getElementById("editNombre");
        const cargoCampo = document.getElementById("editCargo");
        const sueldoCampo = document.getElementById("editSueldo");



        const resultado = await fetch(`/api/empleados/${idEmpleado}`, {
            method: "PUT",
            
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre: nombreCampo.value,
                cargo: cargoCampo.value,
                sueldo: sueldoCampo.value
            })
        });
        const data = await resultado.json();

        alert(data.msg);
        await initDataTable();
        cancelarUpdate();
    }
    catch(e)
    {
        alert(e);
    }
}
async function showEditPanel(id, nombre, cargo, sueldo) {
    let elemento = document.getElementById("editPanel");
    elemento.style.display = "block";

    const titulo = document.getElementById("tituloPanel");
    titulo.innerText = "Actualizar Empleado";
    const buttonActualizar = document.getElementById("actualizarButton");
    buttonActualizar.onclick = async () => await updateEmpleado(id);
    buttonActualizar.innerText = "Actualizar";

    const nombreCampo = document.getElementById("editNombre");
    nombreCampo.value = nombre;
    const cargoCampo = document.getElementById("editCargo");
    cargoCampo.value = cargo;
    const sueldoCampo = document.getElementById("editSueldo");
    sueldoCampo.value = sueldo;
}
function cancelarUpdate() {
    let elemento = document.getElementById("editPanel");
    elemento.style.display = "none";
}


























const deleteEmpleado = async (idEmpleado) => {
    try
    {
        const resultado = await fetch(`/api/empleados/${idEmpleado}`, {method: "DELETE"});
        const data = await resultado.json();

        alert("Usuario eliminado con éxito");
        await initDataTable();
    }
    catch(e)
    {
        alert(e);
    }
};

