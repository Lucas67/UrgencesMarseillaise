const express = require('express');
const User = require('../models/user');
const router = express.Router();
const auth = require('../middleware/authMiddleware');


router.get("/",auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        if(!user) {
            return res.status(400).json({message: 'Utilisateur non trouvé !'});
        }

        res.status(200).json({
            message: 'Profil joueur',
            user: {
                username: user.username,
                created: user.email
            }
        });
    } catch(err) {
        res.status(500).json({message: 'Erreur du serveur', error: err.message});
    }
})

module.exports = router;
