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
        id: 'proj-health-genai',
        title: "Health GenAI – RAG Chatbot",
        short: "Health GenAI",
        iconCategory: "MessageSquare",
        description: "Built and deployed a RAG-based healthcare chatbot using Python, Ollama, embeddings, vector search, and FastAPI. Processed data from 9 organizations and chunked 147+ documents. Dockerized and deployed on Vercel.",
        tags: ["Python", "Ollama", "RAG", "FastAPI"],
        github: "https://github.com/Nehavaghela1/Health-Gennie",
        live: "https://health-genrativeai.vercel.app/",
        bg: "linear-gradient(135deg, #022c22, #064e3b)",
        image: "/images/projects/future_ai.png"
      },
      {
        id: 'proj-1',
        title: "AI Search Chatbot",
        short: "Search AI",
        iconCategory: "Bot",
        description: "Chatbot that answers user questions using Google Custom Search API. Built with Flask.",
        tags: ["Python", "Flask"],
        github: "https://github.com/Nehavaghela1/Google-search-chatbot",
        live: null,
        bg: "linear-gradient(135deg, #0f172a, #1e293b)",
        image: "/images/projects/proj1.png"
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
        bg: "linear-gradient(135deg, #1e1b4b, #312e81)",
        image: "/images/projects/proj2.png"
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
        bg: "linear-gradient(135deg, #022c22, #064e3b)",
        image: "/images/projects/proj3.png"
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
        bg: "linear-gradient(135deg, #3b0764, #581c87)",
        image: "/images/projects/proj4.png"
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
        bg: "linear-gradient(135deg, #4c1d95, #2e1065)",
        image: "/images/projects/proj5.png"
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
        bg: "linear-gradient(135deg, #082f49, #0c4a6e)",
        image: "/images/projects/proj6.png"
      },
      {
        id: 'proj-7',
        title: "Interior Recommendation System",
        short: "Interior Recsys",
        iconCategory: "Database",
        description: "Developed a content-based recommendation engine using TF-IDF and cosine similarity with custom weighted scoring (category, style, price, size)",
        tags: ["Machine Learning", "TF-IDF"],
        github: "https://github.com/Nehavaghela1/Furniture_Recommendation_system",
        live: "https://interior-recommender.streamlit.app/",
        bg: "linear-gradient(135deg, #065f46, #064e3b)",
        image: "/images/projects/proj7.png"
      }
    ],
    experience: [
      {
        id: 'exp-podium',
        title: "AI/ML Intern",
        company: "Podium Square",
        period: "Mar 2026 – May 2026",
        description: "Developed an AI-powered 2D floor plan to 3D visualization system using Python and OpenCV for detecting walls, windows, and doors from architectural layouts. Built image processing pipelines and converted floor plan data into 3D GLB models for real-time visualization workflows. Created a furniture recommendation system based on user preferences.",
        tags: ["Python", "OpenCV", "AI/ML", "3D Visualization"]
      },
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
      { id: 'tc-new-1', title: "Programming", items: "Python, SQL" },
      { id: 'tc-new-2', title: "AI / ML", items: "Machine Learning, Feature Engineering, Model Evaluation, Embeddings" },
      { id: 'tc-new-3', title: "GenAI & NLP", items: "RAG, Tokenization, spaCy, NLTK, Transformers, Hugging Face" },
      { id: 'tc-new-4', title: "Backend", items: "FastAPI, Docker, Vercel Deployment" },
      { id: 'tc-new-5', title: "Databases", items: "MySQL, PostgreSQL, Vector Databases (FAISS, ChromaDB)" },
      { id: 'tc-new-6', title: "Cloud", items: "AWS" },
      { id: 'tc-new-7', title: "Vision", items: "OpenCV, Image Processing, Trimesh, 2D-to-3D Floorplan" },
      { id: 'tc-new-8', title: "Data & BI", items: "Pandas, NumPy, Power BI, Excel" },
      { id: 'tc-new-9', title: "Tools", items: "Git, GitHub, Ollama, VS Code" }
    ]
  };

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolioDataV3');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge any new default projects that aren't in localStorage yet
      const existingIds = new Set((parsed.projects || []).map(p => p.id));
      const missingProjects = defaultData.projects.filter(p => !existingIds.has(p.id));
      if (missingProjects.length > 0) {
        parsed.projects = [...missingProjects, ...(parsed.projects || [])];
      }
      
      const existingExpIds = new Set((parsed.experience || []).map(e => e.id));
      const missingExp = defaultData.experience.filter(e => !existingExpIds.has(e.id));
      if (missingExp.length > 0) {
        parsed.experience = [...missingExp, ...(parsed.experience || [])];
      }

      // Overwrite tech categories with the new set if they don't have the new IDs
      const hasNewTech = (parsed.techCategories || []).some(t => t.id.startsWith('tc-new-'));
      if (!hasNewTech) {
        // Filter out old defaults, keep any custom ones they might have added
        const customTech = (parsed.techCategories || []).filter(t => !t.id.startsWith('tc-'));
        parsed.techCategories = [...defaultData.techCategories, ...customTech];
      } else {
        const existingTechIds = new Set((parsed.techCategories || []).map(t => t.id));
        const missingTech = defaultData.techCategories.filter(t => !existingTechIds.has(t.id));
        if (missingTech.length > 0) {
          parsed.techCategories = [...(parsed.techCategories || []), ...missingTech];
        }
      }
      
      // Inject missing images from default templates
      if (parsed.projects) {
        parsed.projects = parsed.projects.map(p => {
          const defaultProj = defaultData.projects.find(dp => dp.id === p.id);
          if (defaultProj && defaultProj.image && !p.image) {
            return { ...p, image: defaultProj.image };
          }
          return p;
        });
      }
      return parsed;
    }
    return defaultData;
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
