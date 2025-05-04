import { Router } from 'express';
import { UserController } from '../controllers/userControllers';
import {auth, Authenticated} from '../middleware/authMiddleware';
import caserneController from '../controllers/caserneControllers';
const router = Router();


router.get('/:id', caserneController.getCaserne);

export default router;