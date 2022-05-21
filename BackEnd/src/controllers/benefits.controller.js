import { getConnection, queries } from "../database";

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