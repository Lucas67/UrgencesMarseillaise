
import {User} from './User';
import { prisma } from '../prismaClient';
import { Vehicule } from './Vehicule';


export class Caserne {
  private _id: number;
  private _name: string;
  private _latitude: number;
  private _longitude: number;
  private _vehicules: Vehicule[];

  constructor(name: string,latitude: number, longitude: number) {
    this._id = 0;
    this._name = name;
    this._latitude = latitude;
    this._longitude = longitude;
    this._vehicules = [];
  }

  get id() {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
  get latitude() {
    return this._latitude;
  }
  set latitude(latitude: number) {
    this._latitude = latitude;
  }

  get longitude() {
    return this._longitude;
  }
  set longitude(longitude: number) {
    this._longitude = longitude;
  }
  get vehicules() {
    return this._vehicules;
  }

  set vehicules(vehicules: Vehicule[]) {
    this._vehicules = vehicules;
  }

  ajouterVehicule(vehicule: Vehicule) {
    this._vehicules.push(vehicule);
  }
  supprimerVehicule(idVehicule: number) {
    this._vehicules = this._vehicules.filter(vehicule => vehicule.id !== idVehicule);
  }
  obtenirVehiculeDispo() {
    return this._vehicules.filter(vehicule => vehicule.statut === 'disponible');
  }

}
