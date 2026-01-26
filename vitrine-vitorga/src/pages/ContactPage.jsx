import React from 'react';
import { Mail, Phone } from 'lucide-react';
import ContentRenderer from '../components/ContentRenderer';

const ContactPage = ({ content, setCurrentPage }) => {
  return (
    <div className="min-h-screen py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <ContentRenderer page="contact" content={content} />
        <div className="bg-gradient-to-br from-vine-green/5 to-golden/5 p-8 rounded-lg mt-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-golden" />
              <span>contact@viti-app.fr</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-golden" />
              <span>+33 1 23 45 67 89</span>
            </div>
          </div>
          <button 
            onClick={() => setCurrentPage('produit')}
            className="mt-6 w-full bg-vine-green hover:bg-vine-green/90 text-white py-3 rounded-lg font-semibold"
          >
            Demander une Démo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;