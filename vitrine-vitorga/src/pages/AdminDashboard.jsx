import React, { useState } from 'react';
import { Edit3, Plus, Trash2, ChevronUp, ChevronDown, LogOut } from 'lucide-react';
import apiService from '../api/apiService';

const AdminDashboard = ({ content, setContent, onLogout }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    page: 'home',
    type: 'titre',
    position: 1,
    contenu: ''
  });

  const handleSubmit = async () => {
    if (editingItem) {
      // Mise à jour
      await apiService.updateContent(editingItem.id, formData);
      setContent(content.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
      setEditingItem(null);
    } else {
      // Création
      const newItem = await apiService.createContent(formData);
      setContent([...content, newItem]);
    }
    
    setFormData({ page: 'home', type: 'titre', position: 1, contenu: '' });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      page: item.page,
      type: item.type,
      position: item.position,
      contenu: item.contenu
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet élément ?')) {
      await apiService.deleteContent(id);
      setContent(content.filter(item => item.id !== id));
    }
  };

  const handleMove = async (item, direction) => {
    const newPosition = direction === 'up' ? item.position - 1 : item.position + 1;
    if (newPosition < 1) return;
    
    await apiService.updateContent(item.id, { ...item, position: newPosition });
    setContent(content.map(i => i.id === item.id ? { ...i, position: newPosition } : i));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingItem ? 'Modifier' : 'Ajouter'} un contenu
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Page</label>
                <select 
                  value={formData.page}
                  onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="home">Accueil</option>
                  <option value="produit">Produit</option>
                  <option value="contact">Contact</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="titre">Titre</option>
                  <option value="texte">Texte</option>
                  <option value="image">Image</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <input 
                  type="number"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded-lg"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {formData.type === 'image' ? 'URL de l\'image' : 'Contenu'}
                </label>
                {formData.type === 'texte' ? (
                  <textarea 
                    value={formData.contenu}
                    onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    rows="4"
                  />
                ) : (
                  <input 
                    type="text"
                    value={formData.contenu}
                    onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-vine-green text-white py-2 rounded-lg hover:bg-vine-green/90 flex items-center justify-center gap-2"
                >
                  {editingItem ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingItem ? 'Mettre à jour' : 'Ajouter'}
                </button>
                {editingItem && (
                  <button 
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({ page: 'home', type: 'titre', position: 1, contenu: '' });
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Liste des contenus */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Contenus existants</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {content.sort((a, b) => {
                if (a.page !== b.page) return a.page.localeCompare(b.page);
                return a.position - b.position;
              }).map((item) => (
                <div key={item.id} className="border p-4 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs bg-golden/20 text-golden px-2 py-1 rounded mr-2">
                        {item.page}
                      </span>
                      <span className="text-xs bg-vine-green/20 text-vine-green px-2 py-1 rounded">
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">Pos: {item.position}</span>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleMove(item, 'up')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Monter"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleMove(item, 'down')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Descendre"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-1 hover:bg-blue-100 rounded"
                      >
                        <Edit3 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{item.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;