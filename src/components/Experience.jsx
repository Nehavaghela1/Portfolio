import React, { useState } from 'react';
import { Briefcase, Calendar, ChevronRight, Edit, Plus } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import AdminEditorModal from './AdminEditorModal';
import './Experience.css';

const Experience = () => {
  const ref = useScrollReveal();
  const { data, isAdmin } = usePortfolio();
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const experiences = data.experience || [];

  return (
    <section id="experience" className="experience-section section-padding">
      <div className="container" ref={ref}>
        <h2 className="section-title reveal">Experience <span className="gradient-text">& Internships</span></h2>
        
        <div className="experience-timeline reveal reveal-delay-1">
          <div className="experience-line"></div>
          
          {experiences.map((exp, index) => (
            <div key={exp.id || index} style={{ position: 'relative', marginBottom: '2rem' }}>
              <div className="glass-panel experience-card">
                {isAdmin && (
                  <button 
                    onClick={() => setEditingItem(exp)}
                    className="admin-edit-action"
                  >
                    <Edit size={14} /> Edit
                  </button>
                )}
                
                <div className="exp-icon">
                  <Briefcase size={24} />
                </div>
                <div className="exp-header">
                  <div className="exp-title">
                    <h3>{exp.title}</h3>
                    <p className="company">{exp.company}</p>
                  </div>
                  <div className="exp-date">{exp.period}</div>
                </div>
                
                <p style={{ marginTop: '1rem', color: '#94a3b8', lineHeight: '1.6' }}>
                  {exp.description}
                </p>
                
                {exp.tags && exp.tags.length > 0 && (
                  <div className="exp-tech" style={{ marginTop: '1rem' }}>
                    {exp.tags.map(t => <span key={t}>{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isAdmin && (
            <div style={{ position: 'relative', marginTop: '3rem' }}>
              <div 
                className="glass-panel experience-card" 
                onClick={() => setIsAdding(true)} 
                style={{ cursor: 'pointer', border: '1px dashed rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)' }}>
                  <Plus size={32} />
                  <span>Add Experience / Internship</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {editingItem && (
        <AdminEditorModal 
          type="experience" 
          item={editingItem} 
          onClose={() => setEditingItem(null)} 
        />
      )}
      
      {isAdding && (
        <AdminEditorModal 
          type="experience" 
          item={null} 
          onClose={() => setIsAdding(false)} 
        />
      )}
    </section>
  );
};

export default Experience;
