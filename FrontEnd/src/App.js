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

const database = [
  { name: "Coca Cola", periodoDePago: 'semanal' },
  { name: "Pepsi", periodoDePago: 'mensual' },
  { name: "Radiadores Solceri", periodoDePago: 'quincenal' },
]
function App() {
  const [activeProject, setActiveProject] = useState('Proyecto sin asignar');
  const [projects, setProjects] = useState(database)

  return (
    <ProjectContext.Provider value={{ activeProject, setActiveProject, projects, setProjects }
    }>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="benefits" element={<Benefits />} />
          <Route path="employees" element={<Employees />} />
          <Route path="volDeductions" element={<VolDeductions />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="projectAdmin" element={<SelectProject />} />
        </Routes>
      </Router>
    </ProjectContext.Provider >
  );
}

export default App;
