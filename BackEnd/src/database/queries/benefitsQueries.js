export const benefitsQueries = {
  getBenefits: 'Select * from Beneficios where NombreProyecto = @Proyecto',
  getBenefitsByName: 'select Nombre from Beneficios where Nombre = @Nombre and NombreProyecto = @Proyecto',
  createBenefit: 'Insert into Beneficios (Nombre, NombreProyecto, CostoActual, Descripción) values (@Nombre, @NombreProyecto ,@CostoActual, @Descripción)',
  editBenefit: 'Update Beneficios set Nombre=@Nombre, CostoActual=@CostoActual, Descripción=@Descripción where NombreProyecto=@NombreProyecto and Nombre=@NombreAntiguo',
  getEmployeeBenefitsByEmail: `SELECT eb.NombreBeneficio, b.CostoActual, b.Descripción from Empleado e
  join Usuarios u on e.Email = u.Email 
  join EmpleadoGozaBeneficios eb on e.Cedula = eb.CedulaEmpleado
  join Proyecto p on eb.NombreProyecto = p.Nombre
  join Beneficios b on b.Nombre = eb.NombreBeneficio 
  and b.NombreProyecto = eb.NombreProyecto 
  where e.Email = @Email and p.Nombre = @Proyecto`,
  getCostTotalBenefits: 'SELECT DBO.calcularTotalBeneficiosDeEmpleado (@Email, @Proyecto) As CostoTotal',
  insertTotalBenefitsInPayRoll: `INSERT INTO PagoContieneBeneficios(ConsecutivoPlanilla, CedulaEmpleador, ConsecutivoPago, NombreBeneficio, NombreProyecto, MontoBeneficio)
                            VALUES (@ConsecutivoPlanilla, @CedulaEmpleador, @ConsecutivoPago, @NombreBeneficio, @NombreProyecto, @MontoDeduccion)`
};