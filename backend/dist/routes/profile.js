"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.default, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Non authentifié' });
    }
    return res.status(200).json({
        message: "Utilisateur connecté",
        user: req.user
    });
});
exports.default = router;
