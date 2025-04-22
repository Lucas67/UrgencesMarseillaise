import { Router } from 'express';
import { UserController } from '../controllers/userControllers';
import {auth, Authenticated} from '../middleware/authMiddleware';
import { User } from 'discord.js';

const router = Router();


router.get('/',auth, UserController.LoadProfile);

export default router;