export const benefitsQueries = {
  getBenefits: 'Select * from Beneficios b where NombreProyecto = @Proyecto and CedulaEmpleador = @CedulaEmpleador and b.Activo = \'true\'',
  getBenefitsByName: 'select Nombre from Beneficios where Nombre = @Nombre and NombreProyecto = @Proyecto',
  createBenefit: 'Insert into Beneficios (Nombre, NombreProyecto, CedulaEmpleador, CostoActual, Descripción, Activo) values (@Nombre, @NombreProyecto,@CedulaEmpleador,@CostoActual, @Descripción, \'true\')',
  editBenefit: 'Update Beneficios set Nombre = @Nombre, CostoActual = @CostoActual, Descripción = @Descripción where NombreProyecto=@NombreProyecto and Nombre=@NombreAntiguo and Activo = \'true\'',
  getBenefitInfo: 'SELECT * FROM Beneficios  WHERE NombreProyecto = @projectName AND  Nombre = @benefitName',
  benefitUsedInfo:
    `
    SELECT  Empleado.Nombre as EmployeeName, Empleado.Apellido1 as EmployeeLastName
    ,BeneficioElegido.NombreProyecto as ProjectName
    ,count(BeneficioElegido.NombreBeneficio)  as employeeBenefitsQty
    , sum(Beneficios.CostoActual) as moneyAmountUsedByEmployee

    FROM Usuarios
    JOIN Empleado ON Usuarios.Email = Empleado.Email
    JOIN EmpleadoYContratoSeAsocianAProyecto e 
    ON Empleado.Cedula = e.CedulaEmpleado
    JOIN BeneficioElegido ON BeneficioElegido.CedulaEmpleado = Empleado.Cedula
    JOIN Beneficios ON Beneficios.Nombre = BeneficioElegido.NombreBeneficio

    WHERE Empleado.Email = @employeeEmail
    AND BeneficioElegido.fechaFin >  GETDATE()
    AND BeneficioElegido.NombreProyecto = @projectName
    GROUP BY Empleado.Nombre, Empleado.Apellido1,BeneficioElegido.NombreProyecto
      `,

  benefitsLimits:
    `
    SELECT Proyecto.Nombre as ProjectName
    ,CantidadMaximaBeneficiosEmpleado as maxBenefitsQtyAllowed
    , MontoMaximoBeneficiosEmpleado as maxMoneyAmountAllowed 
    FROM Proyecto
    WHERE Proyecto.Nombre = @ProjectName 
  `
};