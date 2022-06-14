import { getConnection, sql } from '../database';
import { benefitsQueries } from '../database/queries/benefitsQueries';

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
      .query(benefitsQueries.getEmployeeBenefitsByEmail);
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
      .query(benefitsQueries.getOfferedBenefits);
    res.json(result.recordset);
    console.log(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};


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