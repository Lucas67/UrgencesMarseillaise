import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from '../redux/slices/authSlice';
import { getProfile } from '../redux/slices/profileSlice';
import { Card } from "react-bootstrap";
import HeaderWithData from "../composants/HeaderWithData";
import 'bootstrap-icons/font/bootstrap-icons.css';
import classNames from "classnames";
function Profile() {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/");
        }
    }, [isAuthenticated, isLoading, navigate]);
    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);
    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });
    };
    if (!user) {
        return _jsx("h1", { children: "Chargement du profil..." });
    }
    return (_jsxs(_Fragment, { children: [_jsx(HeaderWithData, { pompier: user }), _jsx("div", { className: "container mt-5", children: _jsxs("div", { className: "row g-5", children: [_jsx("div", { className: "col-md-6", children: _jsxs(Card, { style: { width: '100%', minHeight: '150px' }, className: "shadow-lg", children: [_jsxs(Card.Header, { className: "bg-danger text-white", children: [_jsx("i", { className: "bi bi-list-columns me-2 fw-bold" }), "Listes des t\u00E2ches"] }), _jsx(Card.Body, { className: "d-flex flex-column gap-2", children: _jsx("div", { className: "d-flex align-items-center", children: "En cours de d\u00E9veloppement..." }) })] }) }), _jsx("div", { className: "col-md-6", children: _jsxs(Card, { style: { width: '100%', minHeight: '150px' }, className: "shadow-lg", children: [_jsxs(Card.Header, { className: "bg-danger text-white", children: [_jsx("i", { className: "bi bi-person-square me-2 fw-bold" }), "Informations"] }), _jsxs(Card.Body, { className: "d-flex flex-column gap-2", children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("i", { className: "bi bi-activity text-danger me-2" }), _jsxs("div", { className: "d-flex flex-wrap", children: [_jsx("div", { className: "fw-bold me-1", children: "\u00C9tat :" }), _jsx("div", { className: classNames({
                                                                    'badge bg-success': user.status === 'Garde',
                                                                    'badge bg-danger': user.status === 'En intervention'
                                                                }), children: user.status })] })] }), _jsxs("div", { className: "d-flex align-items-center", children: [_jsx("i", { className: "bi bi-geo-alt text-primary me-2" }), _jsx("div", { className: "d-flex flex-wrap", children: _jsx("div", { className: "fw-bold me-1", children: "Affectation :" }) })] })] })] }) }), _jsx("div", { className: "col-md-12", children: _jsxs(Card, { style: { width: '100%', minHeight: '150px' }, className: "shadow-lg", children: [_jsxs(Card.Header, { className: "bg-danger text-white", children: [_jsx("i", { className: "bi bi-car-front-fill me-2 fw-bold" }), "V\u00E9hicules"] }), _jsx(Card.Body, { className: "d-flex flex-column gap-2", children: _jsx("div", { className: "container", children: _jsx("div", { className: "row" }) }) })] }) })] }) })] }));
}
export default Profile;
