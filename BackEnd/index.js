const DataBase = {user:'SeleMiracleRunAdmin',password:'SeleMiracleRunAdmin',database:'SeleMiracleRun',host:'172.16.202.209'};
//Link del paquete usado: https://www.npmjs.com/package/mssql

const sql = require('mssql') //Paquete que requiere para poder funcionar
const sqlConfig = { //Esto es un JSON con toda la configuracion(datos) que se necesita para iniciar sesion
  user: DataBase.user, //Usuario *
  password: DataBase.password, //Contrasenia *
  database: DataBase.database, //Nombre de la base *
  server: DataBase.host, //Ip de la base *
  pool: {
    max: 10,//Numero maximo de conexiones
    min: 0,//Numero minino de conexiones
    idleTimeoutMillis: 30000 //Timeout que hay que pasar sin respuesat para tirar una conexion
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}
setTimeout(async () =>{
    try {
        //make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig);
        console.log(`Succesfully connected to: ${DataBase.database}`);
       } catch (err) {
        console.log("Failed: Could not connect to the database");
       }
},1500)