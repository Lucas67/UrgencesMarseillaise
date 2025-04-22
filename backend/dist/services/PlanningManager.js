"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanningManager = void 0;
exports.dateWeek = dateWeek;
const prismaClient_1 = require("../prismaClient");
const Planning_1 = require("../core/Planning");
function dateWeek(a) {
    const d = a ? new Date(a) : new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const w = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d.getTime() - w.getTime()) / 86400000 - 3 + (w.getDay() + 6) % 7) / 7);
}
class PlanningManager {
    static async DebloquerPlanning(pompierId, annee, semaine) {
        const planningRecord = await prismaClient_1.prisma.planning.findFirst({
            where: {
                pompierId: pompierId,
                annee: annee,
                nrSemaine: semaine
            }
        });
        if (planningRecord) {
            throw new Error('Planning déjà débloqué ! ');
            return;
        }
        const PompierPlanning = new Planning_1.Planning(pompierId, annee, semaine);
        PompierPlanning.debloquerPlanning();
        await prismaClient_1.prisma.planning.create({
            data: {
                pompierId: PompierPlanning.pompierId,
                annee: PompierPlanning.annee,
                nrSemaine: PompierPlanning.nrSemaine,
                data: PompierPlanning.planningSlots
            }
        });
    }
    static async AjouterHeure(pompierId, jour, heure, status, annee, nrSemaine) {
        const fullDate = new Date();
        const anneeAct = new Date().getFullYear();
        const semaine = dateWeek(fullDate);
        if (annee !== anneeAct || nrSemaine < semaine) {
            throw new Error('Impossible de modifier un planning passé !');
        }
        console.log({ pompierId, annee, nrSemaine });
        const planningRecord = await prismaClient_1.prisma.planning.findFirst({
            where: {
                pompierId: pompierId,
                annee: annee,
                nrSemaine: nrSemaine,
            }
        });
        console.log(planningRecord);
        if (!planningRecord?.pompierId) {
            throw new Error('Planning non débloqué !');
        }
        const planning = Planning_1.Planning.importFromJSON({
            pompierId: planningRecord.pompierId,
            annee: planningRecord.annee,
            nrSemaine: planningRecord.nrSemaine,
            planningSlots: planningRecord.data,
        });
        planning.AjouterHeure(jour, heure, status);
        await prismaClient_1.prisma.planning.update({
            where: {
                id: planningRecord.id
            },
            data: {
                data: planning.planningSlots
            }
        });
    }
    static async RetirerHeure(pompierId, jour, heure) {
        const fullDate = new Date();
        const annee = new Date().getFullYear();
        const semaine = dateWeek(fullDate);
        const planningRecord = await prismaClient_1.prisma.planning.findFirst({
            where: {
                pompierId: pompierId,
                annee: annee,
                nrSemaine: semaine
            }
        });
        if (!planningRecord) {
            throw new Error('Planning non débloqué !');
        }
        const planning = Planning_1.Planning.importFromJSON({
            pompierId: planningRecord.pompierId,
            annee: planningRecord.annee,
            nrSemaine: planningRecord.nrSemaine,
            planningSlots: planningRecord.data,
        });
        planning.RetirerHeure(jour, heure);
        await prismaClient_1.prisma.planning.update({
            where: {
                id: planningRecord.id
            }, data: {
                data: planning.planningSlots
            }
        });
    }
    static async getPlanning(pompierId, annee, nrSemaine) {
        const planningRecord = await prismaClient_1.prisma.planning.findFirst({
            where: {
                pompierId: pompierId,
                annee: Number(annee),
                nrSemaine: Number(nrSemaine)
            }
        });
        if (!planningRecord) {
            throw new Error(`Planning inexistant pour la semaine ${nrSemaine} de l'année ${annee}`);
        }
        const planning = Planning_1.Planning.importFromJSON({
            pompierId: planningRecord.pompierId,
            annee: planningRecord.annee,
            nrSemaine: planningRecord.nrSemaine,
            planningSlots: planningRecord.data
        });
        return planning;
    }
}
exports.PlanningManager = PlanningManager;
exports.default = PlanningManager;
