import { getConnection, queries, sql } from "../database";

export const getBenefits = async (req, res) => {
  const { Proyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Proyecto', Proyecto)
      .query(queries.getBenefits);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const createBenefit = async (req, res) => {
  const { Nombre, NombreProyecto, CostoActual } = req.body;
  if (Nombre == null || CostoActual == null || NombreProyecto == null) {
    const message = "Bad Request. Please Fill All Fields.";
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("NombreProyecto", sql.VarChar, NombreProyecto)
      .input("CostoActual", sql.Int, CostoActual)
      .query(queries.createBenefit);
    console.log(result);
    res.json({ Nombre, CostoActual });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};