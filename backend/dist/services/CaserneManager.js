"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaserneManager = void 0;
const prismaClient_1 = require("../prismaClient");
const Caserne_1 = require("../core/Caserne");
class CaserneManager {
    static async getInfosCaserne(caserneId) {
        try {
            const caserneBDD = await prismaClient_1.prisma.caserne.findFirst({
                where: {
                    id: caserneId
                }
            });
            if (!caserneBDD) {
                throw new Error('Caserne inexistante');
            }
            const caserne = new Caserne_1.Caserne(caserneBDD.name, caserneBDD.groupement, caserneBDD.latitude, caserneBDD.longitude);
            return caserne.toJSON();
        }
        catch (error) {
            console.log(error);
            throw new Error('Erreur durant la récupération des informations');
        }
    }
}
exports.CaserneManager = CaserneManager;
exports.default = CaserneManager;
