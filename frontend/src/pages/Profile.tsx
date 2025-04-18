import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {logout} from '../redux/slices/authSlice';
import {getProfile} from '../redux/slices/profileSlice';
import { AppDispatch, RootState } from "../redux/store";

function Profile() {


    const {isAuthenticated, isLoading} = useSelector((state:RootState) => state.auth);
    const {user} = useSelector((state:RootState) => state.profile)
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated && !isLoading) {
            navigate("/");
        } 
    }, [isAuthenticated,isLoading,navigate]);

    useEffect(() => {
        dispatch(getProfile())
            .then((res) => console.log("getProfile dispatché :", res))
            .catch((err) => console.error("Erreur lors du dispatch :", err));
            console.log(user);
    }, []);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });

    }
    return (
        <>
            {user ? (
                <h1>Nom: {user.username}
                Grade actuel: {user.grade}
                Caserne: {user.caserneName}
                Etat : {user.status}</h1>
            ) : (
                <h1>Aucun profil chargé</h1>
            )}
            <button onClick={handleLogout}>Se déconnecter</button>
        </>
    );
}
export default Profile;