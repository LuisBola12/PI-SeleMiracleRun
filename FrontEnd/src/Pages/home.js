import React from 'react';
import Navbar from '../Components/Navbar/Navbar';

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className='page-content'>
        <h1>Esto es el home page de la App</h1>
      </div>
      <footer>&copy; Sele Miracle Run - UCR</footer> 
    </>
  );
};
  
export default Home;