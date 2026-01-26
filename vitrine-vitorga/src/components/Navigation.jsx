import React from 'react';
import { Wine, Menu, X } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen }) => {
  const navigation = [
    { name: 'Accueil', page: 'home' },
    { name: 'Produit', page: 'produit' },
    { name: 'Contact', page: 'contact' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wine className="w-8 h-8 text-golden" />
            <span className="text-2xl font-bold text-vine-green">VitApp</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navigation.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`font-semibold transition-colors ${
                  currentPage === item.page ? 'text-golden' : 'text-gray-700 hover:text-golden'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-4 rounded hover:bg-gray-100"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;