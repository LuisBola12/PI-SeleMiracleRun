CREATE FUNCTION getEmployeeBenefits(
  @Email VARCHAR(50),
  @Proyecto VARCHAR(50)
) 
returns table 
as
RETURN
SELECT eb.NombreBeneficio, b.CostoActual, b.Descripción from Empleado e
  join Usuarios u on e.Email = u.Email 
  join EmpleadoGozaBeneficios eb on e.Cedula = eb.CedulaEmpleado
  join Proyecto p on eb.NombreProyecto = p.Nombre
  join Beneficios b on b.Nombre = eb.NombreBeneficio 
  and b.NombreProyecto = eb.NombreProyecto 
  where e.Email = @Email and p.Nombre = @Proyecto;