import React from 'react';
import '../App.css';
import { EditVolDeduction } from '../Components/EditVolDeduction/EditVolDeduction';
import { Navbar } from '../Components/Navbar/Navbar';

export const EditVolDeductions = () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<EditVolDeduction />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
