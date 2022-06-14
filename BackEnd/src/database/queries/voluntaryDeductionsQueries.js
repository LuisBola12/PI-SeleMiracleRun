export const voluntaryDeductionsQueries = {
  getVoluntaryDeductions: 'Select * From DeduccionesVoluntarias Where NombreProyecto = @NombreProyecto',
  createNewVoluntaryDeduction: 'Insert into DeduccionesVoluntarias (Nombre, NombreProyecto, Costo, Descripcion) values (@Nombre, @NombreProyecto, @Costo, @Descripcion)',
  getVoluntaryDeductionsByName: 'Select Nombre from DeduccionesVoluntarias where Nombre = @Nombre and NombreProyecto = @NombreProyecto',
  editVoluntaryDeduction: 'Update DeduccionesVoluntarias set Nombre=@Nombre, Costo=@Costo, Descripcion=@Descripcion where NombreProyecto=@NombreProyecto and Nombre=@NombreAntiguo',
  getEmployeeVoluntaryDeductionsByEmail: `SELECT edv.NombreDeduccion, dv.Costo, dv.Descripcion from Empleado e
  join Usuarios u on e.Email = u.Email 
  join EmpleadoAplicaDeduccionesVoluntarias edv on e.Cedula = edv.CedulaEmpleado
  join Proyecto p on edv.NombreProyecto = p.Nombre
  join DeduccionesVoluntarias dv on dv.Nombre = edv.NombreDeduccion 
  and dv.NombreProyecto = edv.NombreProyecto 
  where e.Email = @Email and p.Nombre = @Proyecto`,
};