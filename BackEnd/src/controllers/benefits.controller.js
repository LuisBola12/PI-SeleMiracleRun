import { getConnection, sql } from '../database';
import { benefitsQueries } from '../database/queries/benefitsQueries';
import { projectQueries } from '../database/queries/projectQueries';

export const getBenefits = async ( req, res ) => {
  const { Proyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Proyecto', Proyecto )
      .query( benefitsQueries.getBenefits );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const getBenefitsByName = async ( req, res ) => {
  const { Proyecto, Nombre } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Nombre', Nombre )
      .input( 'Proyecto', Proyecto )
      .query( benefitsQueries.getBenefitsByName );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const getEmployeeBenefitsByEmail = async ( req, res ) => {
  const { Proyecto, Email } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .input( 'Proyecto', Proyecto )
      .execute( 'getEmployeeBenefits' );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};


export const getOfferedBenefits = async ( req, res ) => {
  const { Proyecto, Email } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .input( 'Proyecto', Proyecto )
      .execute( 'getOfferedBenefits' );
    res.json( result.recordset );
    console.log( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};


export const linkEmployeeToBenefit = async ( req, res ) => {
  const { Email, NombreBeneficio, NombreProyecto } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', sql.VarChar, Email )
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .input( 'NombreBeneficio', sql.VarChar, NombreBeneficio )
      .execute( 'vincularBeneficioEmpleado' );
    console.log( result );
    res.json( { NombreProyecto, NombreBeneficio } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const unlinkEmployeeToBenefit = async ( req, res ) => {
  const { Email, Proyecto, NombreBeneficio } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', sql.VarChar, Email )
      .input( 'Proyecto', sql.VarChar, Proyecto )
      .input( 'NombreBeneficio', sql.VarChar, NombreBeneficio )
      .execute( 'desvincularBeneficioDeEmpleado' );
    console.log( result );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};


export const createBenefit = async ( req, res ) => {
  const { Nombre, NombreProyecto, CostoActual, Descripción } = req.body;
  if ( Nombre == null || CostoActual == null || NombreProyecto == null ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Nombre', sql.VarChar, Nombre )
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .input( 'CostoActual', sql.Int, CostoActual )
      .input( 'Descripción', sql.VarChar, Descripción )
      .query( benefitsQueries.createBenefit );
    console.log( result );
    res.json( { Nombre, CostoActual } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const updateBenefit = async ( req, res ) => {
  const { Nombre, NombreProyecto, CostoActual, Descripción } = req.body;
  const { NombreAntiguo } = req.params;
  if ( Nombre == null || CostoActual == null || NombreProyecto == null ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Nombre', sql.VarChar, Nombre )
      .input( 'NombreAntiguo', sql.VarChar, NombreAntiguo )
      .input( 'NombreProyecto', sql.VarChar, NombreProyecto )
      .input( 'CostoActual', sql.Int, CostoActual )
      .input( 'Descripción', sql.VarChar, Descripción )
      .query( benefitsQueries.editBenefit );
    res.json( { Nombre, NombreProyecto, CostoActual, Descripción } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const deactivateBenefit = async ( req, res ) => {
  const { Nombre, NombreProyecto } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'NombreBeneficio', sql.VarChar, Nombre )
      .input( 'Proyecto', sql.VarChar, NombreProyecto )
      .execute( 'eliminarBeneficio' );
    res.json( { Nombre, NombreProyecto } );
  } catch ( e ) {
    console.log( `Error: ${e}` );
    res.status( 500 ).send( e.message );
  }
};

export const CostTotalBenefits = async ( infoBenefits ) => {
  const { Email, Proyecto, ConsecutivoPlanilla, ConsecutivoPago } = infoBenefits.body;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Email', Email )
      .input( 'Proyecto', Proyecto )
      .input( 'ConsecutivoPlanilla', ConsecutivoPlanilla )
      .input( 'ConsecutivoPago', ConsecutivoPago )
      .execute( 'calcularTotalBeneficiosDeEmpleado' );
    console.log( result.recordset );
    return result.recordset;
  } catch ( e ) {
    console.log( e );
    return undefined;
  }
};

export const validateBenefitSuscription =  async ( req, res ) =>{
  const { projectName, employeeEmail ,benefitToValidate } = req.params;
  // const projectName = 'Taquería Milagro';
  // const employeeEmail = 'crhisCo@hotmail.com';
  // const benefitToValidate = 'Comida';


  let validation = {
    isValid: true,
    exceedsMoneyAmountLimit: false,
    exceedsBenefitsQtyLimit: false
  };
  try {


    const pool = await getConnection();
    const benefitToValidateInfo = await pool.request()
      .input( 'benefitName', benefitToValidate )
      .input( 'projectName', projectName )
      .query( benefitsQueries.getBenefitInfo  );
      
    const benefitsUsedInfo = await pool.request()
      .input( 'employeeEmail', employeeEmail )
      .input( 'projectName', projectName )
      .query( benefitsQueries.benefitUsedInfo  );

    const benefitsLimits = await pool.request()
      .input( 'projectName', projectName )
      .query( benefitsQueries.benefitsLimits  );

    console.log( benefitsUsedInfo.recordset );
    const {  employeeBenefitsQty, moneyAmountUsedByEmployee } =  benefitsUsedInfo.recordset[0];
    const { maxBenefitsQtyAllowed,  maxMoneyAmountAllowed } =   benefitsLimits.recordset[0];
    const {   CostoActual: benefitToValidateCost } =   benefitToValidateInfo.recordset[0];

    if ( employeeBenefitsQty + 1 > maxBenefitsQtyAllowed ){
      validation.isValid = false;
      validation.exceedsBenefitsQtyLimit = true;
    }
    if ( moneyAmountUsedByEmployee + benefitToValidateCost > maxMoneyAmountAllowed ){
      validation.isValid = false;
      validation.exceedsMoneyAmountLimit = true;
    }

    res.json( validation );

    console.log( validation );
  }
  catch ( error ){
    res.status( 500 ).send( 'Database Conection Error:' + error.message );
    console.log( error );
  }
};