import React from 'react';
import '../App.css';
import { CreatevoluntaryDeduction } from '../Components/CreatevoluntaryDeduction/CreatevoluntaryDeduction';
import { Navbar } from '../Components/Navbar/Navbar';

export const CreateNewvoluntaryDeduction= () => {
  return (
    <>
      <div className='sticky-navbar'>
        <Navbar />
      </div>
      <div className='page-content'>
        {<CreatevoluntaryDeduction />}
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer>
    </>
  );
};
