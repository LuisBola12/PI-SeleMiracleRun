export const employeesQueries = {
  getAllEmployees: 'Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado and ecp.NombreProyecto = @Proyecto where ecp.FechaFin > GETDATE();',
  getEmployeeByID: 'Select * From Empleado Where Cedula = @Cedula',
  verifyEmployeeContractProject: 'Select * from EmpleadoYContratoSeAsocianAProyecto ecp where ecp.CedulaEmpleado = @Cedula AND ecp.NombreProyecto = @Proyecto',
  addContractOfAnEmployee: `Insert into EmpleadoYContratoSeAsocianAProyecto 
  values(@Cedula,@TipoJornada,@NombreProyecto,@NombreServicio,@SalarioPorHora,
    @FechaInicioContrato,@FechaFinContrato,@ValorServicio)`,
  getEmployeesWithContractsOnOtherProyects: `Select E.Cedula, E.Nombre, ECP.NombreProyecto,ECP.TipoContrato from Empleado E 
  inner join EmpleadoYContratoSeAsocianAProyecto ECP on ECP.CedulaEmpleado = E.Cedula
  inner join Proyecto PR on PR.Nombre = ECP.NombreProyecto
  inner join Empleador EP on EP.Cedula = PR.CedulaEmpleador
  where EP.Email = @Email
  AND E.Cedula NOT IN (
              Select ECP.CedulaEmpleado
            from EmpleadoYContratoSeAsocianAProyecto ECP
            join Empleado E on ECP.CedulaEmpleado = E.Cedula
            join Proyecto P on ECP.NombreProyecto = P.Nombre
            where ECP.NombreProyecto = @Proyecto
          )`,
  createNewEmployee: 'Insert into Empleado (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)',
  contractExistentEmployee: `Insert into EmpleadoYContratoSeAsocianAProyecto values (@Cedula,@TipoJornada,@NombreProyecto,
    @NombreServicio,@SalarioPorHora,@FechaInicioContrato,@FechaFinContrato,@ValorServicio)`,
  deleteEmployeeFromProject: `Delete from EmpleadoYContratoSeAsocianAProyecto where CedulaEmpleado = @Cedula and NombreProyecto = @NombreProyecto`,
  insertHours: 'EXEC ingresarHoras @Email = @EmailEmpleado , @Proyecto = @ProyectoEmpleado, @Fecha = @FechaEmpleado, @CantidadHoras = @CantHorasEmpleado'
};
