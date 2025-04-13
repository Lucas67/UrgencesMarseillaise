import {IVehicule} from '../models/vehicule';

export class Vehicule {
    private data: IVehicule;

    constructor(data: IVehicule) {
        this.data = data;
    }

get statut() {
    return this.data.statut;
}

UpdateStatut(newStatus: string) {
    this.data.statut = newStatus;
}

async save(): Promise<void> {
    await this.data.save();
}

toJSON() {
    return {
        type: this.data.type,
        statut: this.data.statut,
        caserneId: this.data.caserneId,
    };
}

}