import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from '../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({username, password}));
    };

const handleRegister = (e) => {
  e.preventDefault();
  navigate('/register');
}

    useEffect(() => {
if (isAuthenticated) {
  navigate('/profile')
}
    },[isAuthenticated, navigate]);
    
  
  return (
    <>
     <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: '100%', margin: '5px 0', padding: '8px' }}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', margin: '5px 0', padding: '8px' }}
                />  
                <button type="submit">Se connecter</button>
                <button onClick={handleRegister}>S'inscrire</button>
        </form>
    </>
  )
}

export default Login
