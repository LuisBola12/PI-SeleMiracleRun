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

  SELECT @fechaFin = FechaFin from EmpleadoYContratoSeAsocianAProyecto ec
  WHERE ec.CedulaEmpleado = @cedula and ec.NombreProyecto = @Proyecto;

  SELECT be.NombreBeneficio, b.CostoActual, b.Descripción from Empleado e
  JOIN BeneficioElegido be on e.Cedula = be.CedulaEmpleado
  JOIN Beneficios b on be.NombreBeneficio = b.Nombre and be.NombreProyecto = b.NombreProyecto
  JOIN Proyecto p on b.NombreProyecto = p.Nombre 
  where e.Email = @Email and p.Nombre = @Proyecto and @fechaFin > GETDATE();
  
END;
GO

CREATE PROCEDURE getOfferedBenefits 
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
AS 
BEGIN
  DECLARE @offeredBenefits TABLE(Nombre VARCHAR(50), CostoActual real, Descripción VARCHAR(300));
  INSERT into @offeredBenefits EXEC getEmployeeBenefits @Email = @Email, @Proyecto = @Proyecto;
  SELECT b.Nombre, b.CostoActual, b.Descripción from Beneficios b where b.NombreProyecto = @Proyecto
  and b.Nombre not in (select Nombre from @offeredBenefits)
END;
GO
