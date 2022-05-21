export const queries = {
  // User queries
  getAllUSers: 'Select * From Usuarios',
  createNewUser: "Insert into Usuarios (Email,Contrasenia) values(@Email,@Contrasenia)",
  getUserByEmail: "Select * From Usuarios Where Email = @Email",
  
  // Payroll period queries
  getPeriodos: "Select * from Periodo",
  
  // Employee queries
  getAllEmployees: "Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado;",
  
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
  
  // Employer queries
  getAllEmployees: "Select * From Empleador",
  getAllEmployeesByID: "Select * From Empleador Where Cedula = @Cedula",
  createNewUser: "Insert into Empleador (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)",
  createBenefit: "Insert into Beneficios (Nombre, NombreProyecto, CostoActual) values (@Nombre, @NombreProyecto ,@CostoActual)"
}
