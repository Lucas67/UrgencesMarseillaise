"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehiculesCaserne = void 0;
const CaserneManager_1 = __importDefault(require("../services/CaserneManager"));
const getVehiculesCaserne = async (req, res) => {
    try {
        const { name } = req.params;
        const vehicules = await CaserneManager_1.default.getVehiculeCaserne(name);
        return res.json(vehicules.map(v => v.toJSON()));
    }
    catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la récupération des véhicules de la caserne' });
    }
};
exports.getVehiculesCaserne = getVehiculesCaserne;
