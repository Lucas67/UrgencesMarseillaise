"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pompier = void 0;
class Pompier {
    constructor(data) {
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
    changerStatus(newStatus) {
        this.data.status = newStatus;
    }
    changerCaserne(newCaserne) {
        this.data.caserneName = newCaserne;
    }
    changerGrade(newGrade) {
        this.data.grade = newGrade;
    }
    async save() {
        await this.data.save();
    }
    toJSON() {
        return {
            username: this.data.username,
            email: this.data.email,
            caserneName: this.data.caserneName,
            grade: this.data.grade,
            status: this.data.status,
        };
    }
}
exports.Pompier = Pompier;
exports.default = Pompier;
