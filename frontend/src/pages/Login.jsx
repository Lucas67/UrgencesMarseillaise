import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from '../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({username, password}));
    if(loginUser.fulfilled) {
        navigate('/profile');
    }
    
  };
  
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
        </form>
    </>
  )
}

export default Login
