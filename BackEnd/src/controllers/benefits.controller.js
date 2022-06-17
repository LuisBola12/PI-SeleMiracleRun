import { getConnection, sql } from '../database';
import { benefitsQueries } from '../database/queries/benefitsQueries';
import {getConsecutivePayNumber} from './payrollController'

export const getBenefits = async (req, res) => {
  const { Proyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Proyecto', Proyecto)
      .query(benefitsQueries.getBenefits);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const getBenefitsByName = async (req, res) => {
  const { Proyecto, Nombre } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Nombre', Nombre)
      .input('Proyecto', Proyecto)
      .query(benefitsQueries.getBenefitsByName);
    res.json(result.recordset);
    console.log(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const getEmployeeBenefitsByEmail = async (req, res) => {
  const { Proyecto, Email } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Email', Email)
      .input('Proyecto', Proyecto)
      .execute('getEmployeeBenefits');
    res.json(result.recordset);
    console.log(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};


export const getOfferedBenefits = async (req, res) => {
  const { Proyecto, Email } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Email', Email)
      .input('Proyecto', Proyecto)
      .execute('getOfferedBenefits');
    res.json(result.recordset);
    console.log(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};


export const linkEmployeeToBenefit = async (req, res) => {
  const { Email, NombreBeneficio, NombreProyecto } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Email', sql.VarChar, Email)
      .input('NombreProyecto', sql.VarChar, NombreProyecto)
      .input('NombreBeneficio', sql.VarChar, NombreBeneficio)
      .execute('vincularBeneficioEmpleado');
    console.log(result);
    res.json({ Nombre, CostoActual });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};

export const unlinkEmployeeToBenefit = async (req, res) => {
  const { Email, Proyecto, NombreBeneficio } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Email', sql.VarChar, Email)
      .input('Proyecto', sql.VarChar, Proyecto)
      .input('NombreBeneficio', sql.VarChar, NombreBeneficio)
      .execute('desvincularBeneficioDeEmpleado');
    console.log(result);
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
}


export const createBenefit = async (req, res) => {
  const { Nombre, NombreProyecto, CostoActual, Descripción } = req.body;
  if (Nombre == null || CostoActual == null || NombreProyecto == null) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Nombre', sql.VarChar, Nombre)
      .input('NombreProyecto', sql.VarChar, NombreProyecto)
      .input('CostoActual', sql.Int, CostoActual)
      .input('Descripción', sql.VarChar, Descripción)
      .query(benefitsQueries.createBenefit);
    console.log(result);
    res.json({ Nombre, CostoActual });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};

export const updateBenefit = async (req, res) => {
  const { Nombre, NombreProyecto, CostoActual, Descripción } = req.body;
  const { NombreAntiguo } = req.params;
  if (Nombre == null || CostoActual == null || NombreProyecto == null) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Nombre', sql.VarChar, Nombre)
      .input('NombreAntiguo', sql.VarChar, NombreAntiguo)
      .input('NombreProyecto', sql.VarChar, NombreProyecto)
      .input('CostoActual', sql.Int, CostoActual)
      .input('Descripción', sql.VarChar, Descripción)
      .query(benefitsQueries.editBenefit);
    res.json({ Nombre, NombreProyecto, CostoActual, Descripción });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};

export const insertCostTotalBenefits = async ( cedEmpleado, proyName, consecutivePayroll  ) => {
  const consecutivePayslip = await getConsecutivePayNumber(consecutivePayroll,cedEmpleado);
  console.log(` beneficio: ${cedEmpleado}, ${proyName}, ${consecutivePayroll},${consecutivePayslip}`)
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'CedulaEmpleado', cedEmpleado )
      .input( 'Proyecto', proyName )
      .input( 'ConsecutivoPlanilla', consecutivePayroll )
      .input( 'ConsecutivoPago', consecutivePayslip )
      .execute( 'insertarBeneficiosEnPago' );
      console.log(result.recordset)
  } catch ( e ) {
    console.log( e );
    return undefined;
  }
};
