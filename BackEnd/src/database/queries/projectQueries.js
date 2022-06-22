export const projectQueries = {
  // Project queries
  getProjectsByEmail:
    `SELECT Proyecto.[Nombre] FROM Empleador 
    JOIN Proyecto ON Proyecto.CedulaEmpleador = Empleador.Cedula 
    WHERE Empleador.Email =@Email AND Proyecto.Activo = 1`,

  getProjectsByEmailAndName:
    `SELECT Proyecto.[Nombre] FROM Empleador 
    JOIN Proyecto ON Proyecto.CedulaEmpleador = Empleador.Cedula 
    WHERE Empleador.Email =@email AND Proyecto.Nombre = @projectName`,

  createProject:
    `DECLARE @cedulaObtenida VARCHAR(9);
    SELECT  @cedulaObtenida = Empleador.Cedula FROM Empleador
    JOIN Usuarios on Empleador.Email = Usuarios.Email
    WHERE Empleador.Email =  @email
    INSERT into Proyecto(Nombre,CedulaEmpleador,TipoPeriodo,Descripcion
      ,Activo,MontoMaximoBeneficiosEmpleado,CantidadMaximaBeneficiosEmpleado) 
      values (@projectName,@cedulaObtenida, @paymentPeriod, @description
      ,1,@maxBenefitsMoneyAmount,@maxBenefitsQuantity)`,

  getEmployeeWorkingInformation:
    `SELECT [CedulaEmpleado]
    ,[TipoContrato]
    ,[NombreProyecto] 
    ,[SalarioPorHoras]
    ,[FechaInicio]
    ,[FechaFin]
    ,[ValorDeServicio]
    ,[TipoPeriodo]
    FROM [EmpleadoYContratoSeAsocianAProyecto] empyc
    JOIN [Proyecto] p ON p.Nombre = empyc.NombreProyecto 
    WHERE [NombreProyecto] = @projectName`,

  getHourlyEmployeeWorkedHours: 
    `SELECT [CedulaEmpleado]
    ,[NombreProyecto]
    ,[Cantidad]
    ,[Fecha]
    FROM [SeleMiracleRun].[dbo].[HorasRegistradas]
    WHERE NombreProyecto = @projectName AND CedulaEmpleado = @employeeId` ,


  getEmployeeProjectsByEmail: `SELECT P.[Nombre] FROM EmpleadoYContratoSeAsocianAProyecto ep
    JOIN Proyecto p ON p.Nombre =ep.NombreProyecto 
    JOIN Empleado e on e.Cedula = ep.CedulaEmpleado
    JOIN Usuarios u on e.Email = u.Email 
    WHERE e.Email = @Email`,

  getAllContracts: 'Select TipoJornada from Contrato',
  createNewPayroll: 'Insert into Planilla values(@CedulaEmpleador,@FechaInicio,@FechaFin,@NombreProyecto)',
  logicalEraseProject: `UPDATE Proyecto 
  SET Activo = 0
  WHERE Nombre = @projectName`,
  getProjectByName: 'Select * FROM Proyecto WHERE Proyecto.Nombre = @projectName',
  updateProject:'Update Proyecto set Nombre= @name, TipoPeriodo= @paymentPeriod',
};
