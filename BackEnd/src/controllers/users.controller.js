import {getConnection} from '../database/connection'

export const getUsers = async (req,res)=>{
    const pool = await getConnection();
    const result = await pool.request().query('Select * From Usuarios');
    res.json(result.recordset)
};