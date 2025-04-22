"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planningController = void 0;
const PlanningManager_1 = require("../services/PlanningManager");
class planningController {
    static async debloquerPlanning(req, res) {
        const pompierId = req.user?.id;
        const { annee, nrSemaine } = req.body;
        const anneeAct = new Date().getFullYear();
        const semaineAct = (0, PlanningManager_1.dateWeek)(new Date());
        if (nrSemaine > semaineAct + 3 || nrSemaine < semaineAct || anneeAct !== annee) {
            throw new Error("Impossible de débloquer un planning passé/future (+ 3 semaines)");
        }
        if (!pompierId || !annee || !nrSemaine) {
            throw new Error("Paramétres manquants !");
        }
        try {
            await PlanningManager_1.PlanningManager.DebloquerPlanning(pompierId, annee, nrSemaine);
            return res.status(200).json({ message: 'Planning débloqué !' });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    static async AjouterHeure(req, res) {
        const { pompierId, annee, semaine, jour, heure, status } = req.body;
        if (!pompierId || !jour || !heure || !status) {
            return res.status(400).json({ message: 'Paramètres manquants !' });
        }
        try {
            await PlanningManager_1.PlanningManager.AjouterHeure(pompierId, jour, heure, status, annee, semaine);
            return res.status(200).json({ message: 'Heure ajoutée !' });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    static async RetirerHeure(req, res) {
        const { pompierId, jour, heure } = req.body;
        if (!pompierId || !jour || !heure) {
            return res.status(400).json({ message: 'Paramètres manquants !' });
        }
        try {
            await PlanningManager_1.PlanningManager.RetirerHeure(pompierId, jour, heure);
            return res.status(200).json({ message: 'Heure retirée !' });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    static async getPlanning(req, res) {
        const pompierId = req.user?.id;
        const { annee, semaine } = req.body;
        if (!pompierId) {
            return res.status(400).json({ message: 'ID pompier manquant !' });
        }
        if (isNaN(pompierId)) {
            return res.status(400).json({ message: 'ID pompier invalide !' });
        }
        try {
            const planning = await PlanningManager_1.PlanningManager.getPlanning(pompierId, annee, semaine);
            return res.status(200).json(planning);
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
exports.planningController = planningController;
