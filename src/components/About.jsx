import React, { useState } from 'react';
import { Sparkles, GraduationCap, BookOpen, Award, Cpu, Brain, Terminal, Database, LineChart, Lightbulb, Zap, Linkedin, FileText, Edit } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import AdminEditorModal from './AdminEditorModal';
import './About.css';

const About = () => {
  const ref = useScrollReveal();
  const { data, updateData, isAdmin } = usePortfolio();
  const [editingSkill, setEditingSkill] = useState(null);
  
  const techCategories = data.techCategories || [];

  const softSkillsArray = ["Analytical Thinking", "Problem Solving", "Business Communication", "Attention to Detail", "Learning Agility", "Analytical Thinking", "Problem Solving"];

  return (
    <section id="about" className="about-compact section-padding">
      <div className="container" ref={ref}>
        <div className="bento-grid">
          
          {/* Card 1: About Me (Spans 2 columns) */}
          <div className="bento-item bento-about reveal reveal-delay-1">
            <div className="bento-header">
              <Sparkles className="bento-icon accent-teal" size={28} />
              <h2 className="bento-title">
                About <span className="gradient-text">Me</span>
              </h2>
            </div>
            <div className="about-content-visual">
              <p className="bento-text">
                I am an <strong className="highlight-text">aspiring tech enthusiast</strong> with a strong learning mindset, currently diving deep into the world of Data and AI.  
                I am actively learning to build predictive models, explore Python development, and uncover actionable insights from raw data. 
                I love taking on new challenges to expand my skillset.
              </p>
              <div className="tech-stats">
                <div className="stat-box">
                  <span className="stat-num">AI/ML</span>
                  <span className="stat-label">Learning</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num">Data</span>
                  <span className="stat-label">Exploring</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num">Web</span>
                  <span className="stat-label">Building</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Education (Spans 1 column) */}
          <div className="bento-item bento-edu reveal reveal-delay-2">
            <div className="bento-header">
              <GraduationCap className="bento-icon accent-purple" size={24} />
              <h3 className="bento-label">Education</h3>
            </div>
            <div className="edu-visual-list">
               <div className="edu-visual-card">
                 <div className="edu-icon-wrap"><BookOpen size={18} /></div>
                 <div className="edu-details">
                   <strong>MSC IT (FinTech)</strong>
                   <p>JG University <span className="edu-year">[2024-2026]</span></p>
                 </div>
               </div>
               <div className="edu-visual-card">
                 <div className="edu-icon-wrap"><Award size={18} /></div>
                 <div className="edu-details">
                   <strong>B.Com (Accounts)</strong>
                   <p>Gujarat University <span className="edu-year">[2021-2024]</span></p>
                 </div>
               </div>
            </div>
          </div>

          {/* Card 3: Technical Orbit (Spans 2 columns) */}
          <div className="bento-item bento-tech reveal reveal-delay-3">
             <div className="bento-header">
              <Cpu className="bento-icon accent-pink" size={24} />
              <h3 className="bento-label">Technical Orbit</h3>
            </div>
            <div className="solar-system-wrap">
              <div className="center-core">
                <Brain size={32} className="accent-teal core-icon" />
                <span className="core-label">AI Node</span>
              </div>
              
              <div className="orbit-ring">
                {techCategories.map((tech, i) => {
                  let TechIcon = Brain;
                  let iconColorClass = "accent-pink";
                  if (tech.title === "Dev") { TechIcon = Terminal; iconColorClass = "accent-teal"; }
                  if (tech.title === "Data") { TechIcon = Database; iconColorClass = "accent-purple"; }
                  if (tech.title === "BI") { TechIcon = LineChart; iconColorClass = "accent-pink"; }
                  
                  return (
                    <div key={i} className={`orbit-planet planet-wrap-${i}`}>
                      <div className={`planet-content planet-content-${i}`} tabIndex="0">
                        <div className={`planet-icon-bg`}>
                          <TechIcon size={22} className={iconColorClass} />
                        </div>
                        <div className="planet-tooltip">
                          <strong className="planet-title">{tech.title}</strong>
                          <p className="planet-items">{tech.items}</p>
                          {isAdmin && (
                            <button 
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditingSkill(tech); }}
                              style={{ marginTop: '0.5rem', background: 'rgba(234,179,8,0.2)', color: '#facc15', border: '1px solid currentColor', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Edit size={10} /> Edit Category
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 4: Soft Skills (Spans 1 column) */}
          <div className="bento-item bento-soft reveal reveal-delay-3">
             <div className="bento-header">
              <Lightbulb className="bento-icon accent-teal" size={24} />
              <h3 className="bento-label">Core Strengths</h3>
            </div>
            <div className="soft-skills-visual">
              {["Analytical Thinking", "Problem Solving", "Attention to Detail", "Learning Agility"].map((skill, index) => (
                <div key={index} className="skill-meter">
                  <div className="skill-meter-header">
                    <span className="skill-name">{skill}</span>
                    <Zap size={14} className="accent-teal" />
                  </div>
                  <div className="skill-progress-bg">
                    <div className="skill-progress-fill" style={{ width: `${85 + (index * 5)}%`, animationDelay: `${index * 0.2}s` }}></div>
                  </div>
                </div>
              ))}
              
              <div className="linkedin-integration" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <a href="https://www.linkedin.com/in/vaghela-neha/" target="_blank" rel="noopener noreferrer" className="linkedin-btn">
                  <Linkedin size={18} />
                  <span>Connect on LinkedIn</span>
                </a>
                {data.resumeLink && data.resumeLink !== '#' && (
                  <a href={data.resumeLink} target="_blank" rel="noopener noreferrer" className="resume-download-btn" download="Neha_Vaghela_Resume">
                    <FileText size={18} />
                    <span>Download Resume</span>
                  </a>
                )}
                {isAdmin && (
                  <>
                    <input 
                      type="file" 
                      id="resume-upload-input" 
                      style={{ display: 'none' }} 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (file.size > 2 * 1024 * 1024) {
                            alert("File is too large! Please select a file under 2MB for local storage.");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            updateData({ resumeLink: event.target.result });
                            alert("Resume uploaded successfully!");
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <button className="admin-edit-btn" onClick={() => document.getElementById('resume-upload-input').click()}>
                      <Edit size={14} /> Upload Resume File
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {editingSkill && (
        <AdminEditorModal 
          type="techCategories" 
          item={editingSkill} 
          onClose={() => setEditingSkill(null)} 
        />
      )}
    </section>
  );
};

export default About;
