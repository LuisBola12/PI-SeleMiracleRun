import React from 'react';
import App from './../App';

import { CrudEmployee } from '../Components/CrudEmployees/CrudEmployee';
const Home = () => {
  return (

    <CrudEmployee/>
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'Center',
    //     alignItems: 'Center',
    //     height: '100vh'
    //     }}>
    //   <h1>Esto es el home page de la App</h1>
    // </div>
  );
};
  
export default Home;