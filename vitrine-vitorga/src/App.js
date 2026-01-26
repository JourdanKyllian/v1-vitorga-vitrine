import React, { useState, useEffect } from 'react';
import apiService from './api/apiService';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  useEffect(() => {
    loadContent();
    // Vérifier si déjà connecté
    if (localStorage.getItem('adminToken')) {
      setIsAdmin(true);
    }
  }, []);

  const loadContent = async () => {
    const data = await apiService.getContent();
    setContent(data);
  };

  const handleLogin = async () => {
    try {
      await apiService.login(loginForm.username, loginForm.password);
      setIsAdmin(true);
      setShowLogin(false);
      setCurrentPage('admin');
    } catch (error) {
      alert('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    setCurrentPage('home');
  };

  return (
    <div className="app">
      {/* Navigation */}
      {currentPage !== 'admin' && (
        <Navigation 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      {/* Contenu des pages */}
      {currentPage === 'home' && <HomePage content={content} setCurrentPage={setCurrentPage} />}
      {currentPage === 'produit' && <ProductPage content={content} />}
      {currentPage === 'contact' && <ContactPage content={content} setCurrentPage={setCurrentPage} />}
      {currentPage === 'admin' && isAdmin && (
        <AdminDashboard content={content} setContent={setContent} onLogout={handleLogout} />
      )}

      {/* Footer */}
      {currentPage !== 'admin' && (
        <Footer 
          isAdmin={isAdmin}
          setCurrentPage={setCurrentPage}
          setShowLogin={setShowLogin}
        />
      )}

      {/* Modal de connexion */}
      {!isAdmin && (
        <LoginModal 
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
