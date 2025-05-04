"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserManager_1 = require("../services/UserManager");
const axios = require('axios');
class UserController {
    static async register(req, res) {
        const { username, email, password, dateNaissance, tokenCaptcha } = req.body;
        try {
            const SITE_SECRET = process.env.SITE_SECRET;
            const { data } = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${tokenCaptcha}`);
            if (!data.success) {
                return res.status(400).json({ message: `Echec de la vérification du reCAPTCHA` });
            }
            const token = await UserManager_1.UserManager.CreateUser(username, email, password, dateNaissance);
            res.cookie('token', token, UserController.getCookieOptions());
            return res.status(200).json({ message: 'Inscription réussie !' });
        }
        catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
    static getCookieOptions() {
        return {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        };
    }
    static async login(req, res) {
        const { username, password } = req.body;
        try {
            const token = await UserManager_1.UserManager.LoginUser(username, password);
            res.cookie('token', token, UserController.getCookieOptions());
            return res.status(200).json({ message: 'Connexion réussie !' });
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({ message: err.message });
        }
    }
    static logout(_req, res) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                sameSite: 'strict',
                path: '/'
            });
            return res.status(200).json({ message: 'Déconnexion réussie !' });
        }
        catch (err) {
            return res.status(500).json({ message: 'Erreur serveur' });
        }
    }
    static async checkAuth(req, res) {
        try {
            const pompier = await UserManager_1.UserManager.checkAuth(req.cookies.token);
            return res.status(200).json({ pompier });
        }
        catch (err) {
            return res.status(401).json({ message: err.message });
        }
    }
    static async checkUsername(req, res) {
        const { username } = req.params;
        try {
            const available = await UserManager_1.UserManager.checkUsername(username);
            return res.status(200).json({ available });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    static async LoadProfile(req, res) {
        try {
            if (!req.user || !req.user.id) {
                return res.status(404).json({ message: 'Utilisateur non trouvé !' });
            }
            const pompier = await UserManager_1.UserManager.LoadPompier(req.user.id);
            const pompierHeader = {
                username: pompier.username,
                grade: pompier.grade,
                status: pompier.status
            };
            return res.status(200).json({ pompierHeader });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
exports.UserController = UserController;
exports.default = UserController;
