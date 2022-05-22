export const queries = {
  // User queries
  getAllUSers: 'Select * From Usuarios',
  createNewUser: "Insert into Usuarios (Email,Contrasenia) values(@Email,@Contrasenia)",
  createNewEmployee:"Insert into Empleado (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)",
  getUserByEmail: "Select * From Usuarios Where Email = @Email",
  verifyCredentials: "Select * From Usuarios Where Email = @Email AND Contrasenia = @Contrasenia",
  
  // Payroll period queries
  getPeriodos: "Select * from Periodo",
  getAllEmployees: "Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado and ecp.NombreProyecto = @Proyecto;",
  
  // Project queries
  getProjectsByEmail:
    `SELECT Proyecto.[Nombre] FROM Empleador 
    JOIN Proyecto ON Proyecto.CedulaEmpleador = Empleador.Cedula 
    WHERE Empleador.Email =@Email`,
  
  // Voluntary Deduction queries
  getVolDeductions: "Select * From DeduccionesVoluntarias Where NombreProyecto = @NombreProyecto",
  createNewVolDeduction: "Insert into DeduccionesVoluntarias values (@Nombre, @NombreProyecto, @PorcentajeEmpleador, @PorcentajeEmpleado)",
  
  // Benefit queries
  getBenefits: "Select Nombre, CostoActual from Beneficios where NombreProyecto = @Proyecto",
  getAllEmployers: "Select * From Empleador",
  getEmployerByID: "Select * From Empleador Where Cedula = @Cedula",
  createNewEmployer: "Insert into Empleador (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)",
  
  // Employer queries
  getAllContracts: "Select TipoJornada from Contrato",
  addContractOfAnEmployee: "Insert into EmpleadoYContratoSeAsocianAProyecto(CedulaEmpleado,TipoContrato,NombreProyecto,NombreServicio,SalarioPorHoras,ValorDeServicio) values(@Cedula,@TipoJornada,@NombreProyecto,@NombreServicio,@SalarioPorHora,@FechaInicioContrato,@FechaFinContrato,@ValorServicio)",
  getAllEmployeesByID: "Select * From Empleador Where Cedula = @Cedula",
  createBenefit: "Insert into Beneficios (Nombre, NombreProyecto, CostoActual) values (@Nombre, @NombreProyecto ,@CostoActual)"
}
