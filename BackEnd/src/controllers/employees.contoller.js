import { getConnection } from '../database';
import { employeesQueries } from '../database/queries/employeesQueries';

export const getEmployeeByID = async (req, res) => {
  const { Cedula } = req.params;
  if (Cedula == null || Cedula == '') {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Cedula', Cedula)
      .query(employeesQueries.getEmployeeByID);
    console.log(result);
    res.status(200).json(result.recordset);
  } catch (e) {
    res.status(404);
    res.send(e.message);
  }
};

export const getEmployees = async (req, res) => {
  try {
    const { Proyecto } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Proyecto', Proyecto)
      .query(employeesQueries.getAllEmployees);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};
export const verifyEmployeeContractOnProject = async (req, res) => {
  try {
    const { Cedula, Proyecto } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Cedula', Cedula)
      .input('Proyecto', Proyecto)
      .query(employeesQueries.verifyEmployeeContractProject);
    res.json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }

};
export const postNewEmployee = async (req, res) => {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const fecha = `${year}-${month + 1}-${day}`;
  let {
    NombreProyecto,
    Email,
    Contrasenia,
    Roles,
    Nombre,
    Apellido1,
    Apellido2,
    Cedula,
    Telefono,
    TipoJornada,
    FechaFinContrato,
    SalarioPorHora,
    NombreServicio,
    ValorServicio,
  } = req.body;
  if (SalarioPorHora === 0) {
    SalarioPorHora = null;
  }
  if (NombreServicio === '') {
    NombreServicio = null;
  }
  if (ValorServicio === 0) {
    ValorServicio = null;
  }
  const pool = await getConnection();
  try {
    await pool
      .request()
      .input('Email', Email)
      .input('Contrasenia', Contrasenia)
      .input('Roles', Roles)
      .query(employeesQueries.createNewUser);
  } catch (e) {
    console.log(e);
  }
  try {
    const createEmployee = await pool
      .request()
      .input('Nombre', Nombre)
      .input('Apellido1', Apellido1)
      .input('Apellido2', Apellido2)
      .input('Cedula', Cedula)
      .input('Telefono', Telefono)
      .input('Email', Email)
      .query(employeesQueries.createNewEmployee);
  } catch (e) {
    console.log(e);
  }
  try {
    const createContractForEmployee = await pool
      .request()
      .input('Cedula', Cedula)
      .input('NombreProyecto', NombreProyecto)
      .input('TipoJornada', TipoJornada)
      .input('FechaInicioContrato', fecha)
      .input('FechaFinContrato', FechaFinContrato)
      .input('SalarioPorHora', SalarioPorHora)
      .input('NombreServicio', NombreServicio)
      .input('ValorServicio', ValorServicio)
      .query(employeesQueries.addContractOfAnEmployee);
  } catch (e) {
    console.log(e);
  }
  res.status(200).send();
};
