import bcrypt from 'bcryptjs';
import { prisma } from '../prismaClient'; 
import { Caserne } from '@prisma/client';
export class User {
  private _id?: number;
  private _username: string;
  private _email: string;
  private _password: string;
  private _dateNaissance:Date
  private _money:number

  constructor(username: string, email: string, password: string,dateNaissance:Date, money:number = 100000) { 
    this._username = username;
    this._email = email;
    this._password = password;  
    this._dateNaissance = dateNaissance;
    this._money = money;
   
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
  get password() {
    return this._password;
  }
  set password(password: string) {
    this._password = password;
  }
  get money() {
    return this._money;
  }
  set money(money:number) {
    this._money = money;
  }
get dateNaissance() {
  return this._dateNaissance;
}
set dateNaissance(dateNaissance:Date) {
  this._dateNaissance = dateNaissance;
}
}

export default User;
