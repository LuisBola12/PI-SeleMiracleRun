export const projectQueries = {
  getProjectsByEmail:
    `SELECT Proyecto.[Nombre] FROM Empleador 
  JOIN Proyecto ON Proyecto.CedulaEmpleador = Empleador.Cedula 
  WHERE Empleador.Email = @Email`,
  getEmployeeProjectsByEmail: `SELECT P.[Nombre] FROM EmpleadoYContratoSeAsocianAProyecto ep
  JOIN Proyecto p ON p.Nombre =ep.NombreProyecto 
  JOIN Empleado e on e.Cedula = ep.CedulaEmpleado
  JOIN Usuarios u on e.Email = u.Email 
  WHERE e.Email = @Email`,
  createProject:
    `DECLARE @cedulaObtenida VARCHAR(9);
  SELECT  @cedulaObtenida = Empleador.Cedula FROM Empleador
  JOIN Usuarios on Empleador.Email = Usuarios.Email
  WHERE Empleador.Email = @Email
  INSERT into Proyecto(Nombre,CedulaEmpleador,TipoPeriodo) values (@Nombre,@cedulaObtenida, @Periodo)`,
  getAllContracts: 'Select TipoJornada from Contrato',
};