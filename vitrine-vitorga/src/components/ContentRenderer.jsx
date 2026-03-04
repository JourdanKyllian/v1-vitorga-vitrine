import React from 'react';

const ContentRenderer = ({ page, content }) => {
  const pageContent = content
    .filter(item => item.page === page)
    .sort((a, b) => a.position - b.position);

  return (
    <div className="content-renderer">
      {pageContent.map((item) => {
        switch (item.type) {

          // Titre vert (par défaut)
          case 'titre':
            return (
              <h2 key={item.id} className="text-4xl md:text-5xl font-bold mb-6 text-vine-green">
                {item.contenu}
              </h2>
            );

          // Titre doré (grand, mis en valeur)
          case 'titre_golden':
            return (
              <h2 key={item.id} className="text-4xl md:text-5xl font-bold mb-6 text-golden">
                {item.contenu}
              </h2>
            );

          // Texte normal
          case 'texte':
            return (
              <p key={item.id} className="text-lg text-gray-700 mb-8 leading-relaxed">
                {item.contenu}
              </p>
            );

          // Carte (pour la page produit)
          case 'carte':
            return (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-golden">
                <p className="font-semibold text-gray-800">{item.contenu}</p>
              </div>
            );

          // Image
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