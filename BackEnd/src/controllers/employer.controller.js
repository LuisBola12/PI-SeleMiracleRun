import { getConnection,sql,queries } from "../database";

export const getEmployer = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllEmployers);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const createNewEmployer = async (req, res) => {
  const { Cedula, Nombre, Apellido1, Apellido2, Telefono, Email } = req.body;
  if (Cedula == null || Nombre == null || Apellido1 == null 
      || Apellido2 == null || Telefono == null || Email == null) {

    const message = "Bad Request. Please Fill All Fields.";
    return res.status(400).json({ msg: message });

  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Cedula", sql.VarChar, Cedula)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Apellido1", sql.VarChar, Apellido1)
      .input("Apellido2", sql.VarChar, Apellido2)
      .input("Telefono", sql.VarChar, Telefono)
      .input("Email", sql.VarChar, Email)
      .query(queries.createNewEmployer);
    console.log(result);
    res.json({ Cedula, Nombre, Apellido1, Apellido2, Telefono, Email });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};