import React from 'react';
import '../App.css'
import { CrudVolDeductions } from '../Components/CrudVolDeductions/CrudVolDeductions';
import Navbar from '../Components/Navbar/Navbar';

const  VolDeductions = () => {
  return (
    <>
        <Navbar/>
        <div className = 'page-content'>
          { <CrudVolDeductions/> }
        </div>
        <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};
  
export default VolDeductions;