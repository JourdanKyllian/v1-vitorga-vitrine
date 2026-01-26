import React from 'react';

// ==================== COMPOSANT DE RENDU DE CONTENU ====================
const ContentRenderer = ({ page, content }) => {
  // Filtrer et trier le contenu pour la page donnée
  const pageContent = content
    .filter(item => item.page === page)
    .sort((a, b) => a.position - b.position);

  return (
    <div className="content-renderer">
      {pageContent.map((item, index) => {
        switch (item.type) {
          case 'titre':
            return (
              <h2 
                key={item.id} 
                className={`text-4xl md:text-5xl font-bold mb-6 ${
                  index === 0 ? 'text-golden' : 'text-vine-green'
                }`}
              >
                {item.contenu}
              </h2>
            );
          
          case 'texte':
            return (
              <p key={item.id} className="text-lg text-gray-700 mb-8 leading-relaxed">
                {item.contenu}
              </p>
            );
          
          case 'image':
            return (
              <img 
                key={item.id}
                src={item.contenu}
                alt="Contenu visuel"
                className="w-full rounded-lg shadow-xl mb-8 object-cover"
                style={{ maxHeight: '500px' }}
              />
            );
          
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ContentRenderer;