import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from '../redux/slices/authSlice';
import { getProfile } from '../redux/slices/profileSlice';
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
        dispatch(getProfile())
            .then((res) => console.log("getProfile dispatché :", res))
            .catch((err) => console.error("Erreur lors du dispatch :", err));
        console.log(user);
    }, []);
    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });
    };
    return (_jsxs(_Fragment, { children: [user ? (_jsxs("h1", { children: ["Nom: ", user.username, "Grade actuel: ", user.grade, "Caserne: ", user.caserneName, "Etat : ", user.status] })) : (_jsx("h1", { children: "Aucun profil charg\u00E9" })), _jsx("button", { onClick: handleLogout, children: "Se d\u00E9connecter" })] }));
}
export default Profile;
