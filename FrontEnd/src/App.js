import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Benefits from './pages/benefits';
import Employees from './pages/employees';
import VolDeductions from './pages/volDeductions';
import Contracts from './pages/contracts';
  
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path= "/" element={<Home/>} />
        <Route path= "benefits" element={<Benefits/>} />
        <Route path= "employees" element={<Employees/>} />
        <Route path= "volDeductions" element={<VolDeductions/>} />
        <Route path= "contracts" element={<Contracts/>} />
      </Routes>
    </Router>
  );
}
  
export default App;
