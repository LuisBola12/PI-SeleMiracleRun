import { Router } from "express";
import { getProjectsByEmail, createProject } from "../controllers/projects.controller";
import { getEmployerByID, getUsers, getUserByEmail, verifyCredentials, registerNewUser } from "../controllers/users.controller";
import { getEmployees, postNewEmployee, getEmployeeByID, verifyEmployeeContractOnProject } from '../controllers/employees.contoller'
import { getVolDeductions, createNewVolDeduction, getVolDeductionsByName } from "../controllers/volDeductions.controller";
import { getTypeOfContracts } from "../controllers/contracts.controller";
import { getBenefits, createBenefit, getBenefitsByName } from "../controllers/benefits.controller";
import { createNewEmployer, getEmployer } from "../controllers/employer.controller";

const router = Router();

//Users
router.get('/users/:Email', getUserByEmail);
router.post('/users', verifyCredentials);


//Employer
router.post('/createEmployer', registerNewUser);
router.get('/employer/:Cedula', getEmployerByID);

//Periodos
// router.get('/periodos',getPeriodos);


//Contracts
router.get('/typeContracts', getTypeOfContracts);


//Employees
router.get('/employee/:Proyecto', getEmployees);
router.post('/employee', postNewEmployee);
router.get('/employee/:Cedula', getEmployeeByID);
router.post('/employee/contract', verifyEmployeeContractOnProject);


//Projects
router.get('/projects/:Email', getProjectsByEmail);
router.post('/projects', createProject);


//Benefits
router.get('/benefits/:Proyecto', getBenefits);
router.get('/benefits/:Proyecto/:Nombre', getBenefitsByName);
router.post('/benefits', createBenefit);


//VoluntaryDeductions
router.get('/volDeductions/:NombreProyecto', getVolDeductions);
router.get('/volDeductions/:NombreProyecto/:Nombre', getVolDeductionsByName);
router.post('/volDeductions', createNewVolDeduction);



export default router;