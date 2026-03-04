import React, { useState } from 'react';
import { Edit3, Plus, Trash2, ChevronUp, ChevronDown, LogOut } from 'lucide-react';
import apiService from '../api/apiService';
import ContentRenderer from '../components/ContentRenderer';

// Labels lisibles pour les types
const TYPE_LABELS = {
  titre: '🟢 Titre vert',
  titre_golden: '🟡 Titre doré',
  texte: '📝 Texte normal',
  carte: '🃏 Carte (page produit)',
  image: '🖼️ Image (URL)',
};

const PAGE_LABELS = {
  home: 'Accueil',
  produit: 'Produit',
  contact: 'Contact',
};

const AdminDashboard = ({ content, setContent, onLogout }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [previewPage, setPreviewPage] = useState('home');
  const [formData, setFormData] = useState({
    page: 'home',
    type: 'titre_golden',
    position: 1,
    contenu: '',
  });

  const handleSubmit = async () => {
    if (!formData.contenu.trim()) return;

    if (editingItem) {
      await apiService.updateContent(editingItem.id, formData);
      setContent(content.map(item =>
        item.id === editingItem.id ? { ...item, ...formData } : item
      ));
      setEditingItem(null);
    } else {
      const newItem = await apiService.createContent(formData);
      setContent([...content, newItem]);
    }
    setFormData({ page: 'home', type: 'titre_golden', position: 1, contenu: '' });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      page: item.page,
      type: item.type,
      position: item.position,
      contenu: item.contenu,
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
      <div className="max-w-7xl mx-auto">

        {/* Header */}
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

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Formulaire ── */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingItem ? '✏️ Modifier' : '➕ Ajouter'} un contenu
            </h2>
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">Page</label>
                <select
                  value={formData.page}
                  onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  {Object.entries(PAGE_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type de contenu</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  {Object.entries(TYPE_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                {/* Aide contextuelle */}
                {formData.type === 'carte' && (
                  <p className="text-xs text-amber-600 mt-1">
                    💡 Les cartes s'affichent en grille sur la page Produit
                  </p>
                )}
                {formData.type === 'image' && (
                  <p className="text-xs text-blue-600 mt-1">
                    💡 Colle l'URL complète d'une image (https://...)
                  </p>
                )}
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
                  {formData.type === 'image' ? "URL de l'image" : 'Contenu'}
                </label>
                {formData.type === 'texte' ? (
                  <textarea
                    value={formData.contenu}
                    onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    rows="4"
                    placeholder="Votre texte ici..."
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.contenu}
                    onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    placeholder={
                      formData.type === 'image'
                        ? 'https://example.com/image.jpg'
                        : formData.type === 'carte'
                        ? 'Ex: Suivi des vignes'
                        : 'Votre titre ici...'
                    }
                  />
                )}
              </div>

              {/* Aperçu inline */}
              {formData.contenu && (
                <div className="border rounded-lg p-3 bg-gray-50">
                  <p className="text-xs text-gray-400 mb-2">Aperçu :</p>
                  <ContentRenderer
                    page={formData.page}
                    content={[{ id: 'preview', ...formData }]}
                  />
                </div>
              )}

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
                      setFormData({ page: 'home', type: 'titre_golden', position: 1, contenu: '' });
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Liste des contenus ── */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Contenus existants</h2>
            <div className="space-y-3 max-h-[700px] overflow-y-auto">
              {[...content].sort((a, b) => {
                if (a.page !== b.page) return a.page.localeCompare(b.page);
                return a.position - b.position;
              }).map((item) => (
                <div key={item.id} className="border p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-golden/20 text-golden px-2 py-0.5 rounded">
                        {PAGE_LABELS[item.page]}
                      </span>
                      <span className="text-xs bg-vine-green/20 text-vine-green px-2 py-0.5 rounded">
                        {TYPE_LABELS[item.type] || item.type}
                      </span>
                      <span className="text-xs text-gray-400">#{item.position}</span>
                    </div>
                    <div className="flex gap-1 ml-2 shrink-0">
                      <button onClick={() => handleMove(item, 'up')} className="p-1 hover:bg-gray-200 rounded">
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button onClick={() => handleMove(item, 'down')} className="p-1 hover:bg-gray-200 rounded">
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button onClick={() => handleEdit(item)} className="p-1 hover:bg-blue-100 rounded">
                        <Edit3 className="w-3 h-3 text-blue-600" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-100 rounded">
                        <Trash2 className="w-3 h-3 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{item.contenu}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Aperçu de page ── */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Aperçu page</h2>
              <select
                value={previewPage}
                onChange={(e) => setPreviewPage(e.target.value)}
                className="text-sm p-1 border rounded"
              >
                {Object.entries(PAGE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50 max-h-[650px] overflow-y-auto">
              {/* Cartes séparées pour la page produit */}
              {previewPage === 'produit' ? (
                <>
                  <ContentRenderer
                    page="produit"
                    content={content.filter(i => i.type !== 'carte')}
                  />
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {content
                      .filter(i => i.page === 'produit' && i.type === 'carte')
                      .sort((a, b) => a.position - b.position)
                      .map(card => (
                        <div key={card.id} className="bg-white p-4 rounded shadow border-l-4 border-golden">
                          <p className="font-semibold text-sm text-gray-800">{card.contenu}</p>
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <ContentRenderer page={previewPage} content={content} />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;