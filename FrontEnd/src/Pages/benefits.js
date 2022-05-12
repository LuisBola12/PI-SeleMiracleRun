import React from 'react';
import '../App.css'
import { CrudBenefits } from '../Components/CrudBenefits/CrudBenefits';
import Navbar from '../Components/Navbar/Navbar';

const  Benefits = () => {
  return (
    <>
        <Navbar/>
        <div className = 'page-content'>
          { <CrudBenefits/> }
        </div>
        <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};
  
export default Benefits;