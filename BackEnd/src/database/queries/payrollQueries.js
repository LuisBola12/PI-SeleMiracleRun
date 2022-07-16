export const payrollQueries = {
  getPeriodos: 'Select * from Periodo',
  getPeriodForAEspecificProject: 'Select TipoPeriodo from Proyecto where Nombre = @Nombre',
  getPayrrollConsecutive: 'Select Consectivo from Planilla where NombreProyecto = @NombreProyecto and FechaIncio = @FechaInicio',
  insertAPayslip: 'INSERT INTO PAGO VALUES(@ConsecutivoPlanilla,@CedulaEmpleador,@CedulaEmpleado,@SalarioBruto,0,0,0,0,0)',
  getTotalCostOfBenefits: `Select MontoTotalBeneficios from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  getItemizedVolDeductionsOfPayment:`select pcdv.NombreDeduccion, pcdv.MontoDeduccion, p.CedulaEmpleado , p.CedulaEmpleador from Pago p JOIN Empleado e 
  on p.CedulaEmpleado = e.Cedula JOIN PagoPoseeDeduccionesVoluntarias pcdv 
  on p.ConsecutivoPago = pcdv.ConsecutivoPago where pcdv.ConsecutivoPago = @consecutivoPago`,
  getTotalCostOfVolDeductions: `Select MontoTotalDeduccionesVoluntarias from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  getItemizedOblDeductionsOfPayment:`select pcdo.NombreDeduccionObligatoria, pcdo.MontoEmpleado, p.CedulaEmpleado , p.CedulaEmpleador from Pago p JOIN Empleado e 
  on p.CedulaEmpleado = e.Cedula JOIN PagoAplicaDeduccionesObligatorias pcdo 
  on p.ConsecutivoPago = pcdo.ConsecutivoPago where pcdo.ConsecutivoPago = @consecutivoPago and MontoEmpleado > 0`,
  getTotalCostOfOblDeductions: `Select MontoTotalDeduccionesObligatoriasEmpleado from pago where 
  CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  insertNetSalaryOfAPayslip: `Update Pago set SalarioNeto = @SalarioNetoEmpleado where CedulaEmpleado = @Cedula 
  and ConsecutivoPlanilla = @ConsecPlanilla and ConsecutivoPago = @ConsecPago`,
  getPaysilipOfAnEmployee: 'select ConsecutivoPago from pago where CedulaEmpleado = @Cedula and ConsecutivoPlanilla = @ConsecPLanilla',
  getPayrrollsOfAproject: 'Select Consectivo,FechaIncio,FechaFin From Planilla Where NombreProyecto = @Proyecto',
  getTotalSalaryCost: `	select ECP.TipoContrato, SUM(pa.SalarioNeto) as salario 
	from EmpleadoYContratoSeAsocianAProyecto ECP
	join Empleado EM on EM.Cedula = ECP.CedulaEmpleado
	join Pago PA on PA.CedulaEmpleado = ECP.CedulaEmpleado
	join Planilla PL on PL.Consectivo = PA.ConsecutivoPlanilla
	where  PL.Consectivo = @ConsecutivoPlanilla and ECP.NombreProyecto = @NombreProyecto
	group by ECP.TipoContrato`,
  getTotalCostBenefitsEmployer: `select PCB.NombreBeneficio, sum(PCB.MontoBeneficio) AS Monto
  from Pago p 
  JOIN Empleado e on p.CedulaEmpleado = e.Cedula 
  JOIN PagoContieneBeneficios PCB on p.ConsecutivoPago = PCB.ConsecutivoPago 
  where PCB.ConsecutivoPlanilla = @ConsecutivoPlanilla
  group by PCB.NombreBeneficio`,
  getTotalCostObligatoryDeductionsEmployer:`select PCDO.NombreDeduccionObligatoria, sum(PCDO.MontoEmpleador) AS Monto
  from Pago p 
  JOIN Empleado e on p.CedulaEmpleado = e.Cedula 
  JOIN PagoAplicaDeduccionesObligatorias PCDO on p.ConsecutivoPago = PCDO.ConsecutivoPago 
  where PCDO.ConsecutivoPlanilla = @ConsecutivoPlanilla AND PCDO.NombreDeduccionObligatoria != 'Impuesto sobre la renta'
  group by PCDO.NombreDeduccionObligatoria`,
  getPayrollTotalCosts: `select pa.ConsecutivoPlanilla, SUM(SalarioBruto) as SalariosBrutos,
  SUM(MontoTotalDeduccionesObligatoriasEmpleado) AS DeduccionesObligatoriasEmpleados,
  SUM(MontoTotalDeduccionesObligatoriasEmpleador) AS DeduccionesObligatoriasEmpleador,
  SUM(MontoTotalBeneficios) as Beneficios,
  SUM(MontoTotalDeduccionesVoluntarias) as DeduccionesVoluntarias
  from Pago pa Join Planilla pl on pa.ConsecutivoPlanilla = pl.Consectivo
  where pl.CedulaEmpleador = '12345678'
  group by pa.ConsecutivoPlanilla`
};