"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
router.get("/", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé !' });
        }
        res.status(200).json({
            message: 'Profil joueur',
            user: {
                username: user.username,
                email: user.email
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur du serveur', error: err.message });
    }
}));
// A PREVOIR : Modification de profil + suppression de profil !
module.exports = router;
