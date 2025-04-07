import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {logout} from '../redux/slices/authSlice';
import {getProfile} from '../redux/slices/profileSlice';

function Profile() {


    const {isAuthenticated, isLoading} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated && !isLoading) {
            navigate("/");
        } 
    }, [isAuthenticated,isLoading,navigate]);

    useEffect(() => {
        console.log("Effet forcé - Appel à getProfile");
        dispatch(getProfile())
            .then((res) => console.log("getProfile dispatché :", res))
            .catch((err) => console.error("Erreur lors du dispatch :", err));
    }, []);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });

    }
    return (
        <>
            {user ? (
                <h1>Bonjour {user.username}. Comment vas-tu ? Ton adresse mail est la suivante : {user.email}</h1>
            ) : (
                <h1>Aucun profil chargé</h1>
            )}
            <button onClick={handleLogout}>Se déconnecter</button>
        </>
    );
}
export default Profile;