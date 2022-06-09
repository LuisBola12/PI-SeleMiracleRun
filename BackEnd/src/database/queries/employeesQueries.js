export const employeesQueries = {
  getAllEmployees: 'Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado and ecp.NombreProyecto = @Proyecto;',
  getEmployeeByID: 'Select * From Empleado Where Cedula = @Cedula',
  verifyEmployeeContractProject: 'Select * from EmpleadoYContratoSeAsocianAProyecto ecp where ecp.CedulaEmpleado = @Cedula AND ecp.NombreProyecto = @Proyecto',
  addContractOfAnEmployee:
    `Insert into EmpleadoYContratoSeAsocianAProyecto 
  values(@Cedula,@TipoJornada,@NombreProyecto,@NombreServicio,@SalarioPorHora,
    @FechaInicioContrato,@FechaFinContrato,@ValorServicio)`,
};