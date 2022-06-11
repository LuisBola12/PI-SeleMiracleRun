export const projectQueries = {
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
  getAllContracts: 'Select TipoJornada from Contrato',
};