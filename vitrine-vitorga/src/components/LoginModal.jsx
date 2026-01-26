import React from 'react';

const LoginModal = ({ showLogin, setShowLogin, loginForm, setLoginForm, handleLogin }) => {
  if (!showLogin) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Connexion Admin</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Identifiant</label>
            <input 
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="admin"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input 
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="admin"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleLogin}
              className="flex-1 bg-vine-green text-white py-2 rounded-lg hover:bg-vine-green/90"
            >
              Se connecter
            </button>
            <button 
              onClick={() => setShowLogin(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Annuler
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Mode démo : admin / admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;