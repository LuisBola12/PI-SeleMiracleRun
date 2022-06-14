CREATE FUNCTION getEmployeeBenefits(
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
) 
returns table 
as
RETURN
SELECT be.NombreBeneficio, b.CostoActual, b.Descripción from Empleado e
  JOIN Usuarios u on e.Email = u.Email 
  JOIN BeneficioElegido be on e.Cedula = be.CedulaEmpleado
  JOIN Beneficios b on be.NombreBeneficio = b.Nombre and be.NombreProyecto = b.NombreProyecto
  JOIN Proyecto p on b.NombreProyecto = p.Nombre 
  where e.Email = @Email and p.Nombre = @Proyecto;
GO