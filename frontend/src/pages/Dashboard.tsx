import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from '../redux/slices/authSlice';
import { getProfile } from '../redux/slices/profileSlice';
import { AppDispatch, RootState } from "../redux/store";
import { Card } from "react-bootstrap";
import HeaderWithData from "../composants/HeaderWithData";
import 'bootstrap-icons/font/bootstrap-icons.css';
import classNames from "classnames";


function Profile() {
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
    const { user } = useSelector((state: RootState) => state.profile);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/");
        } 
    }, [isAuthenticated, isLoading, navigate]);

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });
    }

    if (!user) {
        return <h1>Chargement du profil...</h1>;
    }

    return (
        <>
        <h1>En cours de construction</h1>
        </>
)}

export default Profile;
