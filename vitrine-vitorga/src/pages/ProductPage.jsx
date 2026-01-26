import React from 'react';
import ContentRenderer from '../components/ContentRenderer';

const ProductPage = ({ content }) => {
  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <ContentRenderer page="produit" content={content} />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {['Suivi des vignes', 'Gestion des vendanges', 'Analyse des sols', 'Prévisions météo'].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-golden">
              <p className="font-semibold text-gray-800">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;