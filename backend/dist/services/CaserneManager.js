"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaserneManager = void 0;
const Vehicule_1 = __importDefault(require("../core/Vehicule"));
const prismaClient_1 = require("../prismaClient");
const Caserne_1 = require("../core/Caserne");
class CaserneManager {
    static async getVehiculesByCaserneId(caserneId) {
        try {
            const vehicules = await prismaClient_1.prisma.vehicule.findMany({
                where: {
                    caserneId: caserneId,
                }
            });
            if (!vehicules) {
                throw new Error("No vehicules found for the specified caserneId.");
            }
            const vehiculesReturned = vehicules.map(vehicule => {
                const newVehicule = new Vehicule_1.default(vehicule.type, vehicule.caserneId);
                newVehicule.id = vehicule.id;
                newVehicule.statut = vehicule.statut;
                newVehicule.latitude = vehicule.latitude;
                newVehicule.longitude = vehicule.longitude;
                return newVehicule;
            });
            return vehiculesReturned;
        }
        catch (error) {
            console.error("Error fetching vehicules by caserneId:", error);
            throw new Error("Unable to fetch vehicules for the specified caserne.");
        }
    }
    static async AjouterVehiculeDansCaserne(vehicule, caserneId) {
        try {
            const caserne = await prismaClient_1.prisma.caserne.findUnique({
                where: {
                    id: caserneId,
                },
                include: {
                    vehicules: true, // Include the vehicules relation
                }
            });
            if (!caserne) {
                throw new Error("Caserne not found.");
            }
            const casernePOO = new Caserne_1.Caserne(caserne.name, caserne.groupement, caserne.latitude, caserne.longitude);
            casernePOO.id = caserne.id;
            casernePOO.vehicules = caserne.vehicules.map(vehicule => {
                const newVehicule = new Vehicule_1.default(vehicule.type, vehicule.caserneId);
                newVehicule.id = vehicule.id;
                newVehicule.statut = vehicule.statut;
                newVehicule.latitude = vehicule.latitude;
                newVehicule.longitude = vehicule.longitude;
                return newVehicule;
            });
            casernePOO.ajouterVehicule(vehicule);
            await casernePOO.saveToDB();
        }
        catch (error) {
            console.error("Error adding vehicule to caserne:", error);
            throw new Error("Unable to add vehicule to the specified caserne.");
        }
    }
}
exports.CaserneManager = CaserneManager;
exports.default = CaserneManager;
