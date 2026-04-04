import React, { useState } from 'react';
import { ExternalLink, Github, Bot, Cpu, MessageSquare, Database, LineChart, TrendingUp, Edit, Plus } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import AdminEditorModal from './AdminEditorModal';
import './Projects.css';

const IconMap = { Bot, Cpu, MessageSquare, Database, LineChart, TrendingUp };

const Projects = () => {
  const ref = useScrollReveal();
  const [activeIdx, setActiveIdx] = useState(0);
  const { data, isAdmin } = usePortfolio();
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const projects = data.projects || [];



  return (
    <section id="projects" className="projects-accordion-section section-padding">
      <div className="container" ref={ref}>
        <div className="accordion-header reveal">
          <h2 className="section-title-modern">
            Featured <span className="gradient-text">Work</span>
          </h2>
        </div>

        <div className="accordion-container reveal reveal-delay-1">
          {projects.map((project, index) => {
            const isActive = activeIdx === index;
            const IconCmp = IconMap[project.iconCategory] || Bot;
            
            return (
              <div 
                key={project.id || index}
                className={`accordion-panel ${isActive ? 'active' : ''}`}
                style={{ 
                  background: project.image 
                    ? `linear-gradient(to bottom, rgba(10,15,30,0.3), rgba(10,15,30,0.7)), url(${project.image}) center/cover no-repeat` 
                    : (project.bg || "rgba(10,15,30,0.95)"), 
                  border: "1px solid rgba(255,255,255,0.08)", 
                  position: 'relative' 
                }}
                onMouseEnter={() => setActiveIdx(index)}
              >
                {isAdmin && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setEditingItem(project); }}
                    className="admin-edit-action"
                  >
                    <Edit size={16} /> Edit
                  </button>
                )}

                <div className="accordion-icon-wrap">
                  <IconCmp size={28} />
                </div>
                
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    <h3 className="accordion-title">{project.title}</h3>
                    <p className="accordion-desc">{project.description}</p>
                    
                    <div className="accordion-footer">
                      <div className="accordion-tags">
                        {(project.tags || []).map(t => <span key={t}>{t}</span>)}
                      </div>
                      <div className="accordion-links">
                        {project.github && project.github !== "#" && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={20}/></a>
                        )}
                        {project.live && project.live !== "#" && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={20}/></a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-vertical-title">
                  {project.short}
                </div>
              </div>
            );
          })}
          
          {isAdmin && (
            <div className="accordion-panel add-new-panel" onClick={() => setIsAdding(true)} style={{ background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px dashed rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}>
                <Plus size={32} />
                <span>Add Project</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {editingItem && (
        <AdminEditorModal 
          type="projects" 
          item={editingItem} 
          onClose={() => setEditingItem(null)} 
        />
      )}
      
      {isAdding && (
        <AdminEditorModal 
          type="projects" 
          item={null} 
          onClose={() => setIsAdding(false)} 
        />
      )}
    </section>
  );
};

export default Projects;
