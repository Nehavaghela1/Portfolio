import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import WelcomeScreen from './components/WelcomeScreen';
import CustomCursor from './components/CustomCursor';
import AdminPanel from './components/AdminPanel';
import ModernBackground from './components/ModernBackground';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  // Allow preventing scroll while welcome screen is active
  useEffect(() => {
    if (showWelcome || showAdmin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showWelcome, showAdmin]);

  // Check for admin hash on load and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
      }
    };
    
    // Initial check
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const closeAdmin = () => {
    window.location.hash = '';
    setShowAdmin(false);
  };

  return (
    <PortfolioProvider>
      <ModernBackground />
      <CustomCursor />
      {showAdmin && <AdminPanel onClose={closeAdmin} />}
      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}
      <div className="app-container">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Neha Vaghela. All rights reserved.</p>
        </footer>
      </div>
    </PortfolioProvider>
  );
}

export default App;
