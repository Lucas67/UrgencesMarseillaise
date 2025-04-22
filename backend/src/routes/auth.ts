import {Router} from 'express';
import { UserController } from '../controllers/userControllers';
import {auth} from '../middleware/authMiddleware';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/checkAuth',auth, UserController.checkAuth);
router.get('/checkUsername/:username', UserController.checkUsername);

export default router;