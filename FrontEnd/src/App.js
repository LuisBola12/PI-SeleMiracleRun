import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import Benefits from './Pages/benefits';
import Employees from './Pages/employees';
import VolDeductions from './Pages/volDeductions';
import Contracts from './Pages/contracts';
import { CreateNewEmployee } from './Pages/createNewEmployee';
import history from './history';
import Login from './Pages/login'
import Register from './Pages/register';
  
function App() {
  return (
    <>
      <Router history={history}>
        {/* <Navbar/> */}
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path= "/" element={<Home/>} />
          <Route path= "home" element={<Home/>} />
          <Route path= "benefits" element={<Benefits/>} />
          <Route path= "employees/createEmployee" element= {<CreateNewEmployee/>}/>
          <Route path= "employees" element={<Employees/>} />
          <Route path= "volDeductions" element={<VolDeductions/>} />
          <Route path= "contracts" element={<Contracts/>} />
        </Routes>
      </Router>
    </>
  );
}
  
export default App;
