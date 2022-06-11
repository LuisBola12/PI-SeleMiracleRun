export const employeesQueries = {
  getAllEmployees:
    "Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado and ecp.NombreProyecto = @Proyecto;",
  getEmployeeByID: "Select * From Empleado Where Cedula = @Cedula",
  verifyEmployeeContractProject:
    "Select * from EmpleadoYContratoSeAsocianAProyecto ecp where ecp.CedulaEmpleado = @Cedula AND ecp.NombreProyecto = @Proyecto",
  addContractOfAnEmployee: `Insert into EmpleadoYContratoSeAsocianAProyecto 
  values(@Cedula,@TipoJornada,@NombreProyecto,@NombreServicio,@SalarioPorHora,
    @FechaInicioContrato,@FechaFinContrato,@ValorServicio)`,
  getEmployeesWithContractsOnOtherProyects: `Select E.Cedula, E.Nombre, ECP.NombreProyecto,ECP.TipoContrato from Empleado E 
    inner join EmpleadoYContratoSeAsocianAProyecto ECP on ECP.CedulaEmpleado = E.Cedula
    inner join Proyecto PR on PR.Nombre = ECP.NombreProyecto
    inner join Empleador EP on EP.Cedula = PR.CedulaEmpleador
    where EP.Email = @Email AND PR.Nombre != @Proyecto`,
  createNewEmployee: 'Insert into Empleado (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)',
};