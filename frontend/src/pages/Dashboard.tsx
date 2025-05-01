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
            .then((res) => console.log("getProfile dispatché :", res))
            .catch((err) => console.error("Erreur lors du dispatch :", err));
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
        <HeaderWithData pompier={user} />
        <div className="container-fluid d-flex flex-wrap align-items-center justify-content-end p-3">
        <Card style={{width: '40%'}} className="shadow-lg" >
            <Card.Header className="bg-danger text-white">
            <i className="bi bi-person-square me-2 fw-bold"/>Informations
            </Card.Header>
            <Card.Body className="d-flex flex-column gap-2">
  <div className="d-flex align-items-center">
    <i className="bi bi-activity text-danger me-2"></i>
    <div className="d-flex flex-wrap">
      <div className="fw-bold me-1">État :</div>
      <div className={classNames({
        'badge bg-success': user.status === 'Garde',
        'badge bg-danger': user.status === 'En intervention'
      })}>{user.status}</div>
    </div>
  </div>

  <div className="d-flex align-items-center">
    <i className="bi bi-geo-alt text-primary me-2"></i>
    <div className="d-flex flex-wrap">
      <div className="fw-bold me-1">Affectation :</div>
      <div className="text-muted">{user.caserne?.name?? "Non affecté"}</div>
    </div>
  </div>
</Card.Body>

        </Card>
        </div>
        </>
)}

export default Profile;
