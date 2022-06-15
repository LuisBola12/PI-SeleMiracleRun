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

    CREATE PROCEDURE ingresarHorasEmpleado (
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