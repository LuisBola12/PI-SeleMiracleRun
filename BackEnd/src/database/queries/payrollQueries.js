export const payrollQueries = {
  getPeriodos: 'Select * from Periodo',
  getPeriodForAEspecificProject: 'Select TipoPeriodo from Proyecto where Nombre = @Nombre',
  getPayrrollConsecutive: 'Select Consectivo from Planilla where NombreProyecto = @NombreProyecto and FechaIncio = @FechaInicio',
  insertAPayslip: 'INSERT INTO PAGO VALUES(@ConsecutivoPlanilla,@CedulaEmpleador,@CedulaEmpleado,@SalarioBruto,0,0,0,0,0)',
  getTotalCostOfBenefits: `Select MontoTotalBeneficios from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  getTotalCostOfVolDeductions: `Select MontoTotalDeduccionesVoluntarias from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  getTotalCostOfOblDeductions: `Select MontoTotalDeduccionesObligatoriasEmpleado from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  insertNetSalaryOfAPayslip: `Update Pago set SalarioNeto = @SalarioNetoEmpleado where CedulaEmpleado = @Cedula 
  and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  getPaysilipOfAnEmployee: 'select ConsecutivoPago from pago where CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPLanilla',
  getPayrrollsOfAproject: 'Select Consectivo,FechaIncio,FechaFin From Planilla Where NombreProyecto = @Proyecto',
  getPaymentsMadeByEmployeer:
    `SELECT * 
     FROM [SeleMiracleRun].[dbo].[Pago]
     JOIN [Empleado] ON Empleado.Cedula = Pago.CedulaEmpleador
     WHERE CedulaEmpleador = @employerID`
};
