import React from 'react'
import { CreateEmployee } from '../Components/CreateEmployee/CreateEmployee';
import Navbar from './../Components/Navbar/Navbar';

export const CreateNewEmployee = () => {
  return (
    <>
      <Navbar/>
      <div className='page-content'>
        <CreateEmployee/>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  )
}
