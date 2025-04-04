import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useSelector, useDispatch} from 'react-redux';
import {loginUser} from './redux/slices/authSlice';


const PrivateRoute = ({children}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
}
function App() {

  return (
    <>
   <Router>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
   </Router>
    </>
  )
}

export default App
