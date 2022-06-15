export const obligatoryDeductionsQueries = {
  insertObligatoryDeductions: `INSERT INTO PagoAplicaDeduccionesObligatorias(ConsecutivoPlanilla, CedulaEmpleador, ConsecutivoPago, NombreDeduccionObligatoria, NombreProyecto, MontoEmpleador, MontoEmpleado)
  VALUES (@ConsecutivoPlanilla, @CedulaEmpleador, @ConsecutivoPago, @NombreDeduccionObligatoria, @NombreProyecto, @MontoEmpleador, @MontoEmpleado)`
};