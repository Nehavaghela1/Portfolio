import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Save, Trash2, Image } from 'lucide-react';
import './AdminPanel.css'; 

const AdminEditorModal = ({ type, item, onClose }) => {
  const { data, updateData } = usePortfolio();
  
  // Default templates for new items
  const defaultTemplates = {
    projects: { title: '', short: '', iconCategory: 'Cpu', description: '', tags: [], github: '', live: '', bg: 'linear-gradient(135deg, #0f172a, #1e293b)', image: '' },
    certifications: { title: '', issuer: '', link: '' },
    experience: { title: '', company: '', period: '', description: '' },
    techCategories: { title: '', items: '' } // For Skills
  };

  const [formData, setFormData] = useState(item || defaultTemplates[type] || {});
  const isNew = !item;

  const handleSave = () => {
    let updatedList = [...data[type]];
    
    if (isNew) {
      updatedList.push({ ...formData, id: Date.now().toString() });
    } else {
      updatedList = updatedList.map(existing => existing.id === item.id ? formData : existing);
    }
    
    updateData({ [type]: updatedList });
    onClose();
  };

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete this item?")) {
      const updatedList = data[type].filter(existing => existing.id !== item.id);
      updateData({ [type]: updatedList });
      onClose();
    }
  };

  // Helper to safely handle array inputs like tags
  const handleArrayChange = (key, val) => {
    const arr = val.split(',').map(s => s.trim());
    setFormData({...formData, [key]: arr});
  };

  return (
    <div className="admin-overlay">
      <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>{isNew ? `Add New` : `Edit`} {type.slice(0, -1)}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
          
          {Object.keys(formData).filter(k => k !== 'id').map(key => {
            
            if (key === 'iconCategory') {
              return (
                <div key={key} className="form-group">
                  <label><Image size={14} style={{ display: 'inline', marginRight: '5px' }} /> Select Icon</label>
                  <select 
                    value={formData[key]} 
                    onChange={e => setFormData({...formData, [key]: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  >
                    <option value="Bot" style={{ color: 'black' }}>Robot (AI / Bot)</option>
                    <option value="Cpu" style={{ color: 'black' }}>CPU (Hardware / General Tech)</option>
                    <option value="MessageSquare" style={{ color: 'black' }}>Chat Bubble (NLP / Language)</option>
                    <option value="Database" style={{ color: 'black' }}>Database (Data / Backend)</option>
                    <option value="LineChart" style={{ color: 'black' }}>Line Chart (Analytics / BI)</option>
                    <option value="TrendingUp" style={{ color: 'black' }}>Trending Up (Finance / Stocks)</option>
                  </select>
                </div>
              );
            }

            if (key === 'bg') {
              return (
                <div key={key} className="form-group">
                  <label>Background Gradient (CSS)</label>
                  <input 
                    type="text" 
                    value={formData[key]} 
                    onChange={e => setFormData({...formData, [key]: e.target.value})}
                    placeholder="linear-gradient(135deg, #0f172a, #1e293b)"
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                </div>
              )
            }

            if (key === 'tags') {
              return (
                <div key={key} className="form-group">
                  <label>Tags (Comma separated)</label>
                  <input 
                    type="text" 
                    value={(formData[key] || []).join(', ')} 
                    onChange={e => handleArrayChange(key, e.target.value)}
                    placeholder="Python, Flask, NLP"
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                </div>
              )
            }

            if (key === 'image') {
              return (
                <div key={key} className="form-group">
                  <label>Background Image URL</label>
                  
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <select 
                      onChange={e => {
                        if(e.target.value) setFormData({...formData, [key]: e.target.value});
                      }}
                      style={{ flex: 1, padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    >
                      <option value="" style={{color: 'black'}}>-- Select Built-in Placeholder --</option>
                      <option value="/images/projects/future_ai.png" style={{color: 'black'}}>AI / ML Placeholder</option>
                      <option value="/images/projects/future_data.png" style={{color: 'black'}}>Data / Backend Placeholder</option>
                      <option value="/images/projects/future_web.png" style={{color: 'black'}}>Web / UI Placeholder</option>
                      <option value="/images/projects/future_mobile.png" style={{color: 'black'}}>Mobile / FinTech Placeholder</option>
                    </select>
                  </div>

                  <input 
                    type="text" 
                    value={formData[key] || ''} 
                    onChange={e => setFormData({...formData, [key]: e.target.value})}
                    placeholder="Or type custom path (e.g. /images/projects/my_img.png)"
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '8px' }}
                  />
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', lineHeight: '1.5' }}>
                    <strong style={{ color: '#0ea5e9' }}>🤖 Pro AI Image Prompts (Copy & Paste):</strong><br/>
                    
                    <span style={{color: '#facc15', fontWeight: 'bold'}}>1. For Data Science & AI:</span><br/>
                    "A sleek, modern, glassmorphism UI banner conceptualizing <strong>[Your AI Project Name]</strong>. Premium dark mode aesthetic with glowing emerald and teal neon data lines, and futuristic neural network connections. No text."<br/><br/>
                    
                    <span style={{color: '#c084fc', fontWeight: 'bold'}}>2. For Web Apps & Visual Portfolios:</span><br/>
                    "A sleek, modern, glassmorphism UI banner conceptualizing <strong>[Your Web Project Name]</strong>. Premium dark mode aesthetic with elegant neon purple and cyan floating UI elements and dynamic glass panels. No text."<br/><br/>
                    
                    <span style={{color: '#fb923c', fontWeight: 'bold'}}>3. For Analytics & Dashboards:</span><br/>
                    "A sleek, modern, glassmorphism UI banner conceptualizing <strong>[Your Dashboard Project]</strong>. Premium dark mode aesthetic with glowing orange and blue isometric charts, abstract data pipelines, and a high-end corporate feel. No text."
                  </div>
                </div>
              )
            }

            return (
              <div key={key} className="form-group">
                <label style={{ textTransform: 'capitalize' }}>
                  {key === 'live' ? 'Live URL (Leave blank if none)' : key}
                </label>
                {key === 'description' ? (
                  <textarea 
                    value={formData[key] || ''} 
                    onChange={e => setFormData({...formData, [key]: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', minHeight: '100px' }}
                  />
                ) : (
                  <input 
                    type="text" 
                    value={formData[key] || ''} 
                    onChange={e => setFormData({...formData, [key]: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          {!isNew && (
            <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444' }} onClick={handleDelete}>
              <Trash2 size={16} /> Delete
            </button>
          )}
          <button className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem' }} onClick={handleSave}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditorModal;
