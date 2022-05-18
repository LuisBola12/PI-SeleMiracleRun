import React, { createContext, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import Benefits from './Pages/benefits';
import Employees from './Pages/employees';
import VolDeductions from './Pages/volDeductions';
import Contracts from './Pages/contracts';
import Projects from './Pages/payrollProjects/Projects';
import CrudProjects from './Components/CrudProjects/CrudProjects';
import ProjectContext from './Contexts/ProjectContext';



function App() {
  const [activeProject, setActiveProject] = useState('Proyecto desdeAoo');
  const changeActiveProject = (newActiveProject) => {
    setActiveProject(newActiveProject);
  };

  return (
    <ProjectContext.Provider value={{ activeProject, setActiveProject }}>
      <Router>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="benefits" element={<Benefits />} />
          <Route path="employees" element={<Employees />} />
          <Route path="volDeductions" element={<VolDeductions />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="projectAdmin" element={<CrudProjects />} />
        </Routes>
      </Router>
    </ProjectContext.Provider>
  );
}

export default App;
