export const benefitsQueries = {
  getBenefits: `Select * from Beneficios b where NombreProyecto = @Proyecto and b.Activo = 'true'`,
  getBenefitsByName: 'select Nombre from Beneficios where Nombre = @Nombre and NombreProyecto = @Proyecto',
  createBenefit: `Insert into Beneficios (Nombre, NombreProyecto, CostoActual, Descripción, Activo) values (@Nombre, @NombreProyecto ,@CostoActual, @Descripción, 'true')`,
  editBenefit: `Update Beneficios set Nombre = @Nombre, CostoActual = @CostoActual, Descripción = @Descripción where NombreProyecto=@NombreProyecto and Nombre=@NombreAntiguo and Activo = 'true'`,
};

