"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicule = void 0;
class Vehicule {
    constructor(type, caserneId) {
        this._id = 0;
        this._type = type;
        this._statut = "disponible"; // Par défaut
        this._latitude = 0;
        this._longitude = 0;
        this._caserneId = caserneId;
    }
    // Getters
    get id() {
        return this._id;
    }
    get type() {
        return this._type;
    }
    get statut() {
        return this._statut;
    }
    get latitude() {
        return this._latitude;
    }
    get longitude() {
        return this._longitude;
    }
    get caserneId() {
        return this._caserneId;
    }
    // Setters
    set id(id) {
        this._id = id;
    }
    set type(type) {
        this._type = type;
    }
    set statut(statut) {
        this._statut = statut;
    }
    set latitude(latitude) {
        this._latitude = latitude;
    }
    set longitude(longitude) {
        this._longitude = longitude;
    }
    set caserneId(caserneId) {
        this._caserneId = caserneId;
    }
}
exports.Vehicule = Vehicule;
exports.default = Vehicule;
