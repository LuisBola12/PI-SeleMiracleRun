import { getConnection,sql } from '../database';
import { voluntaryDeductionsQueries } from '../database/queries/voluntaryDeductionsQueries';

export const getvoluntaryDeductions = async (req, res) => {
  const { NombreProyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('NombreProyecto', NombreProyecto)
      .query(voluntaryDeductionsQueries.getvoluntaryDeductions);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const getvoluntaryDeductionsByName = async (req, res) => {
  const { NombreProyecto, Nombre } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Nombre', Nombre)
      .input('NombreProyecto', NombreProyecto)
      .query(voluntaryDeductionsQueries.getvoluntaryDeductionsByName);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const createNewvoluntaryDeduction = async (req, res) => {
  const { Nombre, NombreProyecto, Costo, Descripcion } = req.body;
  if (Nombre == null || NombreProyecto == null || Costo == null) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Nombre', sql.VarChar, Nombre)
      .input('NombreProyecto', sql.VarChar, NombreProyecto)
      .input('Costo', sql.Int, Costo)
      .input('Descripcion', sql.VarChar, Descripcion)
      .query(voluntaryDeductionsQueries.createNewvoluntaryDeduction);
    console.log(result);
    res.json({ Nombre, Costo, Descripcion});
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};


export const updatevoluntaryDeduction = async (req, res) => {
  const { Nombre, NombreProyecto, Costo, Descripcion } = req.body;
  const { NombreAntiguo } = req.params;
  if (Nombre == null || Costo == null || NombreProyecto == null) {
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
      .input('Costo', sql.Int, Costo)
      .input('Descripcion', sql.VarChar, Descripcion)
      .query(voluntaryDeductionsQueries.editvoluntaryDeduction);
    res.json({ Nombre, NombreProyecto, Costo, Descripcion });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};