import { Router } from "express";
import { getUsers } from "../controllers/users.controller";


const router = Router();
router.get('/usuarios',getUsers);
router.post('/usuarios',getUsers);
router.get('/usuarios',getUsers);
router.delete('/usuarios',getUsers);
router.put('/usuarios',getUsers);

export default router;