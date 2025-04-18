import { Router } from 'express';
import { getProfile } from '../controllers/pompierController';
import {auth, Authenticated} from '../middleware/authMiddleware';

const router = Router();


router.get('/',auth, getProfile);

export default router;