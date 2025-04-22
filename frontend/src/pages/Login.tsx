import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from '../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {RootState, AppDispatch} from '../redux/store';

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
  navigate('/profile')
}
    },[isAuthenticated, navigate]);
    
  return (
    <>
    <div className="container d-flex align-items-center justify-contet-center" style={{minHeight: '100vh'}}>
     <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={handleChangeUsername}
                    style={{ width: '100%', margin: '5px 0', padding: '8px' }}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={handleChangePassword}
                    style={{ width: '100%', margin: '5px 0', padding: '8px' }}
                />  
                <button type="submit">Se connecter</button>
                <button onClick={handleRegister}>S'inscrire</button>
        </form>
        </div>
    </>
  )
}

export default Login
