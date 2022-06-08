import React from 'react';
import '../App.css';
import { CrudVolDeductions } from '../Components/CrudVolDeductions/CrudVolDeductions';
import { Navbar } from '../Components/Navbar/Navbar';

export const  VolDeductions = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className = 'page-content'>
        { <CrudVolDeductions/> }
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};  