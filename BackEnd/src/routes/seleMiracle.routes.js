import { Router } from "express";
import { getProjectsByEmail } from "../controllers/projects.controller";
import { getEmployerByID , getUsers, getUserByEmail, verifyCredentials, registerNewUser } from "../controllers/users.controller";
import { getEmployees, postNewEmployee,getEmployeeByID,verifyEmployeeContractOnProject} from '../controllers/employees.contoller'
import { getVolDeductions, createNewVolDeduction } from "../controllers/volDeductions.controller";
import { getTypeOfContracts } from "../controllers/contracts.controller";
import { getBenefits, createBenefit } from "../controllers/benefits.controller";
import { createNewEmployer, getEmployer } from "../controllers/employer.controller";

const router = Router();

//Users
router.get('/users', getUsers);
router.get('/users/:Email', getUserByEmail);
router.post('/users', verifyCredentials);


//Employer
router.post('/createEmployer', registerNewUser);
router.get('/employer', getEmployer);
// router.get('/employer', createNewEmployer);
router.get('/employer/:Cedula', getEmployerByID);

//Periodos
// router.get('/periodos',getPeriodos);


//Contracts
router.get('/typeContracts',getTypeOfContracts);


//Employees
router.get('/employee/:Proyecto', getEmployees);
router.post('/employee',postNewEmployee);
router.get('/employee/:Cedula', getEmployeeByID);
router.post('/employee/contract',verifyEmployeeContractOnProject);


//Projects
router.get('/projects/:Email', getProjectsByEmail);
// router.post('/projects:User', createNewProjects);


//Benefits
router.get('/benefits/:Proyecto', getBenefits);
router.post('/benefits', createBenefit);


//VoluntaryDeductions
router.get('/volDeductions/:NombreProyecto', getVolDeductions);
router.post('/volDeductions', createNewVolDeduction);



export default router;