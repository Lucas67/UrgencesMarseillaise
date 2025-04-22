import {prisma} from '../prismaClient';
import {Planning,statusPompier} from '../core/Planning'

function dateWeek(a?: Date): number {
    const d = a ? new Date(a) : new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const w = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d.getTime() - w.getTime()) / 86400000 - 3 + (w.getDay() + 6) % 7) / 7);
}


export class PlanningManager {

    static async DebloquerPlanning(pompierId: number,annee:number,semaine:number) {
        
     const planningRecord = await prisma.planning.findFirst({
        where: {
            pompierId: pompierId,
            annee: annee,
            nrSemaine: semaine
        }
     })

     if(planningRecord) {
        throw new Error('Planning déjà débloqué ! ');
        return;
     }

     const PompierPlanning = new Planning(pompierId, annee, semaine)
     PompierPlanning.debloquerPlanning();

     await prisma.planning.create({
        data: {
            pompierId: PompierPlanning.pompierId,
            annee: PompierPlanning.annee,
            nrSemaine: PompierPlanning.nrSemaine,
            data: PompierPlanning.planningSlots

        }
     });
    }
    static async AjouterHeure(pompierId:number,jour:string,heure:number,status:statusPompier,annee:number,nrSemaine:number) {

    const fullDate = new Date();
    const anneeAct = new Date().getFullYear();
    const semaine = dateWeek(fullDate); 

    if(annee !== anneeAct || nrSemaine < semaine) {
        throw new Error('Impossible de modifier un planning passé !');
    }
    console.log({pompierId,annee,nrSemaine});
    const planningRecord = await prisma.planning.findFirst({
            where: {
                pompierId: pompierId,
                annee: annee,
                nrSemaine: nrSemaine,
            }
        });

        console.log(planningRecord);

        if(!planningRecord?.pompierId) {
            throw new Error('Planning non débloqué !');
        }

        const planning = Planning.importFromJSON({
            pompierId: planningRecord.pompierId,
            annee: planningRecord.annee,
            nrSemaine: planningRecord.nrSemaine,
            planningSlots: planningRecord.data,
        });

        planning.AjouterHeure(jour,heure,status);

        await prisma.planning.update({
            where: {
                id: planningRecord.id
            },
            data: {
                data: planning.planningSlots
            }
        });

    }

    static async RetirerHeure(pompierId:number,jour:string,heure:number) {
        const fullDate = new Date();
        const annee = new Date().getFullYear();
        const semaine = dateWeek(fullDate); 
    
        const planningRecord = await prisma.planning.findFirst({
                where: {
                    pompierId: pompierId,
                    annee: annee,
                    nrSemaine: semaine
                }
            });
    
            if(!planningRecord) {
                throw new Error('Planning non débloqué !');
            }
    
            const planning = Planning.importFromJSON({
                pompierId: planningRecord.pompierId,
                annee: planningRecord.annee,
                nrSemaine: planningRecord.nrSemaine,
                planningSlots: planningRecord.data,
            });
            

            planning.RetirerHeure(jour,heure);

            await prisma.planning.update({
                where: {
                    id: planningRecord.id
                }, data: {
                    data: planning.planningSlots
                }
            });
    }
    static async getPlanning(pompierId:number,annee:number,nrSemaine:number) {
        const planningRecord = await prisma.planning.findFirst({
            where: {
                pompierId: pompierId,
                annee: Number(annee),
                nrSemaine: Number(nrSemaine)
            }
        });

        if(!planningRecord) {
            throw new Error(`Planning inexistant pour la semaine ${nrSemaine} de l'année ${annee}`);
        }

        const planning = Planning.importFromJSON({
            pompierId: planningRecord.pompierId,
            annee: planningRecord.annee,
            nrSemaine: planningRecord.nrSemaine,
            planningSlots: planningRecord.data
        });

        return planning;
    }
}

export default PlanningManager;
export {dateWeek};