export const VoluntaryDeductionsQueries = {
  getVoluntaryDeductions: 'Select * From DeduccionesVoluntarias Where NombreProyecto = @NombreProyecto',
  createNewvoluntaryDeduction: 'Insert into DeduccionesVoluntarias (Nombre, NombreProyecto, Costo, Descripcion) values (@Nombre, @NombreProyecto, @Costo, @Descripcion)',
  getVoluntaryDeductionsByName: 'Select Nombre from DeduccionesVoluntarias where Nombre = @Nombre and NombreProyecto = @NombreProyecto',
  editvoluntaryDeduction: 'Update DeduccionesVoluntarias set Nombre=@Nombre, Costo=@Costo, Descripcion=@Descripcion where NombreProyecto=@NombreProyecto and Nombre=@NombreAntiguo',
};