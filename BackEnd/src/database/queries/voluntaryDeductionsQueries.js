export const voluntaryDeductionsQueries = {
  getVoluntaryDeductions: 'Select * From DeduccionesVoluntarias dv Where NombreProyecto = @NombreProyecto and dv.Activo = \'true\'',
  createNewVoluntaryDeduction: 'Insert into DeduccionesVoluntarias (Nombre, NombreProyecto, Costo, Descripcion, Activo) values (@Nombre, @NombreProyecto, @Costo, @Descripcion, \'true\')',
  getVoluntaryDeductionsByName: 'Select Nombre from DeduccionesVoluntarias where Nombre = @Nombre and NombreProyecto = @NombreProyecto',
  editVoluntaryDeduction: 'Update DeduccionesVoluntarias set Nombre=@Nombre, Costo=@Costo, Descripcion=@Descripcion where NombreProyecto=@NombreProyecto and Nombre=@NombreAntiguo and Activo = \'true\'',
};