import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUsername, register, resetRegister } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../composants/Header';
import './RegisterPage.css';
import ReCAPTCHA from 'react-google-recaptcha';
function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isUsernameAvailable, isLoading, isRegister } = useSelector((state) => state.auth);
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
        //    if (password.length < 6) {
        //      toast.error("Le mot de passe doit faire au moins 6 caractères !");
        //    return;
        // }
        // Lancement de l'inscription
        dispatch(register({ username, password, email }));
    };
    const handleChangeUsername = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    };
    const handleChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };
    const handleChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };
    useEffect(() => {
        if (username.length > 2) {
            dispatch(checkUsername({ username }));
        }
    }, [username, dispatch]);
    useEffect(() => {
        if (isRegister) {
            toast.success('Inscription réussie ! Vous allez redirigé vers la page de connexion..');
            setTimeout(() => {
                dispatch(resetRegister());
                navigate('/');
            }, 1500);
        }
    }, [isRegister, navigate]);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "register-bg", children: [_jsx(Header, {}), _jsxs("div", { className: "register-card", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h1", { className: "text-center", children: "Formulaire d'inscription" }), _jsx("p", { className: "text-center", children: "Votre aventure commence en tant que pompier engag\u00E9 : b\u00E2tissez votre carri\u00E8re et devenez un pilier du secours marseillais \uD83D\uDEA8" })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-3 form", children: [_jsx("input", { type: "text", placeholder: "Saissisez une adresse mail", value: email, onChange: handleChangeEmail, className: "form-control" }), _jsx("small", { className: "form-text text-muted", children: "Votre e-mail est utilis\u00E9 en cas d'oubli de vos identifiants ! \uD83D\uDE27 " })] }), _jsxs("div", { className: "mb-3", children: [_jsx("input", { type: "text", placeholder: "Choissiez un nom d'utilisateur", value: username, onChange: handleChangeUsername, className: username.length === 0 ? 'form-control' : isUsernameAvailable
                                                ? 'form-control username-available' : 'form-control username-not-available' }), username.length > 2 && (_jsx("small", { className: isUsernameAvailable ? "form-text text-success" : "form-text text-danger", children: isUsernameAvailable ? "Nom d'utilisateur disponible ✅" : "Nom d'utilisateur déjà pris ❌" }))] }), _jsx("div", { className: "mb-3", children: _jsx("input", { type: "password", placeholder: "Tapez votre mot de passe", value: password, onChange: handleChangePassword, className: "form-control" }) }), _jsx(ReCAPTCHA, { className: "align-center", sitekey: import.meta.env.VITE_APP_SITE_KEY }), _jsx("button", { type: "submit", children: "S'inscrire" })] })] })] }) }));
}
export default Register;
