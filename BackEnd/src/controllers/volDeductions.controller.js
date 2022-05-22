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

export const createNewVolDeduction = async (req, res) => {
  const { NombreProyecto } = req.body;
  const { Nombre } = req.body;
  const { PorcentajeEmpleador } = req.body;
  const { PorcentajeEmpleado } = req.body; 
  if (Nombre == null || NombreProyecto == null) {
    const message = "Bad Request. Please Fill All Fields.";
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("NombreProyecto", sql.VarChar, NombreProyecto)
      .input("PorcentajeEmpleador", sql.Float, PorcentajeEmpleador)
      .input("PorcentajeEmpleado", sql.Float, PorcentajeEmpleado)
      .query(queries.createNewVolDeduction);
    console.log(result);
    res.json({ Nombre, NombreProyecto, PorcentajeEmpleador, PorcentajeEmpleado});
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};