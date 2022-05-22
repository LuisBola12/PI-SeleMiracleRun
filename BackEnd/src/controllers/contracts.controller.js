import { getConnection, sql, queries } from "../database";

export const getTypeOfContracts = async (req, res) => {
    try {
    const pool = await getConnection();
    const result = await pool.request()
      .query(queries.getAllContracts);
    res.json(result.recordset);
  } catch (e) {
    console.log(e);
  }
};