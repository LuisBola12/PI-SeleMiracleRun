export const payrollQueries = {
  getPeriodos: 'Select * from Periodo',
  getPeriodForAEspecificProject: 'Select TipoPeriodo from Proyecto where Nombre = @Nombre',
  getPayrrollConsecutive: 'Select Consectivo from Planilla where NombreProyecto = @NombreProyecto and FechaIncio = @FechaInicio',
  insertAPayslip: 'INSERT INTO PAGO VALUES(@ConsecutivoPlanilla,@CedulaEmpleador,@CedulaEmpleado,@SalarioBruto,0,0,0,0,0)',
  getTotalCostOfBenefits: `Select MontoTotalBeneficios from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  getItemizedVolDeductionsOfPayment:`select pcdv.NombreDeduccion, pcdv.MontoDeduccion, p.CedulaEmpleado , p.CedulaEmpleador from Pago p JOIN Empleado e 
  on p.CedulaEmpleado = e.Cedula JOIN PagoPoseeDeduccionesVoluntarias pcdv 
  on p.ConsecutivoPago = pcdv.ConsecutivoPago where pcdv.ConsecutivoPago = @ConsecPago`,
  getTotalCostOfVolDeductions: `Select MontoTotalDeduccionesVoluntarias from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  getItemizedOblDeductionsOfPayment:`select pcdo.NombreDeduccionObligatoria, pcdo.MontoEmpleado, p.CedulaEmpleado , p.CedulaEmpleador from Pago p JOIN Empleado e 
  on p.CedulaEmpleado = e.Cedula JOIN PagoAplicaDeduccionesObligatorias pcdo 
  on p.ConsecutivoPago = pcdo.ConsecutivoPago where pcdo.ConsecutivoPago = @ConsecPago and MontoEmpleado > 0`,
  getTotalCostOfOblDeductions: `Select MontoTotalDeduccionesObligatoriasEmpleado from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  insertNetSalaryOfAPayslip: `Update Pago set SalarioNeto = @SalarioNetoEmpleado where CedulaEmpleado = @Cedula 
  and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  getPaysilipOfAnEmployee: 'select ConsecutivoPago from pago where CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPLanilla',
  getPayrrollsOfAproject: 'Select Consectivo,FechaIncio,FechaFin From Planilla Where NombreProyecto = @Proyecto',
};