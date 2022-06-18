CREATE PROCEDURE ingresarHoras (
				@Email VARCHAR(50),
				@Proyecto VARCHAR(50),
				@Fecha date,
				@CantidadHoras int
) 
AS
BEGIN
	DECLARE @CedulaEmpleado VARCHAR(15)

	select  @CedulaEmpleado = E.Cedula
	from Empleado E
	where E.Email = @Email 
	
	INSERT INTO EmpleadoRegistraHorasEnProyecto(CedulaEmpleado, NombreProyecto, Cantidad, Fecha)
	Values (@CedulaEmpleado, @Proyecto, @CantidadHoras, @Fecha)

END;

 ------ Eliminar un empleado del proyecto
Create Procedure DeleteAnEmployeeFromAProject @Cedula varchar(15), @Proyecto varchar(50)
AS
    Declare @NumeroDeBeneficios int;
    Select @NumeroDeBeneficios = Count() from EmpleadoGozaBeneficios 
    where CedulaEmpleado = @Cedula and NombreProyecto = @Proyecto;
    If(@NumeroDeBeneficios > 0)
    Begin
        Delete from EmpleadoGozaBeneficios where CedulaEmpleado = @Cedula and NombreProyecto = @Proyecto;
    End
    Else
        Begin
            Print 'This Employee doesnt have benefits'
        End

    Declare @NumeroDeDeduccionesVoluntarias int;
    Select @NumeroDeDeduccionesVoluntarias = Count() from EmpleadoAplicaDeduccionesVolundarias 
    where CedulaEmpleado = @Cedula and NombreProyecto = @Proyecto;
    If(@NumeroDeDeduccionesVoluntarias > 0)
    Begin
        Delete from EmpleadoAplicaDeduccionesVolundarias where CedulaEmpleado = @Cedula and NombreProyecto = @Proyecto;
    End
    Else
        Begin
            Print 'This Employee doesnt have Voluntary Deductions'
        End
    Delete from EmpleadoYContratoSeAsocianAProyecto where CedulaEmpleado = @Cedula and NombreProyecto = @Proyecto;

CREATE PROCEDURE obtenerDatosUsuario (
				@Email VARCHAR(50),
				@Contrasenia VARCHAR(20)
) 
AS
BEGIN
	DECLARE @Resultados table(Cedula VARCHAR(15),Email VARCHAR(50), Roles VARCHAR(20), TipoContrato VARCHAR(30))
	DECLARE @Cedula VARCHAR(15), @EmailEmp VARCHAR(50), @Roles VARCHAR(20), @TipoContrato VARCHAR(30)

	SELECT @Roles = U.Roles 
	FROM Usuarios U
	WHERE U.Email = @Email AND U.Contrasenia = @Contrasenia

	IF (@Roles = 'admin')
		BEGIN
			SELECT @Cedula = E.Cedula, @EmailEmp = e.Email
			FROM Empleador E
			WHERE E.Email = @Email
			SET @TipoContrato = ''
		END;
	ELSE
		BEGIN
		SELECT  @Cedula = E.Cedula,  @EmailEmp = E.Email ,@TipoContrato = EAP.TipoContrato
		FROM Empleado E 
		JOIN EmpleadoYContratoSeAsocianAProyecto EAP ON E.Cedula = EAP.CedulaEmpleado
		WHERE E.Email = @Email
		END;

	INSERT INTO @Resultados(Cedula,Email, Roles , TipoContrato )
	VALUES(@Cedula, @EmailEmp, @Roles, @TipoContrato)

	SELECT * FROM @Resultados WHERE Cedula IS NOT NULL;
END;

CREATE PROCEDURE vincularBeneficioEmpleado 
  @Email VARCHAR(50),
  @NombreBeneficio VARCHAR(50),
  @NombreProyecto VARCHAR(50)
as 
BEGIN
  DECLARE @cedula VARCHAR(15);
  DECLARE @fechaFin DATETIME;
  DECLARE @fechaInicio DATETIME;

  SET @fechaInicio = GETDATE();
  SELECT @cedula = Cedula From Empleado WHERE Email = @Email;
  SELECT @fechaFin = FechaFin from EmpleadoYContratoSeAsocianAProyecto ec
  WHERE ec.CedulaEmpleado = @cedula and ec.NombreProyecto = @NombreProyecto;
  
  INSERT INTO BeneficioElegido VALUES 
  (@cedula, @NombreBeneficio, @NombreProyecto, @fechaInicio, @fechaFin);

END;
GO

CREATE PROCEDURE getEmployeeBenefits 
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
as 
BEGIN
  DECLARE @fechaFin DATETIME;
  DECLARE @cedula VARCHAR(15);

  SELECT @cedula = Cedula From Empleado WHERE Email = @Email;

  SELECT be.NombreBeneficio, b.CostoActual, b.Descripción from Empleado e
  JOIN BeneficioElegido be on e.Cedula = be.CedulaEmpleado
  JOIN Beneficios b on be.NombreBeneficio = b.Nombre and be.NombreProyecto = b.NombreProyecto
  JOIN Proyecto p on b.NombreProyecto = p.Nombre 
  where e.Email = @Email and p.Nombre = @Proyecto and be.fechaFin > GETDATE();
  
END;

CREATE PROCEDURE getOfferedBenefits 
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
AS 
BEGIN
  DECLARE @offeredBenefits TABLE(Nombre VARCHAR(50), CostoActual real, Descripción VARCHAR(300));
  INSERT into @offeredBenefits EXEC getEmployeeBenefits @Email = @Email, @Proyecto = @Proyecto;
  SELECT b.Nombre, b.CostoActual, b.Descripción from Beneficios b where b.NombreProyecto = @Proyecto
  and b.Nombre not in (select Nombre from @offeredBenefits) and b.Activo = True
END;
GO

CREATE PROCEDURE ObtenerDeduccionesObligatorias(
				@CedulaEmpleado VARCHAR(15),
				@Proyecto VARCHAR(50)
)
AS
BEGIN
	SELECT DO.Nombre, DO.PorcentajeEmpleado, DO.PorcentajeEmpleador
	FROM Empleado E
		JOIN EmpleadoYContratoSeAsocianAProyecto ECAP ON E.Cedula = ECAP.CedulaEmpleado
			JOIN Contrato C ON ECAP.TipoContrato = C.TipoJornada 
				JOIN ContratoSujetoADeduccionesObligatorias CSDO ON C.TipoJornada = CSDO.TipoJornada
					JOIN DeduccionesObligatorias DO ON CSDO.NombreDeduccionObligatoria = DO.Nombre
	WHERE E.Cedula = @CedulaEmpleado AND ECAP.NombreProyecto = @Proyecto
END;
CREATE PROCEDURE getEmployeeVoluntaryDeductions
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
as 
BEGIN
  DECLARE @fechaFin DATETIME;
  DECLARE @cedula VARCHAR(15);

  SELECT @cedula = Cedula From Empleado WHERE Email = @Email;

  SELECT @fechaFin = FechaFin from EmpleadoYContratoSeAsocianAProyecto ec
  WHERE ec.CedulaEmpleado = @cedula and ec.NombreProyecto = @Proyecto;

  SELECT dve.NombreDeduccionVoluntaria, dv.Costo, dv.Descripcion from Empleado e
  JOIN DeduccionVoluntariaElegida dve on e.Cedula = dve.CedulaEmpleado
  JOIN DeduccionesVoluntarias dv on dve.NombreDeduccionVoluntaria = dv.Nombre and dve.NombreProyecto = dv.NombreProyecto
  JOIN Proyecto p on dv.NombreProyecto = p.Nombre 
  where e.Email = @Email and p.Nombre = @Proyecto and @fechaFin > GETDATE();
  
END;
GO

CREATE PROCEDURE getOfferedVoluntaryDeductions 
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
AS 
BEGIN
  DECLARE @offeredVoluntaryDeductions TABLE(Nombre VARCHAR(50), Costo real, Descripcion VARCHAR(300));
  INSERT into @offeredVoluntaryDeductions EXEC getEmployeeVoluntaryDeductions @Email = @Email, @Proyecto = @Proyecto;
  SELECT dv.Nombre, dv.Costo, dv.Descripcion from DeduccionesVoluntarias dv where dv.NombreProyecto = @Proyecto
  and dv.Nombre not in (select Nombre from @offeredVoluntaryDeductions)
END;
GO

CREATE PROCEDURE desvincularBeneficioDeEmpleado (
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50),
  @NombreBeneficio VARCHAR(50)
) AS
BEGIN
  DECLARE @cedula CHAR(15);
  DECLARE @fechaInicioBeneficio DATETIME;

  SELECT @cedula = Cedula FROM Empleado WHERE Email = @Email;

  SELECT @fechaInicioBeneficio = fechaInicio FROM BeneficioElegido be
  WHERE be.CedulaEmpleado = @cedula AND be.NombreProyecto = @Proyecto AND 
  NombreBeneficio = @NombreBeneficio AND fechaFin > GETDATE()

  UPDATE BeneficioElegido SET fechaFin = GETDATE()
  WHERE CedulaEmpleado = @cedula AND NombreProyecto = @Proyecto AND 
  NombreBeneficio = @NombreBeneficio AND fechaInicio = @fechaInicioBeneficio

END;
GO
CREATE PROCEDURE ObtenerBeneficiosEmpleado(
				@Email VARCHAR(50),
				@Proyecto VARCHAR(50)
)
AS
BEGIN
	SELECT P.CedulaEmpleador, B.Nombre, P.Nombre, B.CostoActual
	FROM Usuarios U
	JOIN Empleado E ON U.Email = E.Email
		JOIN BeneficioElegido BE ON E.Cedula = BE.CedulaEmpleado
			JOIN Beneficios B ON	BE.NombreBeneficio = B.Nombre and
												BE.NombreProyecto = B.NombreProyecto		
				JOIN Proyecto P ON B.NombreProyecto = P.Nombre
	where U.Email = @Email AND P.Nombre = @Proyecto AND BE.FechaFin > GETDATE()
END;

CREATE PROCEDURE calcularTotalBeneficiosDeEmpleado (
				@Email VARCHAR(50),
				@Proyecto VARCHAR(50),
				@ConsecutivoPlanilla int,
				@ConsecutivoPago int
) 
AS
BEGIN
	DECLARE @Resultados TABLE(CedulaEmpleador VARCHAR(15),NombreBeneficio VARCHAR(50), NombreProyecto VARCHAR(50), CostoBeneficio real)
	DECLARE @CedulaEmpleador VARCHAR(15), @NombreBeneficio VARCHAR(50), @NombreProyecto VARCHAR(50), @CostoBeneficio real
	INSERT INTO @Resultados EXEC ObtenerBeneficiosEmpleado @Email = @Email, @Proyecto = @Proyecto

	DECLARE cursor__ CURSOR FOR
	SELECT R.CedulaEmpleador, R.NombreBeneficio, R.NombreProyecto, R.CostoBeneficio
	FROM @Resultados R;
	OPEN cursor__

	FETCH NEXT FROM cursor__ INTO @CedulaEmpleador , @NombreBeneficio , @NombreProyecto , @CostoBeneficio
	WHILE @@FETCH_STATUS = 0 
		BEGIN
			INSERT INTO PagoContieneBeneficios(ConsecutivoPlanilla, CedulaEmpleador, ConsecutivoPago, NombreBeneficio, NombreProyecto, MontoBeneficio)
			VALUES (@ConsecutivoPlanilla, @CedulaEmpleador, @ConsecutivoPago, @NombreBeneficio, @NombreProyecto, @CostoBeneficio)
		
			FETCH NEXT FROM cursor__ INTO @CedulaEmpleador , @NombreBeneficio , @NombreProyecto , @CostoBeneficio
		END;

	SELECT SUM(R.CostoBeneficio) CostoDeduccion
	FROM @Resultados R

END;

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

CREATE PROCEDURE eliminarBeneficio (
		@NombreBeneficio VARCHAR(50),
		@Proyecto VARCHAR(50)
) 
AS
BEGIN
	UPDATE Beneficios SET Activo = 'false' WHERE Nombre = @NombreBeneficio AND NombreProyecto = @Proyecto
	
  UPDATE BeneficioElegido SET fechaFin = GETDATE() WHERE NombreBeneficio = @NombreBeneficio 
  AND NombreProyecto = @Proyecto AND fechaFin > GETDATE()

END;
