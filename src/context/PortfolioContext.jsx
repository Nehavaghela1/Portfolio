import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  return useContext(PortfolioContext);
};

export const PortfolioProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Default Initial Data
  const defaultData = {
    themeColor: 'teal-purple',
    heroName: 'NEHA VAGHELA',
    heroSubtitle: 'ASPIRING DATA & AI LEARNER',
    resumeLink: '#',
    certifications: [
      {
        id: 'cert-1',
        title: "Data Analysis Essentials",
        issuer: "IBM",
        link: "https://www.credly.com/badges/f1a5da23-e18f-41d7-9024-9c68d3d5584a/linked_in_profile"
      },
      {
        id: 'cert-2',
        title: "Python for Data Science, AI & Development",
        issuer: "IBM",
        link: "https://www.credly.com/badges/4db18d42-7773-43e4-b622-1e8a3c68394c"
      },
      { id: 'cert-3', title: "Foundations: Data, Data Everywhere", issuer: "Google", link: null },
      { id: 'cert-4', title: "Data-driven Decision Making", issuer: "PwC", link: null },
      { id: 'cert-5', title: "Prompt Engineering for ChatGPT", issuer: "Vanderbilt University", link: null },
    ],
    projects: [
      {
        id: 'proj-1',
        title: "AI Search Chatbot",
        short: "Search AI",
        iconCategory: "Bot",
        description: "Chatbot that answers user questions using Google Custom Search API. Built with Flask.",
        tags: ["Python", "Flask"],
        github: "https://github.com/Nehavaghela1/Google-search-chatbot",
        live: null,
        bg: "linear-gradient(135deg, #0f172a, #1e293b)"
      },
      {
        id: 'proj-2',
        title: "SMART Recruitment",
        short: "NLP Resume",
        iconCategory: "Cpu",
        description: "Auto-extracts resumes & matches with job descriptions using NLP and text similarity.",
        tags: ["Python", "NLP"],
        github: "https://github.com/Nehavaghela1/smart_recruitment_system",
        live: null,
        bg: "linear-gradient(135deg, #1e1b4b, #312e81)"
      },
      {
        id: 'proj-3',
        title: "Document AI Bot",
        short: "Doc AI",
        iconCategory: "MessageSquare",
        description: "Handles text & file uploads, extracting text via PyPDF2 and responding via OpenAI.",
        tags: ["OpenAI", "OCR"],
        github: "https://github.com/Nehavaghela1/AI-Powered-Chatbot-with-File-Processing",
        live: null,
        bg: "linear-gradient(135deg, #022c22, #064e3b)"
      },
      {
        id: 'proj-4',
        title: "Customer Churn AI",
        short: "Churn ML",
        iconCategory: "Database",
        description: "End-to-end churn prediction model (80.5% accuracy) on 7k records with ROC-AUC eval.",
        tags: ["Scikit", "SQL"],
        github: "https://github.com/Nehavaghela1",
        live: null,
        bg: "linear-gradient(135deg, #3b0764, #581c87)"
      },
      {
        id: 'proj-5',
        title: "BI Dashboards",
        short: "Power BI",
        iconCategory: "LineChart",
        description: "Interactive Power BI dashboards analyzing 5k+ records to identify business KPIs.",
        tags: ["Power BI", "DAX"],
        github: "#",
        live: "#",
        bg: "linear-gradient(135deg, #4c1d95, #2e1065)"
      },
      {
        id: 'proj-6',
        title: "Stock Analytics",
        short: "FinTech",
        iconCategory: "TrendingUp",
        description: "Python dashboard using yfinance for real-time stock visualization.",
        tags: ["yfinance"],
        github: "https://github.com/Nehavaghela1/Stock-Dashboard-Visualization",
        live: "#",
        bg: "linear-gradient(135deg, #082f49, #0c4a6e)"
      }
    ],
    experience: [
      {
        id: 'exp-1',
        title: "Python Development Internship (Remote)",
        company: "Info tact Solutions",
        period: "Feb 2025 – May 2025",
        description: "Assisted in data preprocessing, cleaning, and analysis for internal tools. Supported development and testing of small automation and chatbot prototypes. Contributed to documentation, testing, and quality checks.",
        tags: ["Python", "Data Cleaning", "Automation", "Testing"]
      }
    ],
    techCategories: [
      { id: 'tc-1', title: "AI", items: "Machine Learning, Deep Learning, NLP, RAG" },
      { id: 'tc-2', title: "Dev", items: "Python, SQL, GitHub, Django, HTML, CSS" },
      { id: 'tc-3', title: "Data", items: "Cleaning, ETL, Modeling, MySQL, PostgreSQL" },
      { id: 'tc-4', title: "BI", items: "Power BI, DAX, Power Query, Tableau, MS Excel" },
    ]
  };

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolioDataV3');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioDataV3', JSON.stringify(data));
    
    // Apply Theme
    const root = document.documentElement;
    if (data.themeColor === 'teal-purple') {
      root.style.setProperty('--accent-teal', '#f59e0b'); // Instagram Amber
      root.style.setProperty('--accent-purple', '#f43f5e'); // Instagram Rose/Pink
      root.style.setProperty('--accent-pink', '#8b5cf6'); // Instagram Violet
    } else if (data.themeColor === 'blue-cyan') {
      root.style.setProperty('--accent-teal', '#0ea5e9');
      root.style.setProperty('--accent-purple', '#3b82f6');
      root.style.setProperty('--accent-pink', '#8b5cf6');
    } else if (data.themeColor === 'pink-orange') {
      root.style.setProperty('--accent-teal', '#ec4899');
      root.style.setProperty('--accent-purple', '#f43f5e');
      root.style.setProperty('--accent-pink', '#f97316');
    } else if (data.themeColor === 'green-emerald') {
      root.style.setProperty('--accent-teal', '#10b981');
      root.style.setProperty('--accent-purple', '#059669');
      root.style.setProperty('--accent-pink', '#84cc16');
    }
  }, [data]);

  const updateData = (newData) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, isAdmin, setIsAdmin }}>
      {children}
    </PortfolioContext.Provider>
  );
};
