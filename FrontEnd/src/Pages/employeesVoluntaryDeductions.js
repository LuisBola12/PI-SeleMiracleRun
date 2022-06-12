import React from 'react';
import '../App.css';
import { Navbar } from '../Components/Navbar/Navbar';
import { EmployeeVoluntaryDeduction } from '../Components/EmployeeVoluntaryDeductions/EmployeevoluntaryDeductions';

export const EmployeesvoluntaryDeductions = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<EmployeevoluntaryDeductions />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
