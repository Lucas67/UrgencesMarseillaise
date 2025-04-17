"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const caserneSchema = new mongoose_1.Schema({
    name: String,
    groupement: String,
    lattitude: Number,
    longitude: Number,
    effectifAct: Number,
    maxEffectif: Number,
    vehicules: ({ type: mongoose_1.Schema.Types.ObjectId, ref: 'Vehicule' })
});
exports.default = (0, mongoose_1.model)('Caserne', caserneSchema);
