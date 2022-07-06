export const voluntaryDeductionsQueries = {
  getVoluntaryDeductions: 'Select * From DeduccionesVoluntarias dv Where NombreProyecto = @NombreProyecto and CedulaEmpleador = @CedulaEmpleador and dv.Activo = \'true\'',
  createNewVoluntaryDeduction: 'Insert into DeduccionesVoluntarias (Nombre, NombreProyecto, CedulaEmpleador Costo, Descripcion, Activo) values (@Nombre, @NombreProyecto, @CedulaEmpleador, @Costo, @Descripcion, \'true\')',
  getVoluntaryDeductionsByName: 'Select Nombre from DeduccionesVoluntarias where Nombre = @Nombre and NombreProyecto = @NombreProyecto and CedulaEmpleador = @CedulaEmpleador',
  editVoluntaryDeduction: 'Update DeduccionesVoluntarias set Nombre=@Nombre, Costo=@Costo, Descripcion=@Descripcion where NombreProyecto=@NombreProyecto and CedulaEmpleador = @CedulaEmpleador and Nombre=@NombreAntiguo and Activo = \'true\'',
};