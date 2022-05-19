export const queries = {
    getAllUSers: 'Select * From Usuarios' ,
    createNewUser: "Insert into Usuarios (Email,Contrasenia) values(@Email,@Contrasenia)",
    getUserByEmail: "Select * From Usuarios Where Email = @Email",
    getPeriodos: "Select * from Periodo",
    getAllEmployees: "Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado;",
    
}