import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import Benefits from './Pages/benefits';
import Employees from './Pages/employees';
import VolDeductions from './Pages/volDeductions';
import Contracts from './Pages/contracts';
  
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path= "home" element={<Home/>} />
        <Route path= "benefits" element={<Benefits/>} />
        <Route path= "employees" element={<Employees/>} />
        <Route path= "volDeductions" element={<VolDeductions/>} />
        <Route path= "contracts" element={<Contracts/>} />
      </Routes>
    </Router>
  );
}
  
export default App;
