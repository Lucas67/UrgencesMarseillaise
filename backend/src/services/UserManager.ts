import {Pompier} from '../core/Pompier';
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
function generateToken(pompier: Pompier): string {
    return jwt.sign({
        id: pompier.id,
        username: pompier.username,
        grade: pompier.grade,
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
    
        const hashedPassword = await hashPassword(password);
        const pompierCreated = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                dateNaissance: dateNaissance,
                caserneId: 1, // TODO : Affecter caserne la moins peuplée 
                grade: 'Matelot',
                status: 'Au repos',
            }
        })

        const pompier = new Pompier(username, email, hashedPassword, pompierCreated.caserneId, 'Matelot', 'Au repos',pompierCreated.dateNaissance);
        pompier.id = pompierCreated.id;

        return generateToken(pompier);
    }

    static async LoginUser(username: string, password: string): Promise<string> {
        const userData = await prisma.user.findUnique({ where: { username } });
        if (!userData) {
            throw new Error('Identifiants incorrects !');
        }

        const pompier = new Pompier(userData.username,userData.email,userData.password,userData.caserneId,userData.grade,userData.status,userData.dateNaissance);
        pompier.id = userData.id;
        
        const isPasswordValid = await comparePassword(password, pompier.password);
        if(!isPasswordValid) {
            throw new Error('Identifiants incorrects !');
        }

        return generateToken(pompier);
    }

    static async checkAuth(token: string): Promise<Pompier> {
        if(!token) {
            throw new Error('Token manquant !');
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: number, username: string, grade: string };
        const pompierData = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!pompierData) {
            throw new Error('Utilisateur non trouvé !');
        }

        const pompier = new Pompier(pompierData.username, pompierData.email, pompierData.password, pompierData.caserneId, pompierData.grade, pompierData.status,pompierData.dateNaissance);
        pompier.id = pompierData.id;

        return pompier;
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

    static async LoadPompier(id: number): Promise<Pompier> {
        const user = await prisma.user.findUnique({where: {id},
        include: {
            caserne: {
                include: {
                    vehicules: true,
                }
            } // Inclure la relation avec la caserne
        }});
        if (!user) {
            throw new Error('Pompier non trouvé !');
        }

        const pompier = new Pompier(user.username, user.email, user.password, user.caserneId, user.grade, user.status,user.dateNaissance);
        pompier.id = user.id;
        pompier.caserne = user.caserne; // Assigner la caserne à l'objet pompier
        return pompier
    }
}
