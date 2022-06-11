import { getConnection, sql } from '../database';
import { projectQueries } from '../database/queries/projectQueries';

export const getProjectsByEmail = async ( req, res ) => {
  const { Email } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .query( projectQueries.getProjectsByEmail );
    res.json( result.recordset );
  } catch ( e ) {
    console.log( e );
  }
};

export const createProject = async ( req, res ) => {
  const { Nombre, Periodo, Email } = req.body;
  if ( Nombre == null || Periodo == null || Email == null ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Nombre', Nombre )
      .input( 'Periodo', sql.VarChar, Periodo )
      .input( 'Email', sql.VarChar, Email )
      .query( projectQueries.createProject );
    console.log( result );
    res.json( { Nombre, Periodo, Email } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};



const extractDate = ( date ) => {
  let extractedDate = date;
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  extractedDate = new Date( year, month, day  , 0,0,0,0 );
  return extractedDate;
};


export const getEmployeesWorkingData = async ( projectName ) => {
  try {
    let projectWorkedHoursInfo;
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'projectName', projectName )
      .query( projectQueries.getEmployeeWorkingInformation );
    projectWorkedHoursInfo = result.recordset;
    return projectWorkedHoursInfo;
  } catch ( e ) {
    console.log( e );
  }
};
export const getHourlyEmployeeWorkedHours = async ( employeeID, projectName ) => {
  try {
    console.log( employeeID );
    let employeeWorkedHours;
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'employeeID', employeeID )
      .input( 'projectName', projectName )
      .query( projectQueries.getHourlyEmployeeWorkedHours );
    employeeWorkedHours = result.recordset;
    return employeeWorkedHours;
  } catch ( e ) {
    console.log( e );
  }
};// 

//TODO:REVISANDO
export const getHourlyEmployeeRegisteredWork = async ( employeeID, projectName, paymentPeriod ) => {

  const preProcessedWorkedHours = await getHourlyEmployeeWorkedHours( employeeID, projectName );
  const today = extractDate( new Date() );
  //TODO:Hasta aca todo bien
  let dayOneOfPayment = extractDate( new Date() );
  let entrysInsidePeriod = [];
  preProcessedWorkedHours.forEach( hoursEntry => {
    const { Fecha:workDate  } = hoursEntry;

    switch ( paymentPeriod ) {
    case 'Quincenal':
      dayOneOfPayment.setDate( today.getDate() - 15 );
      break;
    case 'Semanal':
      dayOneOfPayment.setDate( today.getDate() - 7 );
      break;
    case 'Mensual':
      dayOneOfPayment.setDate( today.getDate() - 30 );
      break;
    default:
      return Error;
    }
    
    if ( isInDateRange( dayOneOfPayment, today, workDate )   ){
      entrysInsidePeriod.push( hoursEntry );
    }
  } );

  return entrysInsidePeriod;
};

const calculateHourlyEmployeeWorkedHours = async ( paymentPeriod, employeeID, projectName ) => {
  const entrysInsidePeriod = await getHourlyEmployeeRegisteredWork( employeeID, projectName, paymentPeriod );
  let hoursToPay = 0;

  entrysInsidePeriod.forEach( hoursEntry => {
    const { Cantidad:hoursWorked } = hoursEntry;
    hoursToPay = hoursToPay + hoursWorked;
  } );

  return  hoursToPay;


};


const calculateFullTimeWorkedHours = (  paymentPeriod ) => {
  const hoursWorkWeek = 48;
  let hoursWorked = null;
  switch ( paymentPeriod ) {
  case 'Quincenal':
    hoursWorked = hoursWorkWeek * 2;
    break;
  case 'Semanal':
    hoursWorked = hoursWorkWeek ;
    break;
  case 'Mensual':
    hoursWorked = hoursWorkWeek * 4 ;
    break;
  default:
    hoursWorked = null;
    break;
  }  
  return hoursWorked;
};

const isInDateRange = ( initialDate, finalDate, dateToVerify ) =>{
  initialDate = extractDate( initialDate );
  finalDate = extractDate( finalDate );
  dateToVerify = extractDate( dateToVerify );

  return ( initialDate <= dateToVerify <= finalDate );
};

const hasWorkedLongEnough = ( contractStartDate, paymentPeriod ) =>{
  contractStartDate = extractDate( contractStartDate );
  const today = extractDate( new Date() );
  let dayOneOfPayment = today;

  switch ( paymentPeriod ) {
  case 'Quincenal':
    dayOneOfPayment.setDate( today.getDate() - 15 );
    break;
  case 'Semanal':
    dayOneOfPayment.setDate( today.getDate() - 7 );
    break;
  case 'Mensual':
    dayOneOfPayment.setDate( today.getDate() - 30 );
    break;
  default:
    return Error;
  }  
  if ( contractStartDate  <= dayOneOfPayment ) {
    return true;
  }
  return false;
};



// input NombreProyecto
// output objeto {cedula, proyecto y salario bruto, horasTrabajadas}

const isAvaliableForPayment = ( contractStartDate, contractEndDate, paymentPeriod ) => {
  const today = new Date();
  const isActive = isInDateRange( contractStartDate, contractEndDate, today );


  const hasMiniumDaysWorking = hasWorkedLongEnough( contractStartDate, paymentPeriod );
  if ( isActive &&  hasMiniumDaysWorking ){
    return true;
  }
  else { 
    return false;
  }

};

const calculatePaidServicesGrossSalary = ( endOfContractDate, costOfService ) => {
  const today = extractDate( new Date() );
  endOfContractDate = extractDate( endOfContractDate );
  let grossSalary = null;

  if ( today.getTime() === endOfContractDate.getTime() ){
    grossSalary = costOfService;
  }
  return grossSalary;
};



export const calculateGrossSalaryForAllEmployes =  async ( projectName ) => {
  console.log( 'Entra' );
  let projectWorkedHoursInfo;
  let grossSalary;
  let hoursWorked;
  let grossSalaries = [];

  try {
    projectWorkedHoursInfo = await getEmployeesWorkingData( projectName );
    projectWorkedHoursInfo.forEach  (   async  employee => {
      //TODO:Agregar la cedula del empleado para mandarla en la respuesta
      const {  CedulaEmpleado:employeeID, TipoContrato: contractType, TipoPeriodo: paymentPeriod } = employee;
      const { ValorDeServicio: costOfService, FechaInicio:contractStartDate,  SalarioPorHoras:salaryPerHour, FechaFin:contractEndDate } = employee;
      

      if ( isAvaliableForPayment( contractStartDate, contractEndDate, paymentPeriod ) ){
        switch ( contractType ) {
        case 'Tiempo Completo':
          hoursWorked = calculateFullTimeWorkedHours( paymentPeriod );
          grossSalary = salaryPerHour * hoursWorked;
          break;
        case 'Servicios Profesionales': {
          const endOfContractDate = extractDate( contractEndDate );
          hoursWorked = null;
          grossSalary = calculatePaidServicesGrossSalary( endOfContractDate, costOfService );
        }
          break;
        
        case 'Por horas': {
          // hoursWorked =   await calculateHourlyEmployeeWorkedHours( paymentPeriod, employeeID, projectName ); 
          grossSalary = salaryPerHour * hoursWorked;
          break;
       
        }
        default:
          break;
        }
        const obj = { employeeID: employeeID, grossSalary: grossSalary, contractType:contractType, paymentPeriod:paymentPeriod,
          salaryPerHour: salaryPerHour, contractStartDate:contractStartDate, contractEndDate: contractEndDate };

        grossSalaries.push( obj );
        console.log( 'insertando' );
        // console.log( obj );
        
      }} );
    
  } catch ( e ) {
    console.log( e );
    return  e;
  }
  // console.log( grossSalaries );
  return  grossSalaries;
}; 