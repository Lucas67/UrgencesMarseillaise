import {IUser} from '../models/user';
import CaserneModel from '../models/caserne';
import {Caserne} from './Caserne';
import CaserneManager from '../services/CaserneManager';


export class Pompier {
    private data : IUser;

    constructor(data: IUser) {
        this.data = data;
    }

get Username() {
    return this.data.username;
}

get Email() {
    return this.data.email;
}

get CaserneName() {
    return this.data.caserneName;
}
get grade() {
    return this.data.grade;
}

get status() {
    return this.data.status;
}

changerStatus(newStatus: string) {
    this.data.status = newStatus;
}

changerCaserne(newCaserne: string) {
    this.data.caserneName = newCaserne;
}

changerGrade(newGrade: string) {
    this.data.grade = newGrade;
}

async AssignerPremiereCaserne() {
    const caserne = await CaserneManager.getCaserneMiniEffectif();
    this.data.caserneName = caserne.name;
}

async save() {
    await this.data.save();
}

toJSON(){

    return {
        username: this.data.username,
        email: this.data.email,
        caserneName: this.data.caserneName,
        grade: this.data.grade,
        status: this.data.status,
    };
}

}

export default Pompier;