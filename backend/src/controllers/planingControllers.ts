import { Request, Response } from 'express';
import { UserManager } from '../services/UserManager';
import { Authenticated } from '../middleware/authMiddleware';
import { PlanningManager,dateWeek } from '../services/PlanningManager';

export class planningController {

    static async debloquerPlanning(req: Authenticated, res: Response) {
        const pompierId = req.user?.id;
        const {annee,nrSemaine} = req.body;

        const anneeAct = new Date().getFullYear();
        const semaineAct = dateWeek(new Date());
        if(nrSemaine > semaineAct + 3 || nrSemaine < semaineAct || anneeAct !== annee ) {
            throw new Error ("Impossible de débloquer un planning passé/future (+ 3 semaines)");
        }

        if(!pompierId || !annee || !nrSemaine) {
            throw new Error("Paramétres manquants !");
        }

        try {
            await PlanningManager.DebloquerPlanning(pompierId,annee,nrSemaine);
            return res.status(200).json({ message: 'Planning débloqué !' });
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    static async AjouterHeure(req:Authenticated, res:Response) {
        const {pompierId,annee,semaine,jour,heure,status} = req.body;

        if(!pompierId || !jour || !heure || !status) {
            return res.status(400).json({ message: 'Paramètres manquants !' });
        }

        try {
            await PlanningManager.AjouterHeure(pompierId,jour,heure,status,annee,semaine);
            return res.status(200).json({ message: 'Heure ajoutée !' });
        } catch(err:any) {
            return res.status(500).json({message: err.message});
        }
    }

    static async RetirerHeure(req:Authenticated, res:Response) {
        const {pompierId,jour,heure} = req.body;

        if(!pompierId || !jour || !heure) {
            return res.status(400).json({message: 'Paramètres manquants !'});
        }

        try {
            await PlanningManager.RetirerHeure(pompierId,jour,heure);
            return res.status(200).json({ message: 'Heure retirée !' });
        } catch(err:any) {
            return res.status(500).json({message: err.message});
        }
    }

    static async getPlanning(req: Authenticated, res: Response) {
        const pompierId = req.user?.id;
        const {annee,semaine} = req.body;

        if(!pompierId) {
            return res.status(400).json({ message: 'ID pompier manquant !' });
        }

        if(isNaN(pompierId)) {
            return res.status(400).json({ message: 'ID pompier invalide !' });
        }

        try {
            const planning = await PlanningManager.getPlanning(pompierId,annee,semaine);
            return res.status(200).json(planning);
        } catch (err:any) {
            return res.status(500).json({ message: err.message });
        }
    }
    
}