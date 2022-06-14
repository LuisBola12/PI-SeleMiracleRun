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