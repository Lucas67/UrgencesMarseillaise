"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
exports.changerStatus = changerStatus;
const user_1 = __importDefault(require("../models/user"));
const Pompier_1 = require("../core/Pompier");
async function getProfile(name) {
    const doc = await user_1.default.findOne({ username: name });
    if (!doc)
        return null;
    return new Pompier_1.Pompier(doc);
}
async function changerStatus(name, newStatus) {
    const doc = await user_1.default.findOne({ username: name });
    if (!doc) {
        return false;
    }
    const pompier = new Pompier_1.Pompier(doc);
    pompier.changerStatus(newStatus);
    await pompier.save();
    return true;
}
exports.default = {
    getProfile,
    changerStatus
};
