export const employerQueries = {
  getAllEmployers: 'Select * From Empleador',
  getEmployerByID: 'Select * From Empleador Where Cedula = @Cedula',
  createNewEmployer: 'Insert into Empleador (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)',
  getAllEmployeesByID: 'Select * From Empleador Where Cedula = @Cedula',
};