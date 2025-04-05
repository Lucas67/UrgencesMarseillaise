import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useSelector, useDispatch} from 'react-redux';
import {checkAuth, loginUser} from './redux/slices/authSlice';

const PrivateRoute = ({children}) => {
  const {isAuthenticated, isLoading} = useSelector((state) => state.auth);

  if(isLoading) {
    return <p>Chargement...</p>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

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
