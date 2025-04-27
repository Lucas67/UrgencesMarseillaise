import { Router } from 'express';
import { UserController } from '../controllers/userControllers';
import {auth, Authenticated} from '../middleware/authMiddleware';

const router = Router();


router.get('/',auth, UserController.LoadProfile);

export default router;