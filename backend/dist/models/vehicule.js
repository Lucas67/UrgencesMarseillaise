"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const vehiculeSchema = new mongoose_1.Schema({
    type: String,
    statut: String,
    caserneId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Caserne' }
});
exports.default = (0, mongoose_1.model)('Vehicule', vehiculeSchema);
