import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Benefits from './Pages/benefits';
import Employees from './Pages/employees';
import VolDeductions from './Pages/volDeductions';
import Contracts from './Pages/contracts';
import SelectProject from './Pages/payrollProjects/SelectProject';
import { CreateNewEmployee } from './Pages/createNewEmployee';
import history from './history';
import Login from './Pages/login'
import Register from './Pages/register';
import PrivateRoute from './Components/PrivateRoute/index';
import Unauthoraized from './Pages/Unauthoraized';
import { CreateNewBenefit } from './Pages/CreateNewBenefit';


function App() {


  return (

    <Router history={history}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="no-autorizado" element={<Unauthoraized />} />
        <Route path="register" element={<Register />} />
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/" element={<SelectProject />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="benefits" element={<Benefits />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="employees" element={<Employees />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="volDeductions" element={<VolDeductions />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="projectAdmin" element={<SelectProject />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="contracts" element={<Contracts />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="employees/CreateEmployee" element={<CreateNewEmployee />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="benefits/CreateBenefit" element={<CreateNewBenefit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
