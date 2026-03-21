import React from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Hero.css';

const Hero = () => {
  const ref = useScrollReveal();

  return (
    <section id="home" className="hero-modern">
      <div className="container hero-container-modern" ref={ref}>
        <div className="hero-content-modern reveal">
          <div className="modern-badge mb-2">
            <span className="pulse-dot"></span>
            ASPIRING DATA & AI LEARNER
          </div>

          <h1 className="hero-title-modern">
            NEHA <br />
            <span className="gradient-text">VAGHELA</span>
          </h1>

          <p className="hero-description-modern">
            Passionate student exploring data science, machine learning, and web development.
            Always eager to learn new technologies and build innovative projects.
            Based in Ahmedabad, India.
          </p>

          <div className="hero-social-links" style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
            <a href="https://linkedin.com/in/vaghela-neha/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-teal)' }}>
              <Linkedin size={28} />
            </a>
            <a href="https://github.com/Nehavaghela1" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-purple)' }}>
              <Github size={28} />
            </a>
            <a href="mailto:vaghela.neha@example.com" style={{ color: 'var(--accent-pink)' }}>
              <Mail size={28} />
            </a>
          </div>

          <div className="hero-actions-modern mt-4">
            <a href="#projects" className="modern-btn primary">
              Explore Work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="modern-btn secondary">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
