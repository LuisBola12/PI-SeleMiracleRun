import { getConnection, sql } from "../database";
import { projectQueries } from "../database/queries/projectQueries";
import { payrollQueries } from "./../database/queries/payrollQueries";

export const getProjectsByEmail = async (req, res) => {
  const { Email, Rol } = req.params;
  try {
    const pool = await getConnection();
    let query;
    Rol === "admin"
      ? (query = projectQueries.getProjectsByEmail)
      : (query = projectQueries.getEmployeeProjectsByEmail);
    const result = await pool.request().input("Email", Email).query(query);
    res.json(result.recordset);
  } catch (e) {
    console.log(e);
  }
};

export const createProject = async (req, res) => {
  const { Nombre, Periodo, Email } = req.body;
  if (Nombre == null || Periodo == null || Email == null) {
    const message = "Bad Request. Please Fill All Fields.";
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombre", Nombre)
      .input("Periodo", sql.VarChar, Periodo)
      .input("Email", sql.VarChar, Email)
      .query(projectQueries.createProject);
    console.log(result);
    res.json({ Nombre, Periodo, Email });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};
export const createPayrroll = async (req, res) => {
  const { NombreProyecto } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombre", NombreProyecto)
      .query(payrollQueries.getPeriodForAEspecificProject);
    res.json(result.recordset);
    const periodoProyecto = result.recordset[0].TipoPeriodo;
    console.log(periodoProyecto);
    const date = new Date();
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    const FechaInicioPago = `${year}-${month + 1}-${day}`;
    switch (periodoProyecto) {
      case "Mensual":
        console.log(sumDays(date,-7));
        break;
      case "Quincenal":
        console.log(sumDays(date,-15));
        break;
      case "Menusal":
        console.log(sumDays(date,-30));
        break;
    }
  } catch (error) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};

const sumDays = (fecha, dias) =>{
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
};
