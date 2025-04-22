import Vehicule from "../core/Vehicule";
import {prisma} from "../prismaClient";
import {Caserne} from "../core/Caserne";

export class CaserneManager {
    
    static async getVehiculesByCaserneId(caserneId: number): Promise<Vehicule[]> {
        try {
            const vehicules = await prisma.vehicule.findMany({
                where: {
                    caserneId: caserneId,
                }
            })

            if (!vehicules) {
                throw new Error("No vehicules found for the specified caserneId.");
            }
            const vehiculesReturned = vehicules.map(vehicule => {
                const newVehicule = new Vehicule(vehicule.type, vehicule.caserneId);
                newVehicule.id = vehicule.id;
                newVehicule.statut = vehicule.statut;
                newVehicule.latitude = vehicule.latitude;
                newVehicule.longitude = vehicule.longitude;
                return newVehicule;
            })
            return vehiculesReturned;
        } catch (error) {
            console.error("Error fetching vehicules by caserneId:", error);
            throw new Error("Unable to fetch vehicules for the specified caserne.");    

        }
    }

    static async AjouterVehiculeDansCaserne(vehicule: Vehicule, caserneId: number) {
        try {
            const caserne = await prisma.caserne.findUnique({
                where: {
                    id: caserneId,
                },
                include: {
                    vehicules: true, // Include the vehicules relation
                }
            });
            if(!caserne) {
                throw new Error("Caserne not found.");
            }

            const casernePOO = new Caserne(caserne.name,caserne.groupement,caserne.latitude,caserne.longitude);
            casernePOO.id = caserne.id;
            casernePOO.vehicules = caserne.vehicules.map(vehicule => {
                const newVehicule = new Vehicule(vehicule.type, vehicule.caserneId);
                newVehicule.id = vehicule.id;
                newVehicule.statut = vehicule.statut;
                newVehicule.latitude = vehicule.latitude;
                newVehicule.longitude = vehicule.longitude;
                return newVehicule;
            });

            casernePOO.ajouterVehicule(vehicule);
            await casernePOO.saveToDB();
        } catch (error:any) {
            console.error("Error adding vehicule to caserne:", error);
            throw new Error("Unable to add vehicule to the specified caserne.");
        }
    }
}

export default CaserneManager