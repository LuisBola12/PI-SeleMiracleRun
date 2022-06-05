
export const volDeductionsQuerys = {
  getVolDeductions: "Select * From DeduccionesVoluntarias Where NombreProyecto = @NombreProyecto",
  createNewVolDeduction: "Insert into DeduccionesVoluntarias (Nombre, NombreProyecto, Costo, Descripcion) values (@Nombre, @NombreProyecto, @Costo, @Descripcion)",
  getVolDeductionsByName: "Select Nombre from DeduccionesVoluntarias where Nombre = @Nombre and NombreProyecto = @NombreProyecto",
}