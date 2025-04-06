import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from './redux/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Fermer les toasts lors du changement de page
  useEffect(() => {
    toast.dismiss();
  }, [location]);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </>
  );
}

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
