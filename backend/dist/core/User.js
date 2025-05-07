"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, email, password, dateNaissance, money = 100000) {
        this._username = username;
        this._email = email;
        this._password = password;
        this._dateNaissance = dateNaissance;
        this._money = money;
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
    get password() {
        return this._password;
    }
    set password(password) {
        this._password = password;
    }
    get money() {
        return this._money;
    }
    set money(money) {
        this._money = money;
    }
    get dateNaissance() {
        return this._dateNaissance;
    }
    set dateNaissance(dateNaissance) {
        this._dateNaissance = dateNaissance;
    }
}
exports.User = User;
exports.default = User;
