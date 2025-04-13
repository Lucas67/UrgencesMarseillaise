import {Router, Request, Response} from 'express';
import auth from '../middleware/authMiddleware';
import {IUser} from '../models/user';

const router = Router();

interface Authenticated extends Request {
    user?: IUser;
}

router.get('/',auth,async(req: Authenticated, res: Response) => {

    if(!req.user) {
     return res.status(401).json({message: 'Non authentifié'});
    }

    return res.status(200).json({
        message: "Utilisateur connecté",
        user: req.user
    });


});

export default router;