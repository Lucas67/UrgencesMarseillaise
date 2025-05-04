import { Request, Response } from "express";
import CaserneManager from '../services/CaserneManager';

export class caserneController {

    static async getCaserne(req:Request, res:Response) {

        try{

        const caserneId = Number(req.params.id);

        if(isNaN(caserneId)) {
            return res.status(400).json({error: 'Caserne ID invalide'});
        }

        const caserne = await CaserneManager.getInfosCaserne(caserneId);

        return res.status(200).json({caserne});
    } catch(error) {
        return res.status(500).json({error:'Erreur serveur'});
    }
}
}

export default caserneController;