"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicule = void 0;
class Vehicule {
    constructor(data) {
        this.data = data;
    }
    get statut() {
        return this.data.statut;
    }
    UpdateStatut(newStatus) {
        this.data.statut = newStatus;
    }
    async save() {
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
exports.Vehicule = Vehicule;
