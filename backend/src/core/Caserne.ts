
import { Vehicule } from './Vehicule';
import CaserneManager from '../services/CaserneManager';

export class Caserne {
    private data: ICaserne;

    constructor(data: ICaserne) {
        this.data = data;
    }

get name(): string {
    return this.data.name;
}

get groupement(): string {
    return this.data.groupement;
}

get effectifAct(): number {
    return this.data.effectifAct;
}

get maxEffectif(): number {
    return this.data.maxEffectif;
}

get isFull() : boolean {
    return this.effectifAct >= this.maxEffectif;
}

async getVehiculeCaserne() : Promise<Vehicule[]> {
    const vehicules = await CaserneManager.getVehiculeCaserne(this.data.name);
    return vehicules.map(vehicule => new Vehicule(vehicule));
}

}