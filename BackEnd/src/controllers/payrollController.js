import { getConnection, sql } from '../database';
import { obligatoryDeductionsQueries } from '../database/queries/obligatoryDeductionsQueries';

const calculateAmount = ( Salary, Percentage ) => {
  const salaryI = parseFloat( Salary );
  const percentageI = parseFloat( Percentage );
  if ( salaryI === null || percentageI === null ||
    salaryI === undefined || percentageI === undefined ||
    salaryI <= 0 || percentageI <= 0 ){
    return 0;
  } else {
    return ( salaryI * ( percentageI / 100 ) );
  }
}; 
const clasifyCalculateSalary = ( TotalSalary, TipoJornada ) => {
  if ( TotalSalary <= ( 863000 / TipoJornada ) ){
    return 0;
  } else {
    if ( TotalSalary > ( 863000 / TipoJornada ) && TotalSalary < ( 1267000 / TipoJornada ) ){
      return ( TotalSalary * 0.10 ); 
    } else {
      if ( TotalSalary >= ( 1267000 / TipoJornada ) && TotalSalary < ( 2223000 / TipoJornada ) ){
        return ( TotalSalary * 0.15 ); 
      } else {
        if ( TotalSalary >= ( 2223000 / TipoJornada ) && TotalSalary < ( 4445000 / TipoJornada ) ){
          return ( TotalSalary * 0.20 ); 
        } else {
          if ( TotalSalary >= ( 4445000 / TipoJornada ) ){
            return ( TotalSalary * 0.25 ); 
          }
        }
      }
    }
  }
};

const calculateAmountRentTaxes = ( Salary, TipoJornada ) => {
  const salaryI = parseFloat( Salary );
  if ( salaryI === null || salaryI === undefined || salaryI <= 0 ){
    return 0;
  } else {
    if ( TipoJornada === 'Mensual' ){
      return clasifyCalculateSalary( salaryI, 1 );
    } else {
      if ( TipoJornada === 'Quincenal' ){
        return clasifyCalculateSalary( salaryI, 2 );
      } else {
        if ( TipoJornada === 'Semanal' ){
          return clasifyCalculateSalary( salaryI, 4 );
        }
      }
    }
  }
};

const getObligatoryDeductions = async ( CedulaEmpleado, NombreProyecto ) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'CedulaEmpleado', CedulaEmpleado )
      .input( 'Proyecto', NombreProyecto )
      .execute( 'ObtenerDeduccionesObligatorias' );
    console.log( result.recordset );
    return result.recordset;
  } catch ( e ) {
    console.log( e );
    return undefined;
  }
};

const insertObligatoryDeductionsPayroll = async ( InfoDeduccionObligatoria ) => {
  const   {   
    ConsecutivoPlanilla, 
    CedulaEmpleador, 
    ConsecutivoPago,
    NombreDeduccionObligatoria,
    NombreProyecto,
    MontoEmpleador,
    MontoEmpleado } = InfoDeduccionObligatoria;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'ConsecutivoPlanilla', ConsecutivoPlanilla )
      .input( 'CedulaEmpleador', CedulaEmpleador )
      .input( 'ConsecutivoPago', ConsecutivoPago )
      .input( 'NombreDeduccionObligatoria', NombreDeduccionObligatoria )
      .input( 'NombreProyecto', NombreProyecto )
      .input( 'MontoEmpleador', sql.Float, MontoEmpleador )
      .input( 'MontoEmpleado', sql.Float, MontoEmpleado )
      .query( obligatoryDeductionsQueries.insertObligatoryDeductions );
    console.log( 'Tupla insertada' );
  } catch ( e ) {
    console.log( e );
    return undefined;
  }
};

export const ObligatoryDeductionsPayRoll = async ( req, res ) => {
  const   { 
    CedulaEmpleado,  
    CedulaEmpleador, 
    NombreProyecto, 
    SalarioBruto,
    TipoJornada,
    ConsecutivoPlanilla,
    ConsecutivoPago } = req.body;

  const obligatoryDeductions = await getObligatoryDeductions( CedulaEmpleado, NombreProyecto );
  let montoEmpleado = 0.0;
  let montoEmpleador = 0.0;
  let nombreDeduccionObligatoria = '';

  obligatoryDeductions.forEach( element => {
    if ( element.Nombre === 'ImpuestoSobreLaRenta' ){
      TipoJornada,
      montoEmpleado = calculateAmountRentTaxes( SalarioBruto, TipoJornada );
      montoEmpleador = 0;
    } else {
      montoEmpleado = calculateAmount( SalarioBruto, element.PorcentajeEmpleado );
      montoEmpleador = calculateAmount( SalarioBruto, element.PorcentajeEmpleador ); 
    }
    nombreDeduccionObligatoria = element.Nombre;

    const data = {
      'ConsecutivoPlanilla': ConsecutivoPlanilla, 
      'CedulaEmpleador': CedulaEmpleador, 
      'ConsecutivoPago': ConsecutivoPago,
      'NombreDeduccionObligatoria': nombreDeduccionObligatoria,
      'NombreProyecto': NombreProyecto,
      'MontoEmpleador': montoEmpleador,
      'MontoEmpleado': montoEmpleado
    };

    
    insertObligatoryDeductionsPayroll( data );
  } );
};