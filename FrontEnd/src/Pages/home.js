import React from 'react';
import App from './../App';
import Navbar from '../Components/Navbar/Navbar';

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className='page-content'>
        <h1>Esto es el home page de la App</h1>
      </div>
    </>
  );
};
  
export default Home;