import React from 'react';
import '../App.css'
import Navbar from '../Components/Navbar/Navbar';
import { EmployeeBenefits } from '../Components/EmployeeBenefits/EmployeeBenefits';

const EmployeesBenefits = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<EmployeeBenefits />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};

export default EmployeesBenefits;