import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { ViewPayroll } from '../Components/ViewPayrolls/ViewPayroll';

const payroll = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        <ViewPayroll/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  )
}
export default payroll;

