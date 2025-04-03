const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const [userEmail, userUsername] = await Promise.all([
            User.findOne({ email }),
            User.findOne({ username })
        ]);

        if (userEmail) {
            return res.status(400).json({ message: 'E-mail déjà utilisé !' });
        }
        if (userUsername) {
            return res.status(400).json({ message: `Nom d'utilisateur déjà utilisé !` });
        }

        const newUser = new User({ username, password, email });
        await newUser.save();
        res.status(200).json({ message: 'Inscription réussie !' });

    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
        console.error('Erreur lors du register', err.message);
    }
});

router.post('/login', async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ message: 'Identifiants incorrects !' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Identifiants incorrects !' });
        }

        const token = user.generateToken();

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });

        return res.status(200).json({ message: 'Connexion réussie !' });

    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
        console.error('Erreur lors de la connexion :', err.message);
    }
});

router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            path: '/'
        });
        res.status(200).json({ message: 'Déconnexion réussie !' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
        console.error('Erreur lors de la déconnexion :', err.message);
    }
});

module.exports = router;
