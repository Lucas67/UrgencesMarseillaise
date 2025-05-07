"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caserne = void 0;
const prismaClient_1 = require("../prismaClient");
class Caserne {
    constructor(name, latitude, longitude) {
        this._id = 0;
        this._name = name;
        this._latitude = latitude;
        this._longitude = longitude;
        this._vehicules = [];
        // this._users = []; 
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get latitude() {
        return this._latitude;
    }
    set latitude(latitude) {
        this._latitude = latitude;
    }
    get longitude() {
        return this._longitude;
    }
    set longitude(longitude) {
        this._longitude = longitude;
    }
    get vehicules() {
        return this._vehicules;
    }
    set vehicules(vehicules) {
        this._vehicules = vehicules;
    }
    ajouterVehicule(vehicule) {
        this._vehicules.push(vehicule);
    }
    supprimerVehicule(idVehicule) {
        this._vehicules = this._vehicules.filter(vehicule => vehicule.id !== idVehicule);
    }
    obtenirVehiculeDispo() {
        return this._vehicules.filter(vehicule => vehicule.statut === 'disponible');
    }
    async saveToDB() {
        const update = await prismaClient_1.prisma.caserne.update({
            where: {
                id: this._id
            },
            data: {
                name: this._name,
                latitude: this._latitude,
                longitude: this._longitude,
                vehicules: {
                    create: this._vehicules.map(vehicule => ({
                        type: vehicule.type,
                        statut: vehicule.statut,
                        latitude: vehicule.latitude,
                        longitude: vehicule.longitude,
                        caserneId: this._id
                    }))
                }
            }
        });
        return update;
    }
    toJSON() {
        return {
            id: this._id,
            name: this._name,
            latitude: this._latitude,
            longitude: this._longitude
        };
    }
}
exports.Caserne = Caserne;
