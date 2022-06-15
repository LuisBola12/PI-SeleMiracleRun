CREATE PROCEDURE ObtenerDeduccionesVoluntariasEmpleado(
				@Email VARCHAR(50),
				@Proyecto VARCHAR(50)
)
AS
BEGIN
	SELECT P.CedulaEmpleador, DV.Nombre, P.Nombre, DV.Costo
	FROM Usuarios U
	JOIN Empleado E ON U.Email = E.Email
		JOIN DeduccionVoluntariaElegida DVE ON E.Cedula = DVE.CedulaEmpleado
			JOIN DeduccionesVoluntarias DV ON	DVE.NombreDeduccionVoluntaria = DV.Nombre and
												DVE.NombreProyecto = DV.NombreProyecto		
				JOIN Proyecto P ON DV.NombreProyecto = P.Nombre
	where U.Email = @Email AND P.Nombre = @Proyecto AND DVE.FechaFin > GETDATE()
END;

DROP PROCEDURE ObtenerDeduccionesVoluntariasEmpleado

EXEC ObtenerDeduccionesVoluntariasEmpleado @Email = 'javier.Mo@gmail.com' , @Proyecto = 'Taquería Milagro'

EXEC calcularTotalDeduccionesVoluntariasDeEmpleado @Email = 'javier.Mo@gmail.com' , @Proyecto = 'Taquería Milagro', @ConsecutivoPlanilla = 1, @ConsecutivoPago = 1

CREATE PROCEDURE calcularTotalDeduccionesVoluntariasDeEmpleado (
				@Email VARCHAR(50),
				@Proyecto VARCHAR(50),
				@ConsecutivoPlanilla int,
				@ConsecutivoPago int
) 
AS
BEGIN
	DECLARE @Resultados TABLE(CedulaEmpleador VARCHAR(15),NombreDeduccionVoluntaria VARCHAR(50), NombreProyecto VARCHAR(50), CostoDeduccionVoluntaria real)
	DECLARE @CedulaEmpleador VARCHAR(15), @NombreDeduccionVoluntaria VARCHAR(50), @NombreProyecto VARCHAR(50), @CostoDeduccionVoluntaria real
	INSERT INTO @Resultados EXEC ObtenerDeduccionesVoluntariasEmpleado @Email = @Email, @Proyecto = @Proyecto

	DECLARE cursor__ CURSOR FOR
	SELECT R.CedulaEmpleador, R.NombreDeduccionVoluntaria, R.NombreProyecto, R.CostoDeduccionVoluntaria
	FROM @Resultados R;
	OPEN cursor__

	FETCH NEXT FROM cursor__ INTO @CedulaEmpleador , @NombreDeduccionVoluntaria , @NombreProyecto , @CostoDeduccionVoluntaria
	WHILE @@FETCH_STATUS = 0 
		BEGIN
			INSERT INTO PagoPoseeDeduccionesVoluntarias(ConsecutivoPlanilla, CedulaEmpleador, ConsecutivoPago, NombreDeduccion, NombreProyecto, MontoDeduccion)
			VALUES (@ConsecutivoPlanilla, @CedulaEmpleador, @ConsecutivoPago, @NombreDeduccionVoluntaria, @NombreProyecto, @CostoDeduccionVoluntaria)
		
			FETCH NEXT FROM cursor__ INTO @CedulaEmpleador , @NombreDeduccionVoluntaria , @NombreProyecto , @CostoDeduccionVoluntaria
		END;

	SELECT SUM(R.CostoDeduccionVoluntaria) CostoDeduccion
	FROM @Resultados R

END;