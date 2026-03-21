import React, { useState } from 'react';
import { Award, CheckCircle, ExternalLink, Edit, Plus } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import AdminEditorModal from './AdminEditorModal';
import './Certifications.css';

const Certifications = () => {
  const ref = useScrollReveal();
  const { data, isAdmin } = usePortfolio();
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const certs = data.certifications || [];


  return (
    <section id="certifications" className="certifications-section section-padding">
      <div className="container" ref={ref}>
        <h2 className="section-title reveal">Certifications</h2>

        <div className="certs-grid">
          {certs.map((cert, index) => {
            const CardWrapper = cert.link ? 'a' : 'div';
            const extraProps = cert.link ? { href: cert.link, target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <CardWrapper key={cert.id || index} className={`glass-panel cert-card reveal reveal-delay-${(index % 3) + 1}`} {...extraProps}>
                {isAdmin && (
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditingItem(cert); }}
                    className="admin-edit-action tooltip-container"
                    style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 100 }}
                  >
                    <Edit size={16} />
                  </button>
                )}
                
                <div className="cert-content">
                  <div className="cert-icon-wrap">
                    <Award className="cert-icon" />
                  </div>
                  <div className="cert-text">
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-issuer">{cert.issuer}</p>
                  </div>
                </div>
                <div className="cert-action">
                  {cert.link ? (
                    <span className="verify-badge">
                      Verify <ExternalLink size={14} />
                    </span>
                  ) : (
                    <CheckCircle className="cert-check" size={20} />
                  )}
                </div>
              </CardWrapper>
            );
          })}

          {isAdmin && (
            <div className="glass-panel cert-card add-new-cert" onClick={() => setIsAdding(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '150px', border: '1px dashed rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)' }}>
                <Plus size={32} />
                <span>Add Certification</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {editingItem && (
        <AdminEditorModal 
          type="certifications" 
          item={editingItem} 
          onClose={() => setEditingItem(null)} 
        />
      )}
      
      {isAdding && (
        <AdminEditorModal 
          type="certifications" 
          item={null} 
          onClose={() => setIsAdding(false)} 
        />
      )}
    </section>
  );
};

export default Certifications;
