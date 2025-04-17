"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caserne = void 0;
const Vehicule_1 = require("./Vehicule");
const CaserneManager_1 = __importDefault(require("../services/CaserneManager"));
class Caserne {
    constructor(data) {
        this.data = data;
    }
    get name() {
        return this.data.name;
    }
    get groupement() {
        return this.data.groupement;
    }
    get effectifAct() {
        return this.data.effectifAct;
    }
    get maxEffectif() {
        return this.data.maxEffectif;
    }
    get isFull() {
        return this.effectifAct >= this.maxEffectif;
    }
    async getVehiculeCaserne() {
        const vehicules = await CaserneManager_1.default.getVehiculeCaserne(this.data.name);
        return vehicules.map(vehicule => new Vehicule_1.Vehicule(vehicule));
    }
}
exports.Caserne = Caserne;
