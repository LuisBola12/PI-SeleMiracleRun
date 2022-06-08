import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Benefits from './Pages/benefits';
import Employees from './Pages/employees';
import VolDeductions from './Pages/volDeductions';
import { CreateNewVolDeduction } from './Pages/CreateNewVolDeduction';
import { EditVolDeductions } from './Pages/editVolDeductions';
import Contracts from './Pages/contracts';
import SelectProject from './Pages/payrollProjects/SelectProject';
import { CreateNewEmployee } from './Pages/createNewEmployee';
import history from './history';
import Login from './Pages/login'
import Register from './Pages/register';
import PrivateRoute from './Components/PrivateRoute/index';
import Unauthoraized from './Pages/Unauthoraized';
import { CreateNewBenefit } from './Pages/CreateNewBenefit';
import { CreateProjectsForm } from './Components/ProjectsComponents/CreateProjectsForm';
import { EditBenefits } from './Pages/editBenefits';
import Payroll from './Pages/payroll';
import PayrollDetailsPage from './Pages/payrollDetails';
import EmployeesBenefits from './Pages/EmployeesBenefits';

function App() {


  return (

    <Router history={history}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="no-autorizado" element={<Unauthoraized />} />
        <Route path="register" element={<Register />} />
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/" element={<SelectProject />} />
          <Route path="benefits" element={<Benefits />} />
          <Route path="employees" element={<Employees />} />
          <Route path="volDeductions" element={<VolDeductions />} />
          <Route path="volDeductions/CreateVolDeductions" element={<CreateNewVolDeduction />} />
          <Route path="volDeductions/editVolDeduction" element={<EditVolDeductions />} />
          <Route path="projectAdmin" element={<SelectProject />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path='payroll'element={<Payroll/>}/>
          <Route path="payroll/details" element={<PayrollDetailsPage />} />
          <Route path="employees/CreateEmployee" element={<CreateNewEmployee />} />
          <Route path="benefits/CreateBenefit" element={<CreateNewBenefit />} />
          <Route path="benefits/editBenefit" element={<EditBenefits />} />

          <Route path="newProjectForm" element={<CreateProjectsForm />} />
        </Route>
        <Route path="myBenefits" element={<EmployeesBenefits />} />
      </Routes>
    </Router>
  );
}

export default App;
