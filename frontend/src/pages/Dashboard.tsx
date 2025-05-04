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
        <HeaderWithData pompier={user} />
        <div className="container mt-5">
          <div className="row g-5">
        <div className="col-md-6">
        <Card style={{width: '100%', minHeight:'150px'}} className="shadow-lg" >
            <Card.Header className="bg-danger text-white">
            <i className="bi bi-list-columns me-2 fw-bold"/>Listes des tâches
            </Card.Header>
            <Card.Body className="d-flex flex-column gap-2">
  <div className="d-flex align-items-center">
    En cours de développement...
    </div>
</Card.Body>

        </Card>
        </div>
        <div className="col-md-6">
        <Card style={{width: '100%', minHeight:'150px'}} className="shadow-lg" >
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
    </div>
  </div>
</Card.Body>

        </Card>
        </div>
        <div className="col-md-12">
        <Card style={{width: '100%', minHeight: '150px'}} className="shadow-lg" >
            <Card.Header className="bg-danger text-white">
            <i className="bi bi-car-front-fill me-2 fw-bold"/>Véhicules
            </Card.Header>
            <Card.Body className="d-flex flex-column gap-2">
            <div className="container">
            <div className="row">
            
            </div>  
            </div>
</Card.Body>

        </Card>
        </div>
        </div>
        </div>
        </>
)}

export default Profile;
