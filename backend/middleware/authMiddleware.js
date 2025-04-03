const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {

    try{
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({message: 'Accès refusé'});
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    req.user = decoded;

    next();
} catch(err) {
  return res.status(403).json({message: 'Token invalide ou expiré', error: err.message});
}

}

module.exports = auth;