export const userQueries = {
  getAllUSers: 'Select * From Usuarios',
  createNewUser: 'Insert into Usuarios (Email,Contrasenia,Roles) values(@Email,@Contrasenia,@Roles)',
  createNewEmployee: 'Insert into Empleado (Cedula, Nombre, Apellido1, Apellido2, Telefono, Email) values(@Cedula, @Nombre, @Apellido1, @Apellido2, @Telefono, @Email)',
  getUserByEmail: 'Select * From Usuarios Where Email = @Email',
  verifyCredentials: 'Select * From Usuarios Where Email = @Email AND Contrasenia = @Contrasenia',
  getProfileEmployee: 'Select * From Empleado Where Email = @Email',
  getProfileEmployeer: 'Select * From Empleador Where Email = @Email',
};