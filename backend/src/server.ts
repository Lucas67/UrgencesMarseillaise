import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
// import { Server } from 'socket.io';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import planningRoutes from './routes/planning';

const app: Application = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.LISTEN_PORT || 3000;

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.use('/planning', planningRoutes);

server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
