import sql from 'mssql';

const dbSettings = {
    user: 'SeleMiracleRunAdmin',
    password: 'SeleMiracleRunAdmin',
    server: '172.16.202.209',
    database: 'SeleMiracleRun',
    encrypt: true,
    options:{
        encrypt: true,
        trustServerCertificate: true,
    }
}
export const getConnection = async () =>{
    try{
        const pool = await sql.connect(dbSettings);
        return pool;
    }catch(e){
        console.log(`Error: ${e}`);
    }
}
export {sql};