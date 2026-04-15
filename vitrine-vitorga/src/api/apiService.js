const API_BASE_URL = 'https://v1-vitorga-vitrine.onrender.com';

const apiService = {
  async getContent() {
    const response = await fetch(`${API_BASE_URL}/content`);
    return response.json();
  },

  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Identifiants incorrects');
    const data = await response.json();
    localStorage.setItem('adminToken', data.token);
    return data;
  },

  async createContent(content) {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });
    return response.json();
  },

  async updateContent(id, content) {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/content/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });
    return response.json();
  },

  async deleteContent(id) {
    const token = localStorage.getItem('adminToken');
    await fetch(`${API_BASE_URL}/content/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return true;
  },
};

export default apiService;