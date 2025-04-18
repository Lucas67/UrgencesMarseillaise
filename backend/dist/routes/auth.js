"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
const user_1 = __importDefault(require("../models/user"));
const Pompier_1 = __importDefault(require("../core/Pompier"));
const router = (0, express_1.Router)();
// 📌 REGISTER
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const [userUsername, userEmail] = await Promise.all([
            user_1.default.findOne({ username }),
            user_1.default.findOne({ email }),
        ]);
        if (userUsername) {
            return res.status(409).json({ status: 'error', message: `Nom d'utilisateur déjà utilisé !` });
        }
        if (userEmail) {
            return res.status(409).json({ status: 'error', message: 'E-mail déjà utilisé !' });
        }
        if (!validator_1.default.isEmail(email)) {
            return res.status(400).json({ status: 'error', message: 'E-mail non valide ! Merci de réessayer' });
        }
        const user = new user_1.default({ username: username, password: password, email: email });
        const Pompier = new Pompier_1.default(user);
        // Affecter caserne la plus vide
        await Pompier.AssignerPremiereCaserne();
        Pompier.changerGrade('Matelot');
        Pompier.changerStatus('Au repos');
        Pompier.save();
        return res.status(200).json({ message: 'Inscription réussie !' });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Erreur inconnue du serveur' });
    }
});
// 📌 LOGIN
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await user_1.default.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Identifiants incorrects !' });
        }
        const token = user.generateToken();
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
        });
        return res.status(200).json({ message: 'Connexion réussie !' });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: 'Erreur inconnue' });
    }
});
// 📌 LOGOUT
router.post('/logout', (_req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
        });
        return res.status(200).json({ message: 'Déconnexion réussie !' });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Erreur lors de la déconnexion :', err.message);
            return res.status(500).json({ message: 'Erreur serveur', error: err.message });
        }
        return res.status(500).json({ message: 'Erreur inconnue' });
    }
});
// 📌 CHECK AUTH
router.get('/checkAuth', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Non authentifié' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (typeof decoded !== 'object' || decoded === null || !('id' in decoded)) {
            return res.status(401).json({ message: 'Token invalide ou expiré' });
        }
        const user = await user_1.default.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé !' });
        }
        return res.status(200).json({
            user: {
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ message: 'Token invalide ou expiré', error: err.message });
        }
        return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
});
// 📌 CHECK USERNAME
router.get('/checkUsername/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await user_1.default.findOne({ username });
        if (user) {
            return res.status(409).json({ available: false });
        }
        return res.status(200).json({ available: true });
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: 'Erreur serveur', error: err.message });
        }
        return res.status(500).json({ message: 'Erreur serveur inconnue' });
    }
});
exports.default = router;
