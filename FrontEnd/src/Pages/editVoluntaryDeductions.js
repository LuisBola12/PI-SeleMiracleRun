import React from 'react';
import '../App.css';
import { EditvoluntaryDeduction } from '../Components/EditvoluntaryDeduction/EditvoluntaryDeduction';
import { Navbar } from '../Components/Navbar/Navbar';

export const EditvoluntaryDeductions = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<EditvoluntaryDeduction />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
