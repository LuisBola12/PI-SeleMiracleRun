import { Router } from 'express';
import { getProjectsByEmailAndName, getProjectsByEmail, createProject, createPayrroll, logicEliminateProject } from '../controllers/projects.controller';
import {
  getEmployees, postNewEmployee, getEmployeeByID, verifyEmployeeContractOnProject,
  getEmployeesWithContractOnOtherProyects, contractAEmployee, setHoursEmployee, deleteEmployeeFromProject, getEmployeesAllInfo,
  getEmployeePayments
} from '../controllers/employees.contoller';
import {
  getEmployerByID, getUserByEmail, verifyCredentials, registerNewUser,
  getProfileEmployeer, getProfileEmployee, updateProfileEmployeer, updateProfileEmployee
} from '../controllers/users.controller';
import { getVoluntaryDeductions, createNewVoluntaryDeduction, getVoluntaryDeductionsByName, updateVoluntaryDeduction, 
  getEmployeeVoluntaryDeductionsByEmail, getOfferedVoluntaryDeductions, linkEmployeeToVoluntaryDeduction,  unlinkEmployeeToVoluntaryDeduction,
  deactivateVoluntaryDeduction } from '../controllers/voluntaryDeductions.controller';
import { getTypeOfContracts } from '../controllers/contracts.controller';
import {
  getBenefits, createBenefit, getBenefitsByName, updateBenefit, getEmployeeBenefitsByEmail,
  getOfferedBenefits, linkEmployeeToBenefit,  unlinkEmployeeToBenefit, deactivateBenefit,
  validateBenefitSuscription
} from '../controllers/benefits.controller';
import { getAllPayslipsOfAProject, getPayrrollsOfAProject } from '../controllers/payrollController';

const router = Router();

//Users
router.get( '/users/:Email', getUserByEmail );
router.get( '/profileEmployee/:Email', getProfileEmployee );
router.get( '/profileEmployeer/:Email', getProfileEmployeer );
router.post( '/users', verifyCredentials );


//Employer
router.post( '/createEmployer', registerNewUser );
router.get( '/employer/:Cedula', getEmployerByID );
router.put( '/updateEmployeer', updateProfileEmployeer );

//Periodos
// router.get('/periodos',getPeriodos);


//Contracts
router.get( '/typeContracts', getTypeOfContracts );


//Employees
router.get( '/employee/:Proyecto', getEmployees );
router.post( '/employee', postNewEmployee );
router.get( '/employee/:Cedula', getEmployeeByID );
router.post( '/employee/contract', verifyEmployeeContractOnProject );
router.put( '/updateEmployee', updateProfileEmployee );
router.post( '/employeesWithContractsOnOtherProyects', getEmployeesWithContractOnOtherProyects );
router.post( '/contractExistentEmployee', contractAEmployee );
router.post( '/deleteEmployeeFromProject', deleteEmployeeFromProject );
router.post( '/employee/hours', setHoursEmployee );
router.get( '/employeePayments/:projectName/:employeeEmail', getEmployeePayments );

//Projects
router.get( '/projects/:Email/:Rol', getProjectsByEmail );
router.post( '/projects', createProject );
router.post( '/createPayrroll', createPayrroll );
router.post( '/getProjectPeriod', createPayrroll );
router.get( '/getEmployeesInfo/:projectName', getEmployeesAllInfo );

//Projects
router.get( '/projects/:Email/:Rol', getProjectsByEmail );
router.post( '/projects', createProject );
router.post( '/getProjectPeriod', createPayrroll );
router.put( '/logicEliminateProject', logicEliminateProject );
router.get( '/myProjects/:Email/:ProjectName', getProjectsByEmailAndName  );

//Benefits
router.get( '/benefits/:Proyecto', getBenefits );
router.get( '/benefits/:Proyecto/:Nombre', getBenefitsByName );
router.get( '/myBenefits/:Proyecto/:Email', getEmployeeBenefitsByEmail );
router.get( '/offeredBenefits/:Proyecto/:Email', getOfferedBenefits );
router.post( '/benefits', createBenefit );
router.put( '/benefits/:NombreAntiguo', updateBenefit );
router.put( '/benefits', deactivateBenefit );
router.post( '/myBenefits', linkEmployeeToBenefit );
router.put( '/myBenefits', unlinkEmployeeToBenefit );
router.get( '/validateBenefit/:projectName/:employeeEmail/:benefitToValidate',  validateBenefitSuscription );

//VoluntaryDeductions
router.get( '/voluntaryDeductions/:NombreProyecto', getVoluntaryDeductions );
router.get( '/voluntaryDeductions/:NombreProyecto/:Nombre', getVoluntaryDeductionsByName );
router.post( '/voluntaryDeductions', createNewVoluntaryDeduction );
router.put( '/voluntaryDeductions/:NombreAntiguo', updateVoluntaryDeduction );
router.get( '/myVoluntaryDeductions/:Proyecto/:Email', getEmployeeVoluntaryDeductionsByEmail );
router.get( '/offeredVoluntaryDeductions/:Proyecto/:Email', getOfferedVoluntaryDeductions );
router.post( '/myVoluntaryDeductions', linkEmployeeToVoluntaryDeduction );
router.put( '/myVoluntaryDeductions', unlinkEmployeeToVoluntaryDeduction );
router.put( '/voluntaryDeductions', deactivateVoluntaryDeduction );

//Payrrolls
router.get('/payrrolls/:Proyecto',getPayrrollsOfAProject)
router.post('/payslipsOfaProject',getAllPayslipsOfAProject);

export default router;