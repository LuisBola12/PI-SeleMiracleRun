import { getConnection, sql, queries } from '../database';

export const getProjectsByEmail = async (req, res) => {
  const { Email } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Email', Email)
      .query(queries.getProjectsByEmail);
    res.json(result.recordset);
  } catch (e) {
    console.log(e);
  }
};


export const createProject = async (req, res) => {
  const { Nombre, Periodo, Email } = req.body;
  if (Nombre == null || Periodo == null || Email == null) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Nombre', Nombre)
      .input('Periodo', sql.VarChar, Periodo)
      .input('Email', sql.VarChar, Email)
      .query(queries.createProject);
    console.log(result);
    res.json({ Nombre, Periodo, Email });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};