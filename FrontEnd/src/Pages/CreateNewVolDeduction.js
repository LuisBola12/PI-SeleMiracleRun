import React from 'react';
import '../App.css'
import { CreateBenefit } from '../Components/CrudVolDeductions/CreateVolDeduction';
import Navbar from '../Components/Navbar/Navbar';

export const CreateNewVolDeduction= () => {
  return (
    <>
      <Navbar />
      <div className='page-content'>
        {<CreateBenefit />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
