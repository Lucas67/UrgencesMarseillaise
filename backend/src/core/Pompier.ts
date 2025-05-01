import bcrypt from 'bcryptjs';
import { prisma } from '../prismaClient'; 
import { Caserne } from '@prisma/client';
import Planning from './Planning';

export class Pompier {
  private _id?: number;
  private _username: string;
  private _email: string;
  private _password: string;
  private _dateNaissance:string;
  private _caserneId: number = 0;
  private _grade: string;
  private _status: string;
  private _caserne?: Caserne;
  private _planning : Planning[];

  constructor(username: string, email: string, password: string, caserneId:number = 0,grade: string = 'Matelot',status = 'Au repos',dateNaissance:string) { 
    this._username = username;
    this._email = email;
    this._password = password;
    this._dateNaissance = dateNaissance;
    this._caserneId = caserneId;
    this._grade = grade;
    this._status = status;
    this._planning = []; 
   }


  get id() {
    return this._id;
  }
  set id(value: number | undefined) {
    this._id = value;
  }

  get username() {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }

  get email() {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  get grade() {
    return this._grade;
  }
  set grade(value: string) {
    this._grade = value;
  }

  get status() {
    return this._status;
  }
  set status(value: string) {
    this._status = value;
  }

  get caserneId() {
    return this._caserneId;
  }
  set caserneId(value: number) {
    this._caserneId = value;
  }
  get password() {
    return this._password;
  }
  set password(password: string) {
    this._password = password;
  }

  get caserne() {
    return this._caserne;
  }
set caserne(caserne: Caserne | undefined) {
    this._caserne = caserne;
  }

get planning(): Planning[] {
  return this._planning;
}
set planning(planning: Planning[]) {
  this.planning = planning;
}
get dateNaissance() {
  return this._dateNaissance;
}
set dateNaissance(dateNaissance:string) {
  this._dateNaissance = dateNaissance;
}

  toJSON() {
    return {
      id: this._id,
      username: this._username,
      email: this._email,
      caserneId: this._caserneId,
      grade: this._grade,
      status: this._status,
    };
}

returnJSONCaserne() {
  return {
    caserne: this._caserne
  }
}

returnJSONPlanning() {
  return {
    planning: this._planning
  }
}

}

export default Pompier;
