import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
  
const Employees = () => {
    console.log("hola");
  return (
    <>
      <Navbar/>
      <div className='page-content'>
        <h1>lista de empleados</h1>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};
  
export default Employees;