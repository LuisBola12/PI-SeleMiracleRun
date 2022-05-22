import { Router } from "express";
import { getProjectsByEmail } from "../controllers/projects.controller";
import { getEmployerByID , getUsers, getUserByEmail, verifyCredentials, registerNewUser, verifyUser } from "../controllers/users.controller";
import { getEmployees } from '../controllers/employees.contoller'
import { getVolDeductions, createNewVolDeduction } from "../controllers/volDeductions.controller";
import { getBenefits, createBenefit } from "../controllers/benefits.controller";
import { createNewEmployer, getEmployer } from "../controllers/employer.controller";

const router = Router();
router.get('/users', getUsers);
// router.post('/users/CreateUser', createNewUser);
router.post('/createEmployer', registerNewUser);
router.get('/users/:Email', getUserByEmail);
router.post('/users', verifyCredentials);
router.get('/employer', getEmployer);
router.get('/employer', createNewEmployer);
router.get('/employer/:Cedula', getEmployerByID);
// router.get('/periodos',getPeriodos);
// router.delete('/users',getUsers);
// router.put('/users',getUsers);
router.get('/employees', getEmployees);
router.get('/projects/:Email', getProjectsByEmail);
// router.post('/projects:User', createNewProjects);
router.get('/benefits/:Proyecto', getBenefits);
router.post('/benefits', createBenefit);
router.get('/volDeductions/:Proyecto', getVolDeductions);
router.post('/volDeductions/:Proyecto', createNewVolDeduction);
export default router;