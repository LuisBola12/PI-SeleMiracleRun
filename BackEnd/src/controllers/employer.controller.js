import { getConnection,sql,queries } from "../database";

export const getEmployer = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllEmployees);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const createNewEmployer = async (req, res) => {
  const { Cedula, Nombre, Apellido1, Apellido2, Telefono, Email } = req.body;
  if (Cedula == null || Nombre == null || Apellido1 == null || Apellido2 == null || Email == null || Nombre == null) {
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

export const getEmployerByID= async (req,res) =>{
    const{Cedula} = req.params;
    console.log(Email);
    try{
        const pool = await getConnection();
        const result = await pool.request()
        .input('Cedula',Cedula)
        .query(queries.getAllEmployeesByID);
        console.log(result);
        res.send(result);
    }catch(e){
        console.log(e);
    }
};