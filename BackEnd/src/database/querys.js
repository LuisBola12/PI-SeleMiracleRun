export const queries = {
  getAllUSers: 'Select * From Usuarios',
  createNewUser: "Insert into Usuarios (Email,Contrasenia) values(@Email,@Contrasenia)",
  getUserByEmail: "Select * From Usuarios Where Email = @Email",
  verifyCredentials: "Select * From Usuarios Where Email = @Email AND Contrasenia = @Contrasenia",
  getPeriodos: "Select * from Periodo",
  getAllEmployees: "Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado;",
  getProjectsByEmail:
    `SELECT Proyecto.[Nombre] FROM Empleador 
    JOIN Proyecto ON Proyecto.CedulaEmpleador = Empleador.Cedula 
    WHERE Empleador.Email =@Email`,
  getVolDeductions: "Select * From DeduccionesVoluntarias Where NombreProyecto = @Proyecto",
  createNewVolDeduction: "Insert into DeduccionesVoluntarias (Name, NombreProyecto) values(@Name, @Proyecto)",
  getBenefits: "Select Nombre, CostoActual from Beneficios where NombreProyecto = @Proyecto",
  getAllEmployers: "Select * From Empleador",
  getEmployerByID: "Select * From Empleador Where Cedula = @Cedula",
  createNewEmployer: "Insert into Empleador (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)",
  createBenefit: "Insert into Beneficios (Nombre, NombreProyecto, CostoActual) values (@Nombre, @NombreProyecto ,@CostoActual)"
}
