import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Benefits } from './Pages/benefits';
import { Employees } from './Pages/employees';
import { voluntaryDeductions } from './Pages/voluntaryDeductions';
import { CreateNewVoluntaryDeduction } from './Pages/createNewVoluntaryDeduction'
import { EditVoluntaryDeductions } from './Pages/editVoluntaryDeductions';
import { Contracts } from './Pages/contracts';
import { SelectProject } from './Pages/selectProject';
import { CreateNewEmployee } from './Pages/createNewEmployee';
import history from './history';
import { Login } from './Pages/login';
import { Register } from './Pages/register';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import { Unauthoraized } from './Pages/unauthoraized';
import { CreateNewBenefit } from './Pages/createNewBenefit';
import { CreateProjectsForm } from './Components/ProjectsComponents/CreateProjectsForm';
import { EditBenefits } from './Pages/editBenefits';
import { RegisterHours } from './Pages/registerHours';
import { useSelector } from 'react-redux';
import { Home } from './Pages/home';
import { Payroll } from './Pages/payroll';
import { PayrollDetailsPage } from './Pages/payrollDetails';
import { EmployeesBenefits } from './Pages/employeesBenefits';
import { UserPage } from './Pages/userProfile';

function App() {

  const userRoll = useSelector((state) => state.user.user);

  return (

    <Router history={history}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='no-autorizado' element={<Unauthoraized />} />
        <Route path='register' element={<Register />} />

        {/* Routes for the employer */}
        {userRoll && userRoll.Roles === 'admin' ?
          (
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              {/* <Route path='/' element={<SelectProject />} /> */}
              <Route path='benefits' element={<Benefits />} />
              <Route path='employees' element={<Employees />} />
              <Route path='voluntaryDeductions' element={<voluntaryDeductions />} />
              <Route path='voluntaryDeductions/CreatevoluntaryDeductions' element={<CreateNewvoluntaryDeduction />} />
              <Route path='voluntaryDeductions/editvoluntaryDeduction' element={<EditvoluntaryDeductions />} />
              <Route path='projects' element={<SelectProject />} />
              <Route path='contracts' element={<Contracts />} />
              <Route path='userProfile' element={<UserPage />} />
              <Route path='employees/CreateEmployee' element={<CreateNewEmployee />} />
              <Route path='benefits/CreateBenefit' element={<CreateNewBenefit />} />
              <Route path='benefits/editBenefit' element={<EditBenefits />} />
              <Route path='newProjectForm' element={<CreateProjectsForm />} />
              <Route path='payroll' element={<Payroll />} />
              <Route path='payroll/details' element={<PayrollDetailsPage />} />
              {/* quiter esto */}
              <Route path='registerHours' element={<RegisterHours />} />
              <Route path='myBenefits' element={<EmployeesBenefits />} />
            </Route>
          ) : (
            <Route element={<PrivateRoute allowedRoles={['emp']} />}>
              <Route path='home' element={<Home />} />
              <Route path='projects' element={<SelectProject />} />
              <Route path='registerHours' element={<RegisterHours />} />
              <Route path='userProfile' element={<UserPage />} />
              <Route path='myBenefits' element={<EmployeesBenefits />} />
            </Route>
          )}



      </Routes>
    </Router>
  );
}

export default App;
