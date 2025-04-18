import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUsername, register, resetRegister } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RootOptions } from "react-dom/client";
import { AppDispatch, RootState } from "../redux/store";


function Register() {

    const [email,setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {isUsernameAvailable, isLoading, isRegister} = useSelector((state:RootState) => state.auth);
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Vérification de la longueur du nom d'utilisateur
        if (username.length < 3) {
            toast.error("Le nom d'utilisateur doit faire au moins 3 caractères !");
            return; // Arrête l'exécution si la condition est vraie
        }
    
        // Vérification de la longueur du mot de passe
    //    if (password.length < 6) {
      //      toast.error("Le mot de passe doit faire au moins 6 caractères !");
        //    return;
       // }
    
        // Lancement de l'inscription
        dispatch(register({ username, password, email }));
    };

    const handleChangeUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.target.value); 
    }

    const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value); 
    }

    const handleChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value); 
    }
    

    useEffect(() => {
     if(username.length > 2) {
     dispatch(checkUsername({username}));
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
        <input type="text" placeholder="Saissisez une adresse mail" value={email} onChange={handleChangeEmail} />
       {username.length > 2 && (
                    <p style={{ color: isUsernameAvailable ? 'green' : 'red' }}>
                        {isUsernameAvailable ? `Nom d'utilisateur disponible` : `Nom d'utilisateur déjà pris !`}
                    </p>
                )}
                
       <input type="text" placeholder="Choissiez un nom d'utilisateur" value={username} onChange={handleChangeUsername}/>
       <input type="password" placeholder="Tapez votre mot de passe" value={password} onChange={handleChangePassword}/>
       <button type="submit">S'inscrire</button>
       </form>
        </>
    );
}

export default Register;