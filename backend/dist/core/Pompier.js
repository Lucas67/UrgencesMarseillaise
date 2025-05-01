"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pompier = void 0;
class Pompier {
    constructor(username, email, password, caserneId = 0, grade = 'Matelot', status = 'Au repos', dateNaissance) {
        this._caserneId = 0;
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
    set id(value) {
        this._id = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get grade() {
        return this._grade;
    }
    set grade(value) {
        this._grade = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get caserneId() {
        return this._caserneId;
    }
    set caserneId(value) {
        this._caserneId = value;
    }
    get password() {
        return this._password;
    }
    set password(password) {
        this._password = password;
    }
    get caserne() {
        return this._caserne;
    }
    set caserne(caserne) {
        this._caserne = caserne;
    }
    get planning() {
        return this._planning;
    }
    set planning(planning) {
        this.planning = planning;
    }
    get dateNaissance() {
        return this._dateNaissance;
    }
    set dateNaissance(dateNaissance) {
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
        };
    }
    returnJSONPlanning() {
        return {
            planning: this._planning
        };
    }
}
exports.Pompier = Pompier;
exports.default = Pompier;
