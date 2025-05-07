import {User} from '../core/User';
import CaserneManager from './CaserneManager';
import {prisma} from '../prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}
function comparePassword(password:string, hash:string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}
function generateToken(User: User): string {
    return jwt.sign({
        id: User.id
    },process.env.SECRET_KEY as string,{expiresIn: '1h'});
}

export class UserManager {
    
    static async CreateUser(username: string, email: string, password:string,dateNaissance:string): Promise<string> {

        const [userUsername, userEmail] = await Promise.all([
          prisma.user.findUnique({ where: { username } }),
          prisma.user.findUnique({ where: { email } })
        ]);
    
        if (userUsername) {
          throw new Error(`Nom d'utilisateur déjà utilisé !`);
        }
    
        if (userEmail) {
          throw new Error('E-mail déjà utilisé !');

        }
    
        if (!validator.isEmail(email)) {
          throw new Error('E-mail non valide ! Merci de réessayer');
        }
        if(!validator.isDate(dateNaissance)) {
            throw new Error('Format de date invalide');
        }

        const dateNaissanceObject = new Date(dateNaissance);
        const hashedPassword = await hashPassword(password);
        const user = new User(username,email,hashedPassword,new Date(dateNaissance))
        const userCreated = await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: user.password,
                dateNaissance: user.dateNaissance,
                money: user.money
            }
        })

        return generateToken(user);
    }

    static async LoginUser(username: string, password: string): Promise<string> {
        const userData = await prisma.user.findUnique({ where: { username } });
        if (!userData) {
            throw new Error('Identifiants incorrects !');
        }

        const pompier = new User(userData.username,userData.email,userData.password,userData.dateNaissance);
        pompier.id = userData.id;
        
        const isPasswordValid = await comparePassword(password, pompier.password);
        if(!isPasswordValid) {
            throw new Error('Identifiants incorrects !');
        }

        return generateToken(pompier);
    }

    static async checkAuth(token: string): Promise<boolean> {
        if(!token) {
            throw new Error('Token manquant !');
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: number, username: string, grade: string };
        const pompierData = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!pompierData) {
            throw new Error('Utilisateur non trouvé !');
        }

        const pompier = new User(pompierData.username, pompierData.email, pompierData.password,pompierData.dateNaissance);
        pompier.id = pompierData.id;

        return true;
    }

    static async checkUsername(username: string): Promise<boolean> {
        console.log(username);
        const user = await prisma.user.findUnique({ where: { username } });
        console.log(user);
        if(user?.username) {
            return false;
        }
        return true;
    }
}
