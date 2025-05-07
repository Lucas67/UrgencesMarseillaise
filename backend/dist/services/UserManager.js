"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const User_1 = require("../core/User");
const prismaClient_1 = require("../prismaClient");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
function hashPassword(password) {
    return bcryptjs_1.default.hash(password, 12);
}
function comparePassword(password, hash) {
    return bcryptjs_1.default.compare(password, hash);
}
function generateToken(User) {
    return jsonwebtoken_1.default.sign({
        id: User.id
    }, process.env.SECRET_KEY, { expiresIn: '1h' });
}
class UserManager {
    static async CreateUser(username, email, password, dateNaissance) {
        const [userUsername, userEmail] = await Promise.all([
            prismaClient_1.prisma.user.findUnique({ where: { username } }),
            prismaClient_1.prisma.user.findUnique({ where: { email } })
        ]);
        if (userUsername) {
            throw new Error(`Nom d'utilisateur déjà utilisé !`);
        }
        if (userEmail) {
            throw new Error('E-mail déjà utilisé !');
        }
        if (!validator_1.default.isEmail(email)) {
            throw new Error('E-mail non valide ! Merci de réessayer');
        }
        if (!validator_1.default.isDate(dateNaissance)) {
            throw new Error('Format de date invalide');
        }
        const dateNaissanceObject = new Date(dateNaissance);
        const hashedPassword = await hashPassword(password);
        const user = new User_1.User(username, email, hashedPassword, new Date(dateNaissance));
        const userCreated = await prismaClient_1.prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: user.password,
                dateNaissance: user.dateNaissance,
                money: user.money
            }
        });
        return generateToken(user);
    }
    static async LoginUser(username, password) {
        const userData = await prismaClient_1.prisma.user.findUnique({ where: { username } });
        if (!userData) {
            throw new Error('Identifiants incorrects !');
        }
        const pompier = new User_1.User(userData.username, userData.email, userData.password, userData.dateNaissance);
        pompier.id = userData.id;
        const isPasswordValid = await comparePassword(password, pompier.password);
        if (!isPasswordValid) {
            throw new Error('Identifiants incorrects !');
        }
        return generateToken(pompier);
    }
    static async checkAuth(token) {
        if (!token) {
            throw new Error('Token manquant !');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const pompierData = await prismaClient_1.prisma.user.findUnique({ where: { id: decoded.id } });
        if (!pompierData) {
            throw new Error('Utilisateur non trouvé !');
        }
        const pompier = new User_1.User(pompierData.username, pompierData.email, pompierData.password, pompierData.dateNaissance);
        pompier.id = pompierData.id;
        return true;
    }
    static async checkUsername(username) {
        console.log(username);
        const user = await prismaClient_1.prisma.user.findUnique({ where: { username } });
        console.log(user);
        if (user?.username) {
            return false;
        }
        return true;
    }
}
exports.UserManager = UserManager;
