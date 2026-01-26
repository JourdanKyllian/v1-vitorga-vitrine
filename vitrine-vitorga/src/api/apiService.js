const API_BASE_URL = 'https://api.example.com'; // À remplacer par votre API

const apiService = {
  // Récupérer tout le contenu
  async getContent() {
    try {
      const response = await fetch(`${API_BASE_URL}/content`);
      if (!response.ok) throw new Error('Erreur de chargement');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      // Données de démonstration
      return [
        { id: 1, page: 'home', position: 1, type: 'titre', contenu: 'L\'Excellence Viticole à Portée de Main' },
        { id: 2, page: 'home', position: 2, type: 'texte', contenu: 'Découvrez notre application révolutionnaire conçue pour les domaines viticoles et les maisons de champagne. Gérez votre exploitation avec élégance et précision.' },
        { id: 3, page: 'home', position: 3, type: 'titre', contenu: 'Une Application Pensée pour Votre Domaine' },
        { id: 4, page: 'home', position: 4, type: 'texte', contenu: 'Suivez vos parcelles, optimisez vos vendanges, gérez vos stocks et analysez vos données viticoles en temps réel.' },
        { id: 5, page: 'produit', position: 1, type: 'titre', contenu: 'Fonctionnalités Premium' },
        { id: 6, page: 'produit', position: 2, type: 'texte', contenu: 'Gestion des parcelles • Suivi des vendanges • Analyse météo • Gestion des stocks • Traçabilité complète' },
        { id: 7, page: 'contact', position: 1, type: 'titre', contenu: 'Contactez-Nous' },
        { id: 8, page: 'contact', position: 2, type: 'texte', contenu: 'Notre équipe est à votre écoute pour vous accompagner dans votre transformation digitale.' }
      ];
    }
  },

  // Authentification admin
  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error('Identifiants incorrects');
      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      return data;
    } catch (error) {
      // Mode démo : accepte admin/admin
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('adminToken', 'demo-token');
        return { token: 'demo-token' };
      }
      throw error;
    }
  },

  // Créer un contenu
  async createContent(content) {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });
      return await response.json();
    } catch (error) {
      // Mode démo
      return { ...content, id: Date.now() };
    }
  },

  // Mettre à jour un contenu
  async updateContent(id, content) {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/content/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });
      return await response.json();
    } catch (error) {
      return { ...content, id };
    }
  },

  // Supprimer un contenu
  async deleteContent(id) {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_BASE_URL}/content/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      return true; // Mode démo
    }
  }
};

export default apiService;