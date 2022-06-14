export const benefitsQueries = {
  getBenefits: 'Select * from Beneficios where NombreProyecto = @Proyecto',
  getBenefitsByName: 'select Nombre from Beneficios where Nombre = @Nombre and NombreProyecto = @Proyecto',
  createBenefit: 'Insert into Beneficios (Nombre, NombreProyecto, CostoActual, Descripción) values (@Nombre, @NombreProyecto ,@CostoActual, @Descripción)',
  editBenefit: 'Update Beneficios set Nombre=@Nombre, CostoActual=@CostoActual, Descripción=@Descripción where NombreProyecto=@NombreProyecto and Nombre=@NombreAntiguo',
  getEmployeeBenefitsByEmail: `SELECT * from dbo.getEmployeeBenefits(@Email, @Proyecto)`,
  getOfferedBenefits: `SELECT b.Nombre, b.CostoActual, b.Descripción from Beneficios b where b.NombreProyecto = @Proyecto
  and b.Nombre not in (SELECT NombreBeneficio from dbo.getEmployeeBenefits(@Email, @Proyecto))`,
};