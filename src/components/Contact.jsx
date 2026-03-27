import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

const Contact = () => {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleWhatsApp = () => {
    if (!formData.name || !formData.message) {
      alert("Please fill in your name and message first.");
      return;
    }
    const text = `Hi Neha, I am ${formData.name}.\n\n${formData.message}\n\nMy Email: ${formData.email}`;
    window.open(`https://wa.me/919313112449?text=${encodeURIComponent(text)}`, '_blank');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleEmail = () => {
    if (!formData.name || !formData.message) {
      alert("Please fill in your name and message first.");
      return;
    }
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:nehavghela347@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container" ref={ref}>
        <h2 className="section-title reveal">Get In <span className="gradient-text">Touch</span></h2>
        
        <div className="contact-container">
          <div className="contact-info glass-panel reveal reveal-delay-1">
            <h3>Contact Information</h3>
            <p className="contact-desc">
              I'm always open to discussing new opportunities, data analysis projects, or collaborations. Feel free to reach out!
            </p>
            
            <div className="contact-details">
              <a href="mailto:nehavghela347@gmail.com" className="contact-item">
                <div className="icon-box"><Mail /></div>
                <div>
                  <h4>Email</h4>
                  <p>nehavghela347@gmail.com</p>
                </div>
              </a>
              
              <a href="tel:+919313112449" className="contact-item">
                <div className="icon-box"><Phone /></div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 9313112449</p>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/vaghela-neha/" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="icon-box"><Linkedin /></div>
                <div>
                  <h4>LinkedIn</h4>
                  <p>Vaghela Neha</p>
                </div>
              </a>
              
              <a href="https://github.com/Nehavaghela1" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="icon-box"><Github /></div>
                <div>
                  <h4>GitHub</h4>
                  <p>Nehavaghela1</p>
                </div>
              </a>
            </div>
            
            <div className="location-badge">
              <span>📍 Ahmedabad, India</span>
            </div>
          </div>
          
          <form className="contact-form glass-panel reveal reveal-delay-2" onSubmit={(e) => e.preventDefault()}>
            <h3>Send Me a Message</h3>
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" value={formData.message} onChange={handleChange} placeholder="How can I help you?" required></textarea>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexDirection: 'column' }}>
              <button type="button" onClick={handleWhatsApp} className="btn submit-btn" style={{ background: '#25D366', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '700', borderRadius: '8px' }}>
                <Phone size={20} /> Send via WhatsApp
              </button>
              <button type="button" onClick={handleEmail} className="btn submit-btn" style={{ background: 'var(--accent-purple)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '700', borderRadius: '8px' }}>
                <Mail size={20} /> Send via Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
