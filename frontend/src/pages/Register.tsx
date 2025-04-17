import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUsername, register, resetRegister } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Register() {

    const [email,setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {isUsernameAvailable, isLoading, isRegister} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Vérification de la longueur du nom d'utilisateur
        if (username.length < 3) {
            toast.error("Le nom d'utilisateur doit faire au moins 3 caractères !");
            return; // Arrête l'exécution si la condition est vraie
        }
    
        // Vérification de la longueur du mot de passe
        if (password.length < 6) {
            toast.error("Le mot de passe doit faire au moins 6 caractères !");
            return;
        }
    
        // Lancement de l'inscription
        dispatch(register({ username, password, email }));
    };
    

    useEffect(() => {
     if(username.length > 2) {
     dispatch(checkUsername(username));
     }   
    },[username,dispatch]);

    useEffect(() => {
        if(isRegister) 
        {
            toast.success('Inscription réussie ! Vous allez redirigé vers la page de connexion..')

            setTimeout(() => {
                dispatch(resetRegister());
                navigate('/')
            }, 1500);
        }
    }, [isRegister, navigate]);

    return(
        <>
       <h1>Formulaire d'inscription</h1>
       <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Saissisez une adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} />
       {username.length > 2 && (
                    <p style={{ color: isUsernameAvailable ? 'green' : 'red' }}>
                        {isUsernameAvailable ? `Nom d'utilisateur disponible` : `Nom d'utilisateur déjà pris !`}
                    </p>
                )}
                
       <input type="text" placeholder="Choissiez un nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)}/>
       <input type="password" placeholder="Tapez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
       <button type="submit">S'inscrire</button>
       </form>
       
        </>
    );
}

export default Register;