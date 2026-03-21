import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import './AdminPanel.css';
import { Settings, User, Lock, Save, LogOut } from 'lucide-react';

const AdminPanel = ({ onClose }) => {
  const { data, updateData, isAdmin, setIsAdmin } = usePortfolio();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({ ...data });

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Neha Vaghela' && password === 'NEHA') {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSave = () => {
    updateData(formData);
    alert('Global Settings saved successfully!');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    onClose();
  };

  if (!isAdmin) {
    return (
      <div className="admin-overlay">
        <div className="admin-login-box glass-panel">
          <div className="admin-header">
            <Settings className="accent-teal" size={32} />
            <h2>Admin Content System</h2>
          </div>
          {error && <p className="error-text">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label><User size={16} /> Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Neha Vaghela" required />
            </div>
            <div className="form-group">
              <label><Lock size={16} /> Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="NEHA" required />
            </div>
            <div className="admin-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overlay">
      <div className="admin-dashboard glass-panel">
        <div className="admin-dashboard-header">
          <h2><Settings size={24} /> Admin Active</h2>
          <div className="dashboard-actions" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleSave}><Save size={16} /> Save Settings</button>
            <button className="btn btn-secondary" onClick={onClose} style={{ background: 'var(--accent-teal)', color: '#050b14', border: 'none' }}>Return to Website (Keep Editing)</button>
            <button className="btn btn-secondary" onClick={handleLogout} style={{ border: '1px solid #ef4444', color: '#ef4444', background: 'transparent' }}><LogOut size={16} /> Log Out</button>
          </div>
        </div>

        <div className="admin-scroll-area">
          <section className="admin-section">
            <h3>Global Configuration</h3>
            <div className="form-group">
              <label>Theme Color Palette</label>
              <select 
                value={formData.themeColor} 
                onChange={(e) => setFormData({...formData, themeColor: e.target.value})}
              >
                <option value="teal-purple">Teal & Purple (Default)</option>
                <option value="blue-cyan">Blue & Cyan</option>
                <option value="pink-orange">Pink & Orange</option>
                <option value="green-emerald">Green & Emerald</option>
              </select>
            </div>
            <div className="form-group">
              <label>Upload Global Resume (PDF/DOC under 2MB)</label>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (file.size > 2 * 1024 * 1024) {
                      alert("File is too large! Please select a file under 2MB.");
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setFormData({...formData, resumeLink: event.target.result});
                      alert("File loaded. Click 'Save Settings' to apply.");
                    };
                    reader.readAsDataURL(file);
                  }
                }} 
              />
              {formData.resumeLink && formData.resumeLink !== '#' && formData.resumeLink.startsWith('data:') && (
                <small style={{ color: 'var(--accent-teal)' }}>Resume file loaded locally.</small>
              )}
            </div>
            <div className="form-group">
              <label>Hero Welcome Title</label>
              <input 
                type="text" 
                value={formData.heroName} 
                onChange={(e) => setFormData({...formData, heroName: e.target.value})} 
              />
            </div>
          </section>

          <div className="admin-note">
            <p><strong>Note:</strong> You are now in Admin Mode! Close this panel and look at your Portfolio. You will now see "Edit" buttons directly on your Projects, Skills, and Certifications for inline editing!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
