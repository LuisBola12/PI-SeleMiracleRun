import { getConnection,sql,queries } from "../database";

export const getEmployees = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllEmployees);
        res.json(result.recordset);
      } catch (e) {
        res.status(500);
        res.send(e.message);
      }
};
