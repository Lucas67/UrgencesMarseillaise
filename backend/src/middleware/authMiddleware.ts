import {Request, Response, NextFunction} from 'express';
import {User} from '../core/User'
import {prisma} from '../prismaClient';
import jwt from 'jsonwebtoken';
import {User as PrismaUser} from '@prisma/client'

interface Authenticated extends Request {
  user?: PrismaUser;
}

const auth = async (req:Authenticated,res:Response,next:NextFunction) => {

  try {
const token = req.cookies['token'];

if(!token) {
  return res.status(401).json({message: 'Non autorisé'});
}

const decoded = jwt.verify(token,process.env.SECRET_KEY as string) as {id: number};
const userDecoded = await prisma.user.findUnique({
  where: {id: decoded.id},});

if(!userDecoded) {
  return res.status(404).json({message: "Utilisateur non trouvé"});
}

req.user = userDecoded;

next();
return;

} catch(err: any) {
  return res.status(403).json({message: "Token invalide ou expiré", error: err.message});
}

}

export {auth, Authenticated};