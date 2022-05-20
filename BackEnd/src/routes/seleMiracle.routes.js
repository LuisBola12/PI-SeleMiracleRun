import { Router } from "express";
import { createNewUser, getUsers, getUserByEmail,getPeriodos} from "../controllers/users.controller";
import {getEmployees} from '../controllers/employees.contoller'
import { getVolDeductions, createNewVolDeduction } from "../controllers/volDeductions.controller";


const router = Router();
router.get('/users',getUsers);
router.post('/users',createNewUser);
router.get('/users/:Email',getUserByEmail);
// router.get('/periodos',getPeriodos);
// router.delete('/users',getUsers);
// router.put('/users',getUsers);
router.get('/employees',getEmployees);

router.get('/volDeductions/:Proyecto', getVolDeductions);
router.post('/volDeductions/:Proyecto', createNewVolDeduction);
export default router;