"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehiculeCaserne = getVehiculeCaserne;
exports.getCaserneMiniEffectif = getCaserneMiniEffectif;
const caserne_1 = __importDefault(require("../models/caserne"));
const user_1 = __importDefault(require("../models/user"));
const MAX_EFFECTIF = 45;
async function getVehiculeCaserne(name) {
    const caserne = await caserne_1.default
        .findById(name)
        .populate('vehicules')
        .exec();
    if (!caserne || !caserne.vehicules) {
        return [];
    }
    return caserne.vehicules;
}
async function getCaserneMiniEffectif() {
    const caserne = await caserne_1.default.find();
    const caserneAcvecEffectif = await Promise.all(caserne.map(async (caserne) => {
        const count = await user_1.default.countDocuments({ caserneName: caserne.name });
        return { caserne, count };
    }));
    const caserneDispo = caserneAcvecEffectif.filter(effectif => effectif.count < MAX_EFFECTIF);
    const caserneMiniEffectif = caserneDispo.sort((a, b) => a.count - b.count)[0];
    return caserneMiniEffectif.caserne;
}
exports.default = {
    getVehiculeCaserne,
    getCaserneMiniEffectif
};
