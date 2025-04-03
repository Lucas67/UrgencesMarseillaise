
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');


const app = express();

const server = http.createServer(app);


app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO, {
})

.then(() => console.log("Connexion réussie à la base de données"))
.catch(() => console.error("Erreur de connexion à la base de données"));

const PORT = process.env.LISTEN_PORT;

app.use('/auth',authRoutes); // Gère les routes d'authenfication
app.use('/profile',profileRoutes);


server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});




