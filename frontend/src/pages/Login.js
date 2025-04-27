import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../composants/Header';
import './LoginPage.css';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };
    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/register');
    };
    const handleChangeUsername = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    };
    const handleChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "login-bg", children: [_jsx(Header, {}), _jsxs("div", { className: "login-card text-center", children: [_jsx("h4", { className: "mb-4", children: "Connexion" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("div", { className: "mb-3", children: _jsx("input", { type: "text", className: "form-control", placeholder: "Nom d\u2019utilisateur", onChange: handleChangeUsername }) }), _jsx("div", { className: "mb-3", children: _jsx("input", { type: "password", className: "form-control", placeholder: "Mot de passe", onChange: handleChangePassword }) }), _jsx("div", { className: "d-grid mb-3", children: _jsx("button", { type: "submit", className: "btn-login", children: "Se connecter" }) }), _jsx("div", { className: "d-grid", children: _jsx("button", { type: "button", onClick: handleRegister, className: "btn-register", children: "S\u2019inscrire" }) })] })] })] }) }));
}
export default Login;
