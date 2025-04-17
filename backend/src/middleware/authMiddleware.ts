import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import User, {IUser} from '../models/user';

interface Authenticated extends Request {
  user?: IUser;
}

const auth = async (req:Authenticated,res:Response,next:NextFunction) => {

  try {
const token = req.cookies['token'];

if(!token) {
  return res.status(401).json({message: 'Non autorisé'});
}

const decoded = jwt.verify(token,process.env.SECRET_KEY as string) as {id: string};

const user = await User.findById(decoded.id);

if(!user) {
  return res.status(404).json({message: "Utilisateur non trouvé"});
}

req.user = user;

next();
return;

} catch(err: any) {
  return res.status(403).json({message: "Token invalide ou expiré", error: err.message});
}

}

export {auth, Authenticated};