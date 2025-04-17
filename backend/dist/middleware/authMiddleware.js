"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const auth = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({ message: 'Non autorisé' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = await user_1.default.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        req.user = user;
        next();
        return;
    }
    catch (err) {
        return res.status(403).json({ message: "Token invalide ou expiré", error: err.message });
    }
};
exports.auth = auth;
