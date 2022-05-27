import React from 'react';
import '../App.css'
import { CreateBenefit } from '../Components/CrudBenefits/CreateBenefit';
import Navbar from '../Components/Navbar/Navbar';

export const CreateNewBenefit = () => {
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
