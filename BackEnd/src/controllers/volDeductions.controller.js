import { getConnection,sql,queries } from "../database";

export const getVolDeductions = async (req, res) => {
  const { NombreProyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('NombreProyecto', NombreProyecto)
      .query(queries.getVolDeductions);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const getVolDeductionsByName = async (req, res) => {
  const { NombreProyecto, Nombre } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Nombre', Nombre)
      .input('NombreProyecto', NombreProyecto)
      .query(queries.getVolDeductionsByName);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const createNewVolDeduction = async (req, res) => {
  const { Nombre, NombreProyecto, Costo, Descripcion } = req.body;
  if (Nombre == null || NombreProyecto == null || Costo == null) {
    const message = "Bad Request. Please Fill All Fields.";
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("NombreProyecto", sql.VarChar, NombreProyecto)
      .input("Costo", sql.Int, Costo)
      .input("Descripcion", sql.VarChar, Descripcion)
      .query(queries.createNewVolDeduction);
    console.log(result);
    res.json({ Nombre, Costo, Descripcion});
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};