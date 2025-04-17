import  {auth, Authenticated} from '../middleware/authMiddleware';
import {Request, Response} from 'express';
import Pompier from '../core/Pompier';
import UserManager from '../services/UserManager';

export const getProfile = async(req: Authenticated, res: Response) => {
    const user = req.user;
    if(!user) {
        return res.status(401).json({message: 'Utilisateur non authentifié !'});
    }
    const pompier = await UserManager.getProfile(user.username);
    if(!pompier) {
        return res.status(404).json({message: 'Pompier non trouvé !'});
    }
    return res.json(pompier.toJSON());
}