import { Router } from 'express';
import { getProjectsByEmail, createProject } from '../controllers/projects.controller';
import { getEmployerByID, getUserByEmail, verifyCredentials, registerNewUser, getProfileEmployeer,
    getProfileEmployee,updateProfileEmployee,updateProfileEmployeer } from '../controllers/users.controller';
import { getEmployees, postNewEmployee, getEmployeeByID, verifyEmployeeContractOnProject,
    getEmployeesWithContractOnOtherProyects,contractAEmployee} from '../controllers/employees.contoller';
import { getVolDeductions, createNewVolDeduction, getVolDeductionsByName, updateVolDeduction } from '../controllers/volDeductions.controller';
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

//Projects
router.get('/projects/:Email/:Rol', getProjectsByEmail);
router.post('/projects', createProject);


//Benefits
router.get('/benefits/:Proyecto', getBenefits);
router.get('/benefits/:Proyecto/:Nombre', getBenefitsByName);
router.get('/myBenefits/:Proyecto/:Email', getEmployeeBenefitsByEmail);
router.get('/offeredBenefits/:Proyecto/:Email', getOfferedBenefits);
router.post('/benefits', createBenefit);
router.put('/benefits/:NombreAntiguo', updateBenefit);

//VoluntaryDeductions
router.get('/volDeductions/:NombreProyecto', getVolDeductions);
router.get('/volDeductions/:NombreProyecto/:Nombre', getVolDeductionsByName);
router.post('/volDeductions', createNewVolDeduction);
router.put('/volDeductions/:NombreAntiguo', updateVolDeduction);



export default router;