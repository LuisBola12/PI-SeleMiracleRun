import { Router } from 'express';
import { getProjectsByEmail, createProject } from '../controllers/projects.controller';
import { getEmployerByID, getUserByEmail, verifyCredentials, registerNewUser, getProfileEmployeer, getProfileEmployee } from '../controllers/users.controller';
import { getEmployees, postNewEmployee, getEmployeeByID, verifyEmployeeContractOnProject } from '../controllers/employees.contoller';
import { getVoluntaryDeductions, createNewvoluntaryDeduction, getVoluntaryDeductionsByName, updatevoluntaryDeduction } from '../controllers/VoluntaryDeductions.controller';
import { getTypeOfContracts } from '../controllers/contracts.controller';
import { getBenefits, createBenefit, getBenefitsByName, updateBenefit, getEmployeeBenefitsByEmail } from '../controllers/benefits.controller';

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


//Projects
router.get('/projects/:Email/:Rol', getProjectsByEmail);
router.post('/projects', createProject);


//Benefits
router.get('/benefits/:Proyecto', getBenefits);
router.get('/benefits/:Proyecto/:Nombre', getBenefitsByName);
router.get('/myBenefits/:Proyecto/:Email', getEmployeeBenefitsByEmail)
router.post('/benefits', createBenefit);
router.put('/benefits/:NombreAntiguo', updateBenefit);

//VoluntaryDeductions
router.get('/voluntaryDeductions/:NombreProyecto', getvoluntaryDeductions);
router.get('/voluntaryDeductions/:NombreProyecto/:Nombre', getvoluntaryDeductionsByName);
router.post('/voluntaryDeductions', createNewvoluntaryDeduction);
router.put('/voluntaryDeductions/:NombreAntiguo', updatevoluntaryDeduction);



export default router;