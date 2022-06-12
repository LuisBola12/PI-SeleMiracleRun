import React from 'react';
import '../App.css';
import { CrudvoluntaryDeductions } from '../Components/CrudvoluntaryDeductions/CrudvoluntaryDeductions';
import { Navbar } from '../Components/Navbar/Navbar';

export const  voluntaryDeductions = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className = 'page-content'>
        { <CrudvoluntaryDeductions/> }
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};  