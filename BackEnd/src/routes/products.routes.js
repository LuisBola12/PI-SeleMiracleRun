import { Router } from "express";
import { createNewUser, getUsers, getUserByEmail} from "../controllers/users.controller";


const router = Router();
router.get('/users',getUsers);
router.post('/users',createNewUser);
router.get('/users/:id',getUserByEmail);
router.delete('/users',getUsers);
router.put('/users',getUsers);

export default router;