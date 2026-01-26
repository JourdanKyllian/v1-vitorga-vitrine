import React from 'react';

const Footer = ({ isAdmin, setCurrentPage, setShowLogin }) => {
  return (
    <footer className="bg-vine-green text-white py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-2">© 2026 VitApp - Application Viticole Premium</p>
        <button 
          onClick={() => isAdmin ? setCurrentPage('admin') : setShowLogin(true)}
          className="text-sm text-golden hover:underline"
        >
          {isAdmin ? 'Dashboard Admin' : 'Se connecter'}
        </button>
      </div>
    </footer>
  );
};

export default Footer;