import { getConnection } from '../database';
import { employeesQueries } from '../database/queries/employeesQueries';
import { userQueries } from '../database/queries/userQueries';
import { sendEmail } from '../services/Mailer';
import { emailNewUserEmployee } from '../FormatEmailMessages/EmailNewUserEmployee';
import { employerQueries } from '../database/queries/employerQueries';
import {emailTerminateContract} from '../FormatEmailMessages/EmailTerminateContract';

export const getEmployeeByID = async ( req, res ) => {
  const { Cedula } = req.params;
  if ( Cedula == null || Cedula == '' ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'Cedula', Cedula )
      .query( employeesQueries.getEmployeeByID );
    console.log( result );
    res.status( 200 ).json( result.recordset );
  } catch ( e ) {
    res.status( 404 );
    res.send( e.message );
  }
};

export const getEmployees = async ( req, res ) => {
  try {
    const { Proyecto } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Proyecto', Proyecto )
      .query( employeesQueries.getAllEmployees );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const verifyEmployeeContractOnProject = async ( req, res ) => {
  try {
    const { Cedula, Proyecto } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Cedula', Cedula )
      .input( 'Proyecto', Proyecto )
      .query( employeesQueries.verifyEmployeeContractProject );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }

};
export const getEmployeesWithContractOnOtherProyects = async( req,res ) => {
  try {
    const { Email,Proyecto } = req.body;
    console.log( Email,Proyecto );
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email',Email )
      .input( 'Proyecto',Proyecto )
      .query( employeesQueries.getEmployeesWithContractsOnOtherProyects );
    console.log( result.recordset );
    res.json( result.recordset );
  } catch ( e ){
    res.status( 500 );
    res.send( e.message );
  }
};
export const postNewEmployee = async ( req, res ) => {
  const date = new Date();
  const [ month, day, year ] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const fecha = `${year}-${month + 1}-${day}`;
  let {
    NombreProyecto,
    Email,
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
  console.log( NombreProyecto,
    Email,
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
    ValorServicio, );
  if ( SalarioPorHora === 0 ) {
    SalarioPorHora = null;
  }
  if ( NombreServicio === '' ) {
    NombreServicio = null;
  }
  if ( ValorServicio === 0 ) {
    ValorServicio = null;
  }
  const pool = await getConnection();

  const ContraseniaRandom = Math.floor(
    Math.random() * ( 999999 - 100000 + 1 ) + 100000
  );

  try {
    await pool
      .request()
      .input( 'Email', Email )
      .input( 'Contrasenia', ContraseniaRandom )
      .input( 'Roles', Roles )
      .query( userQueries.createNewUser );
  } catch ( e ) {
    console.log( e );
  }

  try {
    const createEmployee = await pool
      .request()
      .input( 'Nombre', Nombre )
      .input( 'Apellido1', Apellido1 )
      .input( 'Apellido2', Apellido2 )
      .input( 'Cedula', Cedula )
      .input( 'Telefono', Telefono )
      .input( 'Email', Email )
      .query( employeesQueries.createNewEmployee );
  } catch ( e ) {
    console.log( e );
  }
  try {
    const createContractForEmployee = await pool
      .request()
      .input( 'Cedula', Cedula )
      .input( 'NombreProyecto', NombreProyecto )
      .input( 'TipoJornada', TipoJornada )
      .input( 'FechaInicioContrato', fecha )
      .input( 'FechaFinContrato', FechaFinContrato )
      .input( 'SalarioPorHora', SalarioPorHora )
      .input( 'NombreServicio', NombreServicio )
      .input( 'ValorServicio', ValorServicio )
      .query( employeesQueries.addContractOfAnEmployee );
  } catch ( e ) {
    console.log( e );
  }
  try {
    const result = await pool.request()
      .input( 'CedEmpleado', Cedula )
      .input( 'Proyecto', NombreProyecto )
      .query( employerQueries.getEmployerByProjectIDEmployee );
    const dataInfoUser = {
      'email': Email, 
      'password': ContraseniaRandom, 
      'project': NombreProyecto, 
      'employer': `${result.recordset[0].Nombre} ${result.recordset[0].Apellido1}`, 
      'employee': `${Nombre} ${Apellido1} ${Apellido2}`,
    };
    let mailFormat = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: 'Nueva Cuenta SeleMiracleRun',
      html: emailNewUserEmployee( dataInfoUser ),
    };
    await sendEmail( mailFormat );
    console.log( 'Se envio correctamente' );
  } catch ( e ){
    console.log( e );
  }
  res.status( 200 ).send();
};

export const contractAEmployee = async ( req,res ) =>{
  try {
    const { Cedula,TipoContrato,Proyecto,NombreServicio,SalarioPorHora,FechaFinContrato,ValorServicio } = req.body;
    console.log( Cedula,TipoContrato,Proyecto,NombreServicio,SalarioPorHora,FechaFinContrato,ValorServicio );
    const date = new Date();
    const [ month, day, year ] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    const FechaInicioContrato = `${year}-${month + 1}-${day}`;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Cedula',Cedula )
      .input( 'TipoJornada',TipoContrato )
      .input( 'NombreProyecto',Proyecto )
      .input( 'NombreServicio',NombreServicio )
      .input( 'SalarioPorHora',SalarioPorHora )
      .input( 'FechaInicioContrato',FechaInicioContrato )
      .input( 'FechaFinContrato',FechaFinContrato )
      .input( 'ValorServicio',ValorServicio )
      .query( employeesQueries.contractExistentEmployee );
    res.json( result.recordset );
  } catch ( e ){
    res.status( 500 );
    res.send( e.message );
  }
};
export const deleteEmployeeFromProject = async( req,res ) =>{

  const { Proyecto,EmailEmpleado,Cedula,MotivoDeDespido } = req.body;
  let mailFormat = {
    from: process.env.EMAIL_USER,
    to: EmailEmpleado,
    subject: 'Terminacion de Contrato',
    html: ( emailTerminateContract(MotivoDeDespido) ),
  };
  await sendEmail( mailFormat );
  console.log( 'Se envio correctamente' );
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Cedula',Cedula )
      .input( 'Proyecto',Proyecto )
      .execute( 'DeleteAnEmployeeFromAProject' );
    res.json( result.recordset );
  } catch ( error ) {
    res.status( 500 );
    res.send( error.message );
  }
};

export const setHoursEmployee = async ( req, res ) => {
  try {
    const { Email, Proyecto, Fecha, CantidadHoras } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input( 'Email', Email )
      .input( 'Proyecto', Proyecto )
      .input( 'Fecha', Fecha )
      .input( 'CantidadHoras', CantidadHoras )
      .execute( 'ingresarHoras' );
    res.json( result.recordset );
  } catch ( e ) {
    res.status( 500 );
    res.send( e.message );
  }
};

export const getEmployeesAllInfo = async ( req, res ) => {
  const { projectName } = req.params;
  try {
    const pool = await getConnection(); 
    const result = await pool
      .request()
      .input( 'projectName', projectName )
      .query( employeesQueries.getActiveEmployeesInfo );
    res.json( result.recordset );
  } catch ( error ) {
    res.error( error );
    return error;
  }
};

export const getEmployeePayments = async ( req, res ) => {
  const { projectName, employeeEmail } = req.params;
  if ( projectName == null || employeeEmail == '' ) {
    const message = 'Bad Request. Please Fill All Fields.';
    return res.status( 400 ).json( { msg: message } );
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input( 'projectName', projectName )
      .input( 'employeeEmail', employeeEmail )
      .query( employeesQueries.getPaymentsOfEmployee );
    console.log( result );
    res.status( 200 ).json( result.recordset );
  } catch ( e ) {
    res.status( 404 );
    res.send( e.message );
  }
};