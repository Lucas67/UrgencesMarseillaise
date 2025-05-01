import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUsername, register, resetRegister, resetIsDone } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../composants/Header';
import './RegisterPage.css';
import ReCAPTCHA from 'react-google-recaptcha';
import classNames from "classnames";
function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dateNaissance, setdateNaissance] = useState('');
    const [tokenCaptcha, settokenCaptcha] = useState(null);
    const { isUsernameAvailable, isLoading, isRegister, isDone } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error(`Merci d'indiquer une adresse mail`);
            return;
        }
        if (!dateNaissance) {
            toast.error(`Merci de préciser votre date de naissance`);
            return;
        }
        if (!username) {
            toast.error(`Merci d'indiquer un nom d'utilisateur`);
            return;
        }
        if (username.length < 3) {
            toast.error(`Votre nom d'utilisateur doit faire plus que 3 caractères`);
            return;
        }
        if (!password) {
            toast.error(`Merci d'indiquer un mot de passe`);
            return;
        }
        if (!tokenCaptcha) {
            toast.error('Merci de valider le captcha');
            return;
        }
        // Lancement de l'inscription
        dispatch(register({ username, password, email, dateNaissance, tokenCaptcha }));
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
    const handleCaptchaChange = (token) => {
        settokenCaptcha(token);
    };
    const handleChangeDateNaissance = (e) => {
        e.preventDefault();
        setdateNaissance(e.target.value);
    };
    useEffect(() => {
        if (username.length <= 2) {
            dispatch(resetIsDone());
            return;
        }
        const timeout = setTimeout(() => {
            dispatch(checkUsername({ username }));
        }, 500);
        return () => clearTimeout(timeout);
    }, [username, dispatch]);
    useEffect(() => {
        if (isRegister) {
            toast.success('Inscription réussie ! Vous allez être redirigé..');
            setTimeout(() => {
                dispatch(resetRegister());
                navigate('/dashboard');
            }, 1500);
        }
    }, [isRegister, navigate]);
    const [captchaKey, setCaptchaKey] = useState(uuidv4()); // <- Crée une clé unique
    useEffect(() => {
        setCaptchaKey(uuidv4()); // Remets une nouvelle clé au montage de la page
    }, []);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "register-bg", children: [_jsx(Header, {}), _jsxs("div", { className: "register-card", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h1", { className: "text-center", children: "Formulaire d'inscription" }), _jsx("p", { className: "text-center", children: "Votre aventure commence en tant que pompier engag\u00E9 : b\u00E2tissez votre carri\u00E8re et devenez un pilier du secours marseillais \uD83D\uDEA8" })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-3 form", children: [_jsx("input", { type: "text", placeholder: "Saissisez une adresse mail", value: email, onChange: handleChangeEmail, className: "form-control" }), _jsx("small", { className: "form-text text-muted", children: "Votre e-mail est utilis\u00E9 en cas d'oubli de vos identifiants ! \uD83D\uDE27 " })] }), _jsxs("div", { className: "mb-3 form", children: [_jsx("input", { type: "date", placeholder: "Votre date de naissance", value: dateNaissance, onChange: handleChangeDateNaissance, className: "form-control" }), _jsx("small", { className: "form-text text-muted", children: "Votre date de naissance est utilis\u00E9 \u00E0 des fins de statistiques \uD83D\uDCCA" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("input", { type: "text", placeholder: "Choissiez un nom d'utilisateur", value: username, onChange: handleChangeUsername, className: classNames('form-control', {
                                                'username-available': isDone && isUsernameAvailable,
                                                'username-not-available': isDone && !isUsernameAvailable
                                            }) }), _jsxs("small", { className: "form-text text-muted", children: ["Disponibilit\u00E9 du nom d'utilisateur :", isDone && (_jsx("span", { className: isUsernameAvailable ? 'text-success' : 'text-danger', children: isUsernameAvailable ? 'Disponible ✅' : 'Indisponibile ❌' }))] })] }), _jsx("div", { className: "mb-3", children: _jsx("input", { type: "password", placeholder: "Tapez votre mot de passe", value: password, onChange: handleChangePassword, className: "form-control" }) }), _jsx("div", { className: "captcha", children: _jsx(ReCAPTCHA, { sitekey: import.meta.env.VITE_APP_SITE_KEY, onChange: handleCaptchaChange }, captchaKey) }), _jsx("button", { className: "btn-register", type: "submit", children: "S'inscrire" })] })] })] }) }));
}
export default Register;
