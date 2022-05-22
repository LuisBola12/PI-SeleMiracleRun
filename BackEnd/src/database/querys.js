export const queries = {
  getAllUSers: 'Select * From Usuarios',
  createNewUser: "Insert into Usuarios (Email,Contrasenia) values(@Email,@Contrasenia)",
  createNewEmployee:"Insert into Empleado (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)",
  getUserByEmail: "Select * From Usuarios Where Email = @Email",
  getPeriodos: "Select * from Periodo",
  getAllEmployees: "Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado and ecp.NombreProyecto = @Proyecto;",
  getProjectsByEmail:
    `SELECT Proyecto.[Nombre] FROM Empleador 
    JOIN Proyecto ON Proyecto.CedulaEmpleador = Empleador.Cedula 
    WHERE Empleador.Email =@Email`,
  getVolDeductions: "Select * From DeduccionesVoluntarias Where NombreProyecto = @Proyecto",
  createNewVolDeduction: "Insert into DeduccionesVoluntarias (Name, NombreProyecto) values(@Name, @Proyecto)",
  getBenefits: "Select Nombre, CostoActual from Beneficios where NombreProyecto = @Proyecto",
  getAllContracts: "Select TipoJornada from Contrato",
  addContractOfAnEmployee: "Insert into EmpleadoYContratoSeAsocianAProyecto(CedulaEmpleado,TipoContrato,NombreProyecto,NombreServicio,SalarioPorHoras,ValorDeServicio) values(@Cedula,@TipoJornada,@NombreProyecto,@NombreServicio,@SalarioPorHora,@FechaInicioContrato,@FechaFinContrato,@ValorServicio)",
  

}
