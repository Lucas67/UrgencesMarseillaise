import {v4 as uuidv4} from "uuid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUsername, register, resetRegister,resetIsDone } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RootOptions } from "react-dom/client";
import { AppDispatch, RootState } from "../redux/store";
import {Header} from '../composants/Header'
import './RegisterPage.css';
import ReCAPTCHA from 'react-google-recaptcha'
import classNames from "classnames";

function Register() {

    const [email,setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dateNaissance, setdateNaissance] = useState('');
    const [tokenCaptcha, settokenCaptcha] = useState<string | null>(null);
    const {isUsernameAvailable, isLoading, isRegister,isDone} = useSelector((state:RootState) => state.auth);
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
         if(!email) {
            toast.error(`Merci d'indiquer une adresse mail`);
            return;
         }
         if(!dateNaissance) {
          toast.error(`Merci de préciser votre date de naissance`);
          return;  
         }
         if(!username) {
            toast.error(`Merci d'indiquer un nom d'utilisateur`);
            return;
         }
         if(username.length < 3) {
            toast.error(`Votre nom d'utilisateur doit faire plus que 3 caractères`);
            return;
         }
         if(!password) {
            toast.error(`Merci d'indiquer un mot de passe`);
            return;
         }
         if(!tokenCaptcha) {
            toast.error('Merci de valider le captcha');
            return;            
         }
        // Lancement de l'inscription
        dispatch(register({ username, password, email,dateNaissance,tokenCaptcha }));
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

    const handleCaptchaChange = (token:string | null) => {
        settokenCaptcha(token);
    }

    const handleChangeDateNaissance = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setdateNaissance(e.target.value);
    }
    

    useEffect(() => {
     if(username.length <= 2) {
        dispatch(resetIsDone());
        return;
     }
      
     const timeout = setTimeout(() => {
        dispatch(checkUsername({username}));
     },500);

     return() => clearTimeout(timeout);

    },[username,dispatch]);

    useEffect(() => {
        if(isRegister) 
        {
            toast.success('Inscription réussie ! Vous allez être redirigé..')

            setTimeout(() => {
                dispatch(resetRegister());
                navigate('/dashboard')
            }, 1500);
        }
    }, [isRegister, navigate]);

    const [captchaKey, setCaptchaKey] = useState(uuidv4()); // <- Crée une clé unique

    useEffect(() => {
        setCaptchaKey(uuidv4()); // Remets une nouvelle clé au montage de la page
    }, []);


    return(
        <>
        <div className="register-bg">
        <Header />
      <div className="register-card">
        <div className="mb-4">
       <h1 className="text-center">Formulaire d'inscription</h1>
       <p className="text-center">Votre aventure commence en tant que pompier engagé : bâtissez votre carrière et devenez un pilier du secours marseillais 🚨</p>
       </div>
       <form onSubmit={handleSubmit}>
        <div className="mb-3 form">
        <input type="text" placeholder="Saissisez une adresse mail" value={email} onChange={handleChangeEmail} className="form-control" />
        <small className="form-text text-muted">Votre e-mail est utilisé en cas d'oubli de vos identifiants ! 😧 </small>
        </div>
        <div className="mb-3 form">
         <input type="date" placeholder="Votre date de naissance" value={dateNaissance} onChange={handleChangeDateNaissance} className="form-control"/>
        <small className="form-text text-muted">Votre date de naissance est utilisé à des fins de statistiques 📊</small>
        </div>
       <div className="mb-3">        
       <input type="text" placeholder="Choissiez un nom d'utilisateur" value={username} onChange={handleChangeUsername} className={
        classNames('form-control', {
            'username-available': isDone && isUsernameAvailable,
            'username-not-available': isDone && !isUsernameAvailable
        })
       }/>
       <small className="form-text text-muted">Disponibilité du nom d'utilisateur :  
        {isDone && (
            <span className={isUsernameAvailable ? 'text-success' : 'text-danger'}>
            {isUsernameAvailable ? 'Disponible ✅' : 'Indisponibile ❌'}
            </span>
        )}
       </small>
       </div>
       <div className="mb-3">
       <input type="password" placeholder="Tapez votre mot de passe" value={password} onChange={handleChangePassword} className="form-control"/>
       </div>
       <div className="captcha">
       <ReCAPTCHA sitekey={import.meta.env.VITE_APP_SITE_KEY} key={captchaKey} onChange={handleCaptchaChange} />
       </div>
       <button className="btn-register" type="submit">S'inscrire</button>
       </form>
       </div>
       </div>
        </>
    );
}

export default Register;