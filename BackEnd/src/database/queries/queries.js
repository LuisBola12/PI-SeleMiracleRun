export const queries = {
  // User queries
  getAllUSers: 'Select * From Usuarios',
  createNewUser: 'Insert into Usuarios (Email,Contrasenia,Roles) values(@Email,@Contrasenia,@Roles)',
  createNewEmployee: 'Insert into Empleado (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)',
  getUserByEmail: 'Select * From Usuarios Where Email = @Email',
  verifyCredentials: 'Select * From Usuarios Where Email = @Email AND Contrasenia = @Contrasenia',
  getProfileEmployee: 'Select * From Empleado Where Email = @Email',
  getProfileEmployeer: 'Select * From Empleador Where Email = @Email',
  udpateEmail: 'Update Usuarios set Email = @Email where Email = @EmailViejo',
  updateEmployee:'Update Empleado set Nombre= @Nombre, Apellido1= @Apellido1 ,Apellido2= @Apellido2,Telefono= @Telefono Where Cedula= @Cedula',
  updateEmployeer:'Update Empleador set Nombre= @Nombre, Apellido1= @Apellido1 ,Apellido2= @Apellido2,Telefono= @Telefono Where Cedula= @Cedula',

  // Payroll period queries
  getPeriodos: 'Select * from Periodo',


  //Employees
  getAllEmployees: 'Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado and ecp.NombreProyecto = @Proyecto;',
  getEmployeeByID: 'Select * From Empleado Where Cedula = @Cedula',
  verifyEmployeeContractProject: 'Select * from EmpleadoYContratoSeAsocianAProyecto ecp where ecp.CedulaEmpleado = @Cedula AND ecp.NombreProyecto = @Proyecto',
  addContractOfAnEmployee:
    `Insert into EmpleadoYContratoSeAsocianAProyecto 
  values(@Cedula,@TipoJornada,@NombreProyecto,@NombreServicio,@SalarioPorHora,
    @FechaInicioContrato,@FechaFinContrato,@ValorServicio)`,

  // Project queries
  getProjectsByEmail:
    `SELECT Proyecto.[Nombre] FROM Empleador 
    JOIN Proyecto ON Proyecto.CedulaEmpleador = Empleador.Cedula 
    WHERE Empleador.Email =@Email`,
  createProject:
    `DECLARE @cedulaObtenida VARCHAR(9);
    SELECT  @cedulaObtenida = Empleador.Cedula FROM Empleador
    JOIN Usuarios on Empleador.Email = Usuarios.Email
    WHERE Empleador.Email =  @Email
    INSERT into Proyecto(Nombre,CedulaEmpleador,TipoPeriodo) values (@Nombre,@cedulaObtenida, @Periodo)`,

  // Voluntary Deduction queries
  getvoluntaryDeductions: 'Select * From DeduccionesVoluntarias Where NombreProyecto = @NombreProyecto',
  createNewvoluntaryDeduction: 'Insert into DeduccionesVoluntarias (Nombre, NombreProyecto, Costo, Descripcion) values (@Nombre, @NombreProyecto, @Costo, @Descripcion)',
  getvoluntaryDeductionsByName: 'Select Nombre from DeduccionesVoluntarias where Nombre = @Nombre and NombreProyecto = @NombreProyecto',

  // Employer
  getAllEmployers: 'Select * From Empleador',
  getEmployerByID: 'Select * From Empleador Where Cedula = @Cedula',
  createNewEmployer: 'Insert into Empleador (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)',
  getAllEmployeesByID: 'Select * From Empleador Where Cedula = @Cedula',
  
  // Contrato
  getAllContracts: 'Select TipoJornada from Contrato',

};
