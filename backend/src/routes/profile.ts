import { Router } from 'express';
import { getProfile } from '../controllers/pompierController';
import auth from './auth';

const router = Router();


router.get('/profile',auth, getProfile);

export default router;