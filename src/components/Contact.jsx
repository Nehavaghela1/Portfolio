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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Web3Forms API Integration
    // To make this work, sign up at web3forms.com and replace YOUR_ACCESS_KEY_HERE
    const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          ...formData
        })
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error("Web3Forms Error:", result);
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
    }
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
          
          <form className="contact-form glass-panel reveal reveal-delay-2" onSubmit={handleSubmit}>
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
            
            <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p style={{ color: 'var(--accent-teal)', marginTop: '1rem', textAlign: 'center' }}>Message sent successfully!</p>}
            {status === 'error' && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>Something went wrong. Please try again or ensure your Access Key is set.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
