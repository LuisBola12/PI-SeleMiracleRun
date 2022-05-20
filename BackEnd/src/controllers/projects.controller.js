import { getConnection, sql, queries } from "../database";

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
