import {Router,Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/user';
import UserCore from '../core/Pompier';
import { AnyARecord } from 'node:dns';

const router = Router();

// 📌 REGISTER
router.post('/register', async(req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const [userUsername, userEmail] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);

    if (userUsername) {
      return res.status(409).json({ status: 'error', message: `Nom d'utilisateur déjà utilisé !` });
    }

    if (userEmail) {
      return res.status(409).json({ status: 'error', message: 'E-mail déjà utilisé !' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ status: 'error', message: 'E-mail non valide ! Merci de réessayer' });
    }
    
    const user = new User({username: username, password: password, email: email});
    const Pompier = new UserCore(user);
    // Affecter caserne la plus vide
    await Pompier.AssignerPremiereCaserne();
    Pompier.changerGrade('Matelot');
    Pompier.changerStatus('Au repos');
    Pompier.save();
    return res.status(200).json({ message: 'Inscription réussie !' });

  } 
  catch (err:any) {
    console.error(err.message);
    return res.status(500).json({ message: 'Erreur inconnue du serveur' });

  }
});

// 📌 LOGIN
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Identifiants incorrects !' });
    }

    const token = user.generateToken();

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Connexion réussie !' });

  } catch (err:any) {
    console.log(err.message);
    return res.status(500).json({ message: 'Erreur inconnue' });
  }
});

// 📌 LOGOUT
router.post('/logout', (_req:Request,res:Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });

    return res.status(200).json({ message: 'Déconnexion réussie !' });

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Erreur lors de la déconnexion :', err.message);
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
    return res.status(500).json({ message: 'Erreur inconnue' });
  }
});

// 📌 CHECK AUTH
router.get('/checkAuth', async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    if (typeof decoded !== 'object' || decoded === null || !('id' in decoded)) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }

    const user = await User.findById((decoded as { id: string }).id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé !' });
    }

    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
      },
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(401).json({ message: 'Token invalide ou expiré', error: err.message });
    }
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
});

// 📌 CHECK USERNAME
router.get('/checkUsername/:username', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(409).json({ available: false });
    }

    return res.status(200).json({ available: true });

  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
    return res.status(500).json({ message: 'Erreur serveur inconnue' });
  }
});

export default router;
