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

Create Procedure DeleteAnEmployeeFromAProject @Cedula varchar(15), @Proyecto varchar(50)
AS
Begin
    Declare @NumeroDeBeneficios int;
	Declare @FechaFinContrato DateTime;
	Select @FechaFinContrato = ECP.FechaFin from EmpleadoYContratoSeAsocianAProyecto ECP where ECP.CedulaEmpleado = @Cedula and ECP.NombreProyecto = @Proyecto
    Select @NumeroDeBeneficios = Count(*) from BeneficioElegido
    where CedulaEmpleado = @Cedula and NombreProyecto = @Proyecto and FechaFin > GETDATE();
    If(@NumeroDeBeneficios > 0)
    Begin
        UPDATE BeneficioElegido set FechaFin = GETDATE()  where CedulaEmpleado =	@Cedula and NombreProyecto = @Proyecto;
    End
    Else
        Begin
            Print 'This Employee doesnt have benefits'
        End

    Declare @NumeroDeDeduccionesVoluntarias int;
    Select @NumeroDeDeduccionesVoluntarias = Count(*) from DeduccionVoluntariaElegida 
    where CedulaEmpleado = @Cedula and NombreProyecto = @Proyecto and FechaFin > GETDATE();
    If(@NumeroDeDeduccionesVoluntarias > 0)
    Begin
        UPDATE DeduccionVoluntariaElegida set FechaFin = GETDATE()  where CedulaEmpleado =	@Cedula and NombreProyecto = @Proyecto;
    End
    Else
        Begin
            Print 'This Employee doesnt have Voluntary Deductions'
        End
    UPDATE EmpleadoYContratoSeAsocianAProyecto set FechaFin = GETDATE()  where CedulaEmpleado =	@Cedula and NombreProyecto = @Proyecto;
End
Go;