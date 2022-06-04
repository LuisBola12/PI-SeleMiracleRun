import { getConnection, sql } from "../database";
import { benefitsQuerys } from "../database/benefitsQuerys";

export const getBenefits = async (req, res) => {
  const { Proyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Proyecto', Proyecto)
      .query(benefitsQuerys.getBenefits);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const getBenefitsByName = async (req, res) => {
  const { Proyecto, Nombre } = req.params;
  console.log(Proyecto, Nombre)
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Nombre', Nombre)
      .input('Proyecto', Proyecto)
      .query(benefitsQuerys.getBenefitsByName);
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
      .input("Descripción", sql.VarChar, Descripción)
      .query(benefitsQuerys.createBenefit);
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
    const message = "Bad Request. Please Fill All Fields.";
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("NombreAntiguo", sql.VarChar, NombreAntiguo)
      .input("NombreProyecto", sql.VarChar, NombreProyecto)
      .input("CostoActual", sql.Int, CostoActual)
      .input("Descripción", sql.VarChar, Descripción)
      .query(benefitsQuerys.editBenefit);
    res.json({ Nombre, NombreProyecto, CostoActual, Descripción })
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
}