import React from 'react';
import '../App.css';
import { CreateVolDeduction } from '../Components/CreateVolDeduction/CreateVolDeduction';
import { Navbar } from '../Components/Navbar/Navbar';

export const CreateNewVolDeduction= () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<CreateVolDeduction />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
