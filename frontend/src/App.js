import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from './redux/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    if (isLoading) {
        return _jsx("p", { children: "Chargement..." });
    }
    return isAuthenticated ? children : _jsx(Navigate, { to: "/" });
};
function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    // Vérifier l'authentification au chargement de l'application
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
    // Fermer les toasts lors du changement de page
    useEffect(() => {
        toast.dismiss();
    }, [location]);
    return (_jsxs(_Fragment, { children: [_jsx(ToastContainer, { position: "bottom-right", autoClose: false }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/profile", element: _jsx(PrivateRoute, { children: _jsx(Profile, {}) }) })] })] }));
}
const Root = () => (_jsx(BrowserRouter, { children: _jsx(App, {}) }));
export default Root;
