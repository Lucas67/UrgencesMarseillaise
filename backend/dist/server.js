"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
// import { Server } from 'socket.io';
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
mongoose_1.default.connect(process.env.MONGO)
    .then(() => console.log("Connexion réussie à la base de données"))
    .catch((err) => console.error("Erreur de connexion à la base de données", err));
const PORT = process.env.LISTEN_PORT || 3000;
app.use('/auth', auth_1.default);
app.use('/profile', profile_1.default);
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
