

export const queries = {
  // Project queries
  getProjectsByEmail:
    `SELECT Proyecto.[Nombre] FROM Empleador 
    JOIN Proyecto ON Proyecto.CedulaEmpleador = Empleador.Cedula 
    WHERE Empleador.Email =@Email`,

  createProject:
    `DECLARE @cedulaObtenida VARCHAR(9);
    SELECT  @cedulaObtenida = Empleador.Cedula FROM Empleador
    JOIN Usuarios on Empleador.Email = Usuarios.Email
    WHERE Empleador.Email =  @Email
    INSERT into Proyecto(Nombre,CedulaEmpleador,TipoPeriodo) values (@Nombre,@cedulaObtenida, @Periodo)`,

  // getEmployeesInfo:
  devolpment: {
    // TODO: Ver si en este metodo me tengo que traer un solo empleado o todos los empleados asociados al proyecto
    developingGrossSalaryCalculation(){
      //TODO: Todo lo de la base de datos seria bueno meterlo en un solo objeto
      //TODO: Y de ahi lo voy extrayendo cuando lo necesite
      const tipoDeContrato ='Tiempo Completo'; // Esto es desde la base de datos Tabla:EmpleadoYContratoSeAsocianAProyecto 
      const paymentPeriod = 'Semanal';  // Esto tambien es de la base datos Tabla: Proyecto
      let paymentAmount; 
      let horasAPagar;
      let horasJornadaDiurna = 48;
      let SalarioPorHora = 3500.00; //getSalario por horas desde la tabla 'EmpleadoYContratoSeAsocianAProyecto'

      switch (tipoDeContrato) {
      case 'Tiempo Completo':{
        switch (paymentPeriod) {
        case 'Semanal':{
          horasAPagar = horasJornadaDiurna * 1;
          paymentAmount =  SalarioPorHora * horasAPagar;
        }
          break;

        case 'Mensual':{
          horasAPagar = horasJornadaDiurna * 30;
          paymentAmount =  SalarioPorHora * horasAPagar;
        }
          break;
        }
      }
        break;
      case 'Empleado Por Horas':{
        //TODO  Sacar cuantas horas a trabjado
        // TODO: Traer desde empleado registra horas  

        switch (paymentPeriod) {
        case 'Semanal':{
          horasAPagar = 4; // TODO: Esto tambien se extrae desde la base de datos EmpleadoYContratoSeAsocianAProyecto 
          paymentAmount =  SalarioPorHora * horasAPagar;
        }
          break;

        case 'Mensual':{
          horasAPagar = 4; // TODO: Esto tambien se extrae desde la base de datos EmpleadoYContratoSeAsocianAProyecto 
          paymentAmount =  SalarioPorHora * horasAPagar;
        }
          break;
        }
        break;
      }
      case 'Servicios Profesionales':{
        //TODO: Saber si el empleado por servicios profesionales se paga hasta que termine el contrato
        paymentAmount = 1000;  
        break;

      }

      }
      console.log(paymentAmount);
    }
  }
};