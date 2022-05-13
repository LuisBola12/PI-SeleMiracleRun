import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import {CrudEmployee} from '../Components/CrudEmployees/CrudEmployee'
const Employees = () => {
    console.log("hola");
  return (
    <>
      <Navbar/>
      <div className='page-content'>
        {<CrudEmployee/>}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};
  
export default Employees;