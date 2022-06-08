import { getConnection, sql, queries } from '../database';

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

    const message = 'Bad Request. Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Email', sql.VarChar, Email)
      .input('Contrasenia', sql.VarChar, Contrasenia)
      .query(queries.createNewUser);
    console.log(result);
    res.json({ Email, Contrasenia });
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};

export const verifyCredentials = async (req, res) => {
  const { Email, Contrasenia } = req.body;
  console.log('Email');
  console.log(Email);
  console.log(Contrasenia);

  if (Email == null || Contrasenia == null) {
    const message = 'Please Fill All Fields.';
    return res.status(400).send({ errorMsg: message });
  }

  if (Email == '' || Contrasenia == '') {
    const message = 'Please Fill All Fields.';
    return res.status(400).send({ errorMsg: message });
  }

  try {
    const message = 'Wrong UserName or Password.';
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Email', sql.VarChar, Email)
      .input('Contrasenia', sql.VarChar, Contrasenia)
      .query(queries.verifyCredentials);
    console.log(result);
    if (result.recordset.length == 0) {
      res.status(400).send({ errorMsg: message });
    } else {
      res.status(200).json(result.recordset[0]);
    }
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e);
  }
};

export const getUserByEmail = async (req, res) => {
  const { Email } = req.params;
  if (Email == null || Email == '') {
    const message = 'Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Email', Email)
      .query(queries.getUserByEmail);
    res.status(200).json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const getEmployerByID = async (req, res) => {
  const { Cedula } = req.params;
  if (Cedula == null || Cedula == '') {
    const message = 'Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('Cedula', Cedula)
      .query(queries.getEmployerByID);
    console.log(result);
    res.status(200).json(result.recordset);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const registerNewUser = async (req, res) => {
  const { Cedula, Nombre, Apellido1, Apellido2, Telefono, Email, Contrasenia, Roles } = req.body;

  if (Cedula == null || Nombre == null || Apellido1 == null
    || Apellido2 == null || Telefono == null || Email == null || Contrasenia == null) {

    const message = 'Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }

  if (Cedula == '' || Nombre == '' || Apellido1 == ''
    || Apellido2 == '' || Telefono == '' || Email == '' || Contrasenia == '') {

    const message = 'Please Fill All Fields.';
    return res.status(400).json({ msg: message });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Email', sql.VarChar, Email)
      .input('Contrasenia', sql.VarChar, Contrasenia)
      .input('Roles', sql.VarChar, Roles)
      .query(queries.createNewUser);
    console.log(result);
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Cedula', sql.VarChar, Cedula)
      .input('Nombre', sql.VarChar, Nombre)
      .input('Apellido1', sql.VarChar, Apellido1)
      .input('Apellido2', sql.VarChar, Apellido2)
      .input('Telefono', sql.VarChar, Telefono)
      .input('Email', sql.VarChar, Email)
      .query(queries.createNewEmployer);
    console.log(result);
    res.status(200).send();
  } catch (e) {
    console.log(`Error: ${e}`);
    res.status(500).send(e.message);
  }
};
