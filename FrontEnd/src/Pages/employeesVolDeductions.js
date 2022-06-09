import React from 'react';
import '../App.css';
import { Navbar } from '../Components/Navbar/Navbar';
import { EmployeeVolDeductions } from '../Components/EmployeeVolDeductions/EmployeeVolDeductions';

export const EmployeesVolDeductions = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<EmployeeVolDeductions />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
