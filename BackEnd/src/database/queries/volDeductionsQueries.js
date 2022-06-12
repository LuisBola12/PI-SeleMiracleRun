export const voluntaryDeductionsQueries = {
  getvoluntaryDeductions: 'Select * From DeduccionesVoluntarias Where NombreProyecto = @NombreProyecto',
  createNewvoluntaryDeduction: 'Insert into DeduccionesVoluntarias (Nombre, NombreProyecto, Costo, Descripcion) values (@Nombre, @NombreProyecto, @Costo, @Descripcion)',
  getvoluntaryDeductionsByName: 'Select Nombre from DeduccionesVoluntarias where Nombre = @Nombre and NombreProyecto = @NombreProyecto',
  editvoluntaryDeduction: 'Update DeduccionesVoluntarias set Nombre=@Nombre, Costo=@Costo, Descripcion=@Descripcion where NombreProyecto=@NombreProyecto and Nombre=@NombreAntiguo',
};