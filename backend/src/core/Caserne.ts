
import { Pompier } from '../core/Pompier';
import { prisma } from '../prismaClient';
import { Vehicule } from './Vehicule';


export class Caserne {
  private _id: number;
  private _name: string;
  private _groupement: string;
  private _latitude: number;
  private _longitude: number;
  private _maxEffectif: number;
  private _vehicules: Vehicule[];
  private _users: Pompier[];

  constructor(name: string, groupement: string, latitude: number, longitude: number) {
    this._id = 0;
    this._name = name;
    this._groupement = groupement;
    this._latitude = latitude;
    this._longitude = longitude;
    this._vehicules = []; // ✅ Toujours initialiser
    this._users = []; 
    this._maxEffectif = 0;    // ✅ Toujours initialiser
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

  get groupement() {
    return this._groupement;
  }
  set groupement(groupement: string) {
    this._groupement = groupement;
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

  get users() {
    return this._users;
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
  obtenirEffectifAct() {
    return this._users.length;
  }
  
  async saveToDB() {
    const update = await prisma.caserne.update({
      where: {
        id: this._id
      },
      data: {
        name: this._name,
        groupement: this._groupement,
        latitude: this._latitude,
        longitude: this._longitude,
        maxEffectif: this._maxEffectif,
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
  


}
