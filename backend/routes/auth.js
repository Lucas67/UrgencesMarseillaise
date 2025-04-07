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
const jwt = require('jsonwebtoken');
const validator = require('validator');
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const [userUsername, userEmail] = yield Promise.all([
            User.findOne({ username }),
            User.findOne({ email })
        ]);
        if (userUsername) {
            return res.status(409).json({ status: 'error', message: `Nom d'utilisateur déjà utilisé !` });
        }
        if (userEmail) {
            return res.status(409).json({ status: 'error', message: 'E-mail déjà utilisé !' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ status: 'error', message: 'E-mail non valide ! Merci de réessayer ' });
        }
        const newUser = new User({ username, password, email });
        yield newUser.save();
        res.status(200).json({ message: 'Inscription réussie !' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur du serveur ! Merci de réessayer', error: err.message });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Identifiants incorrects !' });
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Identifiants incorrects !' });
        }
        const token = user.generateToken();
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, 
            sameSite: 'Strict',
        });
        return res.status(200).json({ message: 'Connexion réussie !' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
        console.error('Erreur lors de la connexion :', err.message);
    }
}));
router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            //secure: true,
            sameSite: 'Strict',
            path: '/'
        });
        res.status(200).json({ message: 'Déconnexion réussie !' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
        console.error('Erreur lors de la déconnexion :', err.message);
    }
});
router.get('/checkAuth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Non authentifié' });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = yield User.findById(decoded.id);
        if (!user)
            return res.status(404).json({ message: 'Utilisateur non trouvé !' });
        res.status(200).json({ user: { username: user.username, email: user.email } });
    }
    catch (err) {
        return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
}));
router.get('/checkUsername/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const user = yield User.findOne({ username });
        if (user) {
            return res.status(409).json({ available: false });
        }
        res.status(200).json({ available: true });
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
}));
module.exports = router;
