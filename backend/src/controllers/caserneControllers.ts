import { Request, Response } from 'express';
import CaserneManager from '../services/CaserneManager';


export const getVehiculesCaserne = async (req:Request, res:Response) => {
    
    try {
        const {name} = req.params;
        const vehicules = await CaserneManager.getVehiculeCaserne(name);

        return res.json(vehicules.map(v => v.toJSON()));
    } catch (error) {
        return res.status(500).json({error: 'Erreur lors de la récupération des véhicules de la caserne'});
    }

}