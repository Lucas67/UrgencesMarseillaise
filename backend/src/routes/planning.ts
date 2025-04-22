import { Router } from 'express';
import { UserController } from '../controllers/userControllers';
import {auth, Authenticated} from '../middleware/authMiddleware';
import {planningController} from '../controllers/planingControllers';

const router = Router();


router.post('/debloquer',auth, planningController.debloquerPlanning);
router.post('/ajouter',auth, planningController.AjouterHeure);
router.post('/retirer',auth, planningController.RetirerHeure);
router.get('/', auth, planningController.getPlanning);

export default router;