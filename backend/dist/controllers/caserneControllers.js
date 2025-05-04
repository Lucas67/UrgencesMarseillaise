"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.caserneController = void 0;
const CaserneManager_1 = __importDefault(require("../services/CaserneManager"));
class caserneController {
    static async getCaserne(req, res) {
        try {
            const caserneId = Number(req.params.id);
            if (isNaN(caserneId)) {
                return res.status(400).json({ error: 'Caserne ID invalide' });
            }
            const caserne = await CaserneManager_1.default.getInfosCaserne(caserneId);
            return res.status(200).json({ caserne });
        }
        catch (error) {
            return res.status(500).json({ error: 'Erreur serveur' });
        }
    }
}
exports.caserneController = caserneController;
exports.default = caserneController;
