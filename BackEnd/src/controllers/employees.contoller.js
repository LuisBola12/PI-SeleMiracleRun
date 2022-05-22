import { getConnection,sql,queries } from "../database";

export const getEmployees = async (req,res) => {
    try {
        const{Proyecto} = req.params;
        const pool = await getConnection();
        const result = await pool.request()
        .input('Proyecto',Proyecto)
        .query(queries.getAllEmployees);
        res.json(result.recordset);
      } catch (e) {
        res.status(500);
        res.send(e.message);
      }
};
export const postNewEmployee = async (req,res) => {
  const date = new Date();
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  const fecha = `${year}-${month+1}-${day}`;
  const {NombreProyecto,Email,Contrasenia,Nombre,Apellido1,Apellido2,Cedula,Telefono,TipoJornada,
    FechaFinContrato,SalarioPorHora,NombreServicio,ValorServicio} = req.body;
      const pool = await getConnection();
      try{
        const result1 = await pool.request()
        .input('Email', Email)
        .input('Contrasenia', Contrasenia)
        .query(queries.createNewUser);
      }catch(e){
        console.log(e);
      }
      try {
        const result2 = await pool.request()
        .input('Nombre', Nombre)
        .input('Apellido1', Apellido1)
        .input('Apellido2', Apellido2)
        .input('Cedula', Cedula)
        .input('Telefono', Telefono)
        .input('Email', Email)
        .query(queries.createNewUser);
      res.json(result.recordset); 
      } catch (e) {
        console.log(e);
      }
      try {
        const result3 = await pool.request()
        .input('Cedula',Cedula)
        .input('NombreProyecto',NombreProyecto)
        .input('TipoJornada', TipoJornada)
        .input('FechaInicioContrato', fecha)
        .input('FechaFinContrato', FechaFinContrato)
        .input('SalarioPorHora', SalarioPorHora)
        .input('NombreServicio', NombreServicio)
        .input('ValorServicio', ValorServicio)
        .query(queries.addContractOfAnEmployee);
      res.json(result.recordset); 
      } catch (e) {
        console.log(e);
      }
      res.status(200);
};
