import { getConnection,sql,queries } from "../database";

export const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllUSers);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const createNewUser = async (req, res) => {
  const { Email, Contrasenia } = req.body;
  if (Email == null || Contrasenia == null) {
    const message = "Bad Request. Please Fill All Fields.";
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Email", sql.VarChar, Email)
      .input("Contrasenia", sql.VarChar, Contrasenia)
      .query(queries.createNewUser);
    console.log(result);
    res.json({ Email, Contrasenia });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};

export const getUserByEmail= async (req,res) =>{
    const{Email} = req.params;
    console.log(Email);
    try{
        const pool = await getConnection();
        const result = await pool.request()
        .input('Email',Email)
        .query(queries.getUserByEmail);
        console.log(result);
        res.send(result);
    }catch(e){
        console.log(e);
    }
};

export const getPeriodos = async(req,res) =>{
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getPeriodos);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};
