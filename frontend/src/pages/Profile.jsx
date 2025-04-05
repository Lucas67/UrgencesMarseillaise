import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {logout} from '../redux/slices/authSlice';

function Profile() {


    const {isAuthenticated, isLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated && !isLoading) {
            navigate("/");
        }
    }, [isAuthenticated,isLoading,navigate]);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });

    }
    return(
        <>
         <h1>Bravo ! Tu es {isAuthenticated ? (<h1>Authentifié !</h1>) : (<h1>Erreur</h1>)}</h1>
         <button onClick={handleLogout}>Se déconnecter</button>
        </>
    );
}
export default Profile;