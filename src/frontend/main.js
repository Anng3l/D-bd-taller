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
        alert("Create");
    }
    catch(e)
    {
        alert(e);
    }
}
function showCreatePanel() {
    const element = document.getElementById("createPanel");
    element.style.display="block";
}
function closeCreatePanel() {
    const element = document.getElementById("createPanel");
    element.style.display="none";
}







const deleteEmpleado = async (idEmpleado) => {
    try
    {
        const resultado = await fetch(`/api/empleados/${idEmpleado}`, {method: "DELETE"});
        const data = await resultado.json();

        alert(data);
    }
    catch(e)
    {
        alert(e);
    }
};










const updateEmpleado = async (idEmpleado) => {
    try
    {
        const resultado = await fetch(`/api/empleados/${idEmpleado}`, {method: "PUT"});
        const data = await resultado.json();

        alert(data);
    }
    catch(e)
    {
        alert(e);
    }
}
async function showEditPanel(id, nombre, cargo, sueldo) {
    let elemento = document.getElementById("editPanel");
    elemento.style.display = "block";

    const nombreCampo = document.getElementById("editNombre");
    nombreCampo.value = nombre;
}
function cancelarUpdate() {
    let elemento = document.getElementById("editPanel");
    elemento.style.display = "none";
}