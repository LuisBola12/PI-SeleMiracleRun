import { getConnection,sql,queries } from "../database";

export const getVolDeductions = async (req, res) => {
  const { Proyecto } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Proyecto', Proyecto)
      .query(queries.getVolDeductions);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const createNewVolDeduction = async (req, res) => {
  const { Proyecto } = req.params;
  const { Name } = req.body;
  if (Name == null || Proyecto == null) {
    const message = "Bad Request. Please Fill All Fields.";
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Proyecto', sql.VarChar, Proyecto)
      .input("Name", sql.VarChar, Name)
      .query(queries.createNewUser);
    console.log(result);
    res.json({ Proyecto, Name });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};