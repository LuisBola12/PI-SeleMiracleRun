import { Router } from 'express';
import { getProjectsByEmail, createProject } from '../controllers/projects.controller';
import { getEmployees, postNewEmployee, getEmployeeByID, verifyEmployeeContractOnProject,
  getEmployeesWithContractOnOtherProyects,contractAEmployee, setHoursEmployee} from '../controllers/employees.contoller';
import { getEmployerByID, getUserByEmail, verifyCredentials, registerNewUser, 
    getProfileEmployeer, getProfileEmployee, updateProfileEmployeer, updateProfileEmployee,deleteEmployeeFromProject } from '../controllers/users.controller';
import { getVoluntaryDeductions, createNewVoluntaryDeduction, getVoluntaryDeductionsByName, updateVoluntaryDeduction, getEmployeeVoluntaryDeductionsByEmail} from '../controllers/voluntaryDeductions.controller';
import { getTypeOfContracts } from '../controllers/contracts.controller';
import { getBenefits, createBenefit, getBenefitsByName, updateBenefit, getEmployeeBenefitsByEmail, getOfferedBenefits } from '../controllers/benefits.controller';

const router = Router();

//Users
router.get('/users/:Email', getUserByEmail);
router.get('/profileEmployee/:Email', getProfileEmployee);
router.get('/profileEmployeer/:Email', getProfileEmployeer);
router.post('/users', verifyCredentials);


//Employer
router.post('/createEmployer', registerNewUser);
router.get('/employer/:Cedula', getEmployerByID);
router.put('/updateEmployeer',updateProfileEmployeer);

//Periodos
// router.get('/periodos',getPeriodos);


//Contracts
router.get('/typeContracts', getTypeOfContracts);


//Employees
router.get('/employee/:Proyecto', getEmployees);
router.post('/employee', postNewEmployee);
router.get('/employee/:Cedula', getEmployeeByID);
router.post('/employee/contract', verifyEmployeeContractOnProject);
router.put('/updateEmployee',updateProfileEmployee);
router.post('/employeesWithContractsOnOtherProyects',getEmployeesWithContractOnOtherProyects);
router.post('/contractExistentEmployee',contractAEmployee);
router.delete('/deleteEmployeeFromProject',deleteEmployeeFromProject)
router.post('/employee/hours', setHoursEmployee);

//Projects
router.get('/projects/:Email/:Rol', getProjectsByEmail);
router.post('/projects', createProject);
router.post('/getProjectPeriod',createPayrroll);


//Benefits
router.get('/benefits/:Proyecto', getBenefits);
router.get('/benefits/:Proyecto/:Nombre', getBenefitsByName);
router.get('/myBenefits/:Proyecto/:Email', getEmployeeBenefitsByEmail);
router.get('/offeredBenefits/:Proyecto/:Email', getOfferedBenefits);
router.post('/benefits', createBenefit);
router.put('/benefits/:NombreAntiguo', updateBenefit);

//VoluntaryDeductions
router.get('/voluntaryDeductions/:NombreProyecto', getVoluntaryDeductions);
router.get('/voluntaryDeductions/:NombreProyecto/:Nombre', getVoluntaryDeductionsByName);
router.post('/voluntaryDeductions', createNewVoluntaryDeduction);
router.put('/voluntaryDeductions/:NombreAntiguo', updateVoluntaryDeduction);
router.get('/myVoluntaryDeductions/:Proyecto/:Email', getEmployeeVoluntaryDeductionsByEmail);


export default router;