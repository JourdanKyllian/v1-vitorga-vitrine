import React from 'react';
import ContentRenderer from '../components/ContentRenderer';

const ProductPage = ({ content }) => {
  // Séparer les cartes du reste du contenu
  const cards = content
    .filter(item => item.page === 'produit' && item.type === 'carte')
    .sort((a, b) => a.position - b.position);

  const otherContent = content.filter(
    item => item.page === 'produit' && item.type !== 'carte'
  );

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">

        {/* Titres et textes dynamiques */}
        <ContentRenderer page="produit" content={otherContent} />

        {/* Cartes dynamiques — s'affichent seulement s'il y en a */}
        {cards.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {cards.map(card => (
              <div key={card.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-golden">
                <p className="font-semibold text-gray-800">{card.contenu}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductPage;