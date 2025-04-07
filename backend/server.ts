import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/profile';
import profilesRoutes from './routes/profile';

const app: Application = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO as string)
    .then(() => console.log("Connexion réussie à la base de données"))
    .catch((err) => console.error("Erreur de connexion à la base de données", err));

const PORT = process.env.LISTEN_PORT || 3000;
app.use('/auth',authRoutes);
app.use('/profile',profilesRoutes);

server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
