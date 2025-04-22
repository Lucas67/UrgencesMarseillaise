import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
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
    return (_jsx(_Fragment, { children: _jsx("div", { className: "container d-flex align-items-center justify-contet-center", style: { minHeight: '100vh' }, children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "text", placeholder: "Nom d'utilisateur", value: username, onChange: handleChangeUsername, style: { width: '100%', margin: '5px 0', padding: '8px' } }), _jsx("input", { type: "password", placeholder: "Mot de passe", value: password, onChange: handleChangePassword, style: { width: '100%', margin: '5px 0', padding: '8px' } }), _jsx("button", { type: "submit", children: "Se connecter" }), _jsx("button", { onClick: handleRegister, children: "S'inscrire" })] }) }) }));
}
export default Login;
