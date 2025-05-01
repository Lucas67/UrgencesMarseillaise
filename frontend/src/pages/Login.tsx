import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from '../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {RootState, AppDispatch} from '../redux/store';
import {Header} from '../composants/Header'
import './LoginPage.css'

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({username, password}));
    };

const handleRegister = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigate('/register')
};

const handleChangeUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  setUsername(e.target.value);
};

const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  setPassword(e.target.value);
}

    useEffect(() => {
if (isAuthenticated) {
  navigate('/dashboard')
}
    },[isAuthenticated, navigate]);
    
  return (
    <>
    <div className="login-bg">
      <Header />
      <div className="login-card text-center">
        <h4 className="mb-4">Connexion</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Nom d’utilisateur" onChange={handleChangeUsername} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Mot de passe" onChange={handleChangePassword} />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn-login">
              Se connecter
            </button>
          </div>
          <div className="d-grid">
            <button type="button" onClick={handleRegister} className="btn-register">
              S’inscrire
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default Login
