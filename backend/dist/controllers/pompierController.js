"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const UserManager_1 = __importDefault(require("../services/UserManager"));
const getProfile = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Utilisateur non authentifié !' });
    }
    const pompier = await UserManager_1.default.getProfile(user.username);
    if (!pompier) {
        return res.status(404).json({ message: 'Pompier non trouvé !' });
    }
    return res.json(pompier.toJSON());
};
exports.getProfile = getProfile;
