import Vehicule from "../core/Vehicule";
import {prisma} from "../prismaClient";
import {Caserne} from "../core/Caserne";

export class CaserneManager {
    
    static async getInfosCaserne(caserneId: number): Promise<any> {
        try {
           const caserneBDD = await prisma.caserne.findFirst({
            where: {
                id: caserneId as number
            }
           })

           if(!caserneBDD) {
            throw new Error ('Caserne inexistante');
           }

           const caserne = new Caserne(caserneBDD.name,caserneBDD.groupement,caserneBDD.latitude,caserneBDD.longitude);
           return caserne.toJSON();
        } catch(error) {
            console.log(error);
            throw new Error ('Erreur durant la récupération des informations');
        }
    }

 
}

export default CaserneManager