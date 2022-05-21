import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import Benefits from './Pages/benefits';
import Employees from './Pages/employees';
import VolDeductions from './Pages/volDeductions';
import Contracts from './Pages/contracts';
import ProjectContext from './Contexts/ProjectContext';
import SelectProject from './Pages/payrollProjects/SelectProject';
import { CreateNewEmployee } from './Pages/createNewEmployee';
import history from './history';
import Login from './Pages/login'
import Register from './Pages/register';
import PrivateRoute from './Components/PrivateRoute/index';



function App() {
  const [activeProject, setActiveProject] = useState('Proyecto sin asignar');

  return (
    <ProjectContext.Provider value={{ activeProject, setActiveProject }
    }>
      <Router history={history}>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="benefits" element={<Benefits />} />
          <Route path="employees" element={<Employees />} />
          <Route path="volDeductions" element={<VolDeductions />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="projectAdmin" element={<SelectProject />} />
          <Route path="employees/CreateNewEmployee" element={<CreateNewEmployee />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="home" element={<Home />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/" element={<Home />} />
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
          <Route path="employees/CreateNewEmployee" element={<CreateNewEmployee />} />
          </Route>
        </Routes>
      </Router>
    </ProjectContext.Provider >
  );
}

export default App;
