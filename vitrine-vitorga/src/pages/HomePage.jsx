import React from 'react';
import { Wine, Grape, Award, MapPin } from 'lucide-react';
import ContentRenderer from '../components/ContentRenderer';

const HomePage = ({ content, setCurrentPage }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-golden/10 to-vine-green/10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Wine className="w-16 h-16 mx-auto mb-6 text-golden" />
          <ContentRenderer page="home" content={content} />
          <button 
            onClick={() => setCurrentPage('produit')}
            className="bg-golden hover:bg-golden/90 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
          >
            Découvrir l'Application
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Grape, title: 'Gestion Parcellaire', desc: 'Cartographie précise de vos vignobles' },
            { icon: Award, title: 'Qualité Premium', desc: 'Suivi rigoureux de la qualité' },
            { icon: MapPin, title: 'Géolocalisation', desc: 'Traçabilité totale de vos produits' }
          ].map((feature, i) => (
            <div key={i} className="text-center p-8 rounded-lg hover:shadow-xl transition-shadow border border-gray-100">
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-vine-green" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;