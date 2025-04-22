import { Request, Response } from 'express';
import { UserManager } from '../services/UserManager';
import { Authenticated } from '../middleware/authMiddleware';

export class UserController {
  static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
      const token = await UserManager.CreateUser(username, email, password);
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      return res.status(200).json({ message: 'Inscription réussie !' });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  private static getCookieOptions() {
    return {
      httpOnly: true,
      sameSite: 'strict' as const,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  }

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const token = await UserManager.LoginUser(username, password);
      res.cookie('token', token, UserController.getCookieOptions());
      return res.status(200).json({ message: 'Connexion réussie !' });
    } catch (err: any) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }
  }

  static logout(_req: Request, res: Response) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/'
      });
      return res.status(200).json({ message: 'Déconnexion réussie !' });
    } catch (err: any) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  static async checkAuth(req: Request, res: Response) {
    try {
      const pompier = await UserManager.checkAuth(req.cookies.token);
      return res.status(200).json({ pompier });
    } catch (err: any) {
      return res.status(401).json({ message: err.message });
    }
  }

  static async checkUsername(req: Request, res: Response) {
    const { username } = req.params;
    try {
      const available = await UserManager.checkUsername(username);
      return res.status(200).json({ available });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async LoadProfile(req: Authenticated, res:Response) {
    try {
      if(!req.user || !req.user.id) {
        return res.status(404).json({message : 'Utilisateur non trouvé !'});
      }

      const pompier = await UserManager.LoadPompier(req.user.id)
      const pompierJSON = pompier.toJSON();

      return res.status(200).json({pompierJSON});
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}

export default UserController