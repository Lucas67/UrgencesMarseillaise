"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const Pompier_1 = require("../core/Pompier");
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
function generateToken(pompier) {
    return jsonwebtoken_1.default.sign({
        id: pompier.id,
        username: pompier.username,
        grade: pompier.grade,
    }, process.env.SECRET_KEY, { expiresIn: '1h' });
}
class UserManager {
    static async CreateUser(username, email, password) {
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
        const hashedPassword = await hashPassword(password);
        const pompierCreated = await prismaClient_1.prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                caserneId: 1, // TODO : Affecter caserne la moins peuplée 
                grade: 'Matelot',
                status: 'Au repos',
            }
        });
        const pompier = new Pompier_1.Pompier(username, email, hashedPassword, pompierCreated.caserneId, 'Matelot', 'Au repos');
        pompier.id = pompierCreated.id;
        return generateToken(pompier);
    }
    static async LoginUser(username, password) {
        const userData = await prismaClient_1.prisma.user.findUnique({ where: { username } });
        if (!userData) {
            throw new Error('Identifiants incorrects !');
        }
        const pompier = new Pompier_1.Pompier(userData.username, userData.email, userData.password, userData.caserneId, userData.grade, userData.status);
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
        const pompier = new Pompier_1.Pompier(pompierData.username, pompierData.email, pompierData.password, pompierData.caserneId, pompierData.grade, pompierData.status);
        pompier.id = pompierData.id;
        return pompier;
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
    static async LoadPompier(id) {
        const user = await prismaClient_1.prisma.user.findUnique({ where: { id },
            include: {
                caserne: {
                    include: {
                        vehicules: true,
                    }
                } // Inclure la relation avec la caserne
            } });
        if (!user) {
            throw new Error('Pompier non trouvé !');
        }
        const pompier = new Pompier_1.Pompier(user.username, user.email, user.password, user.caserneId, user.grade, user.status);
        pompier.id = user.id;
        pompier.caserne = user.caserne; // Assigner la caserne à l'objet pompier
        return pompier;
    }
}
exports.UserManager = UserManager;
