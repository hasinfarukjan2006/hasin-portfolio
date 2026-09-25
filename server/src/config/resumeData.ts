export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  techStack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  categories?: string[];
  architectureNotes?: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  grade?: string;
  score?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  detail: string;
  type: string;
}

export const PERSONAL_INFO = {
  name: "HASIN F",
  title: "Computer Science & Engineering Student",
  headline: "Software Developer | AI/ML Enthusiast",
  email: "hasinfarukjan@gmail.com",
  phone: "+91 9344475074",
  location: "India",
  github: "https://github.com/hasinfarukjan2006",
  linkedin: "https://www.linkedin.com/in/hasin-f/",
  shortBio: "Computer Science and Engineering student with hands-on experience in software development, Artificial Intelligence, Machine Learning, and Edge AI.",
  education: {
    degree: "B.E. Computer Science & Engineering",
    institution: "M. Kumarasamy College of Engineering, Karur",
    cgpa: "7.77/10.00",
  },
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Java", "C", "Python", "JavaScript"]
  },
  {
    category: "Web",
    skills: ["HTML", "CSS", "React.js", "Node.js", "Express.js", "Flask", "REST APIs"]
  },
  {
    category: "AI / ML",
    skills: ["TensorFlow Lite", "CNN", "Librosa", "NumPy", "Pandas", "Scikit-learn"]
  },
  {
    category: "Databases",
    skills: ["SQL", "MongoDB", "PostgreSQL"]
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Docker", "AWS"]
  },
  {
    category: "Core CS",
    skills: ["Data Structures and Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Softrate Technologies Pvt. Ltd.",
    role: "Web Development Intern",
    duration: "June 2026",
    location: "Chennai",
    responsibilities: [
      "Developed and enhanced responsive web interfaces for business productivity and financial utility applications.",
      "Worked on Invoice Generator, Quote Generator, Receipt Generator, and Revenue Forecaster modules.",
      "Implemented routing, UI improvements, responsive layouts, and functional validation across 24 application pages.",
      "Used Git and GitHub for source-code management and development workflows."
    ]
  },
  {
    id: "exp-2",
    company: "CodSoft",
    role: "Full Stack Development Intern",
    duration: "July 03 – July 10, 2025",
    location: "Remote",
    responsibilities: [
      "Engaged in web development tasks utilizing full stack technologies.",
      "Built clean interactive UI components and backend routing logic.",
      "Collaborated on version control and project structure using Git."
    ]
  },
  {
    id: "exp-3",
    company: "InternPe",
    role: "Web Development Intern",
    duration: "July 07 – August 03, 2025",
    location: "Remote",
    responsibilities: [
      "Designed and developed frontend web application features using modern HTML, CSS, and JavaScript.",
      "Implemented responsive layouts and user action validations.",
      "Integrated code refactoring and modular workflow practices."
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-1",
    slug: "safecare-smart-hearing-aid",
    title: "SafeCare: AI-Based Context-Aware Smart Hearing Aid",
    subtitle: "Edge AI assistive technology for acoustic environment analysis & safety alerts",
    year: "2026",
    description: "Developing an Edge AI smart hearing-aid system for speech enhancement, environmental sound recognition, and safety alerts.",
    overview: "SafeCare is an intelligent Edge AI hearing system designed to solve traditional acoustic amplification limitations.",
    problem: "Traditional hearing aids uniformly amplify ambient sound, causing auditory discomfort in loud environments while failing to alert users to specific spatial safety hazards.",
    solution: "SafeCare employs an optimized Convolutional Neural Network (CNN) model running on TensorFlow Lite.",
    techStack: ["Python", "TensorFlow Lite", "Librosa", "CNN", "MFCC", "Raspberry Pi Zero 2 W", "INMP441 MEMS Microphones"],
    features: [
      "Environmental sound classification",
      "Speech enhancement",
      "Adaptive noise suppression",
      "Directional sound detection",
      "Emergency sound prioritization",
      "Edge AI processing"
    ],
    categories: ["Speech", "Horn", "Siren", "Music", "Traffic", "Background Noise"],
    featured: true
  },
  {
    id: "proj-2",
    slug: "aquasentinel-ai",
    title: "AquaSentinel AI: Water-Borne Disease Early Warning System",
    subtitle: "AI-enabled platform for community-level water-borne disease risk monitoring",
    year: "2026",
    description: "AI-enabled platform for community-level water-borne disease risk monitoring using health, water-quality, and rainfall data.",
    overview: "AquaSentinel AI bridges community health management with predictive machine learning.",
    problem: "Remote and underserved communities frequently experience water-borne pathogen outbreaks without timely risk advisories.",
    solution: "A Progressive Web Application (PWA) backed by a Python Flask REST API that feeds multi-source environmental metrics into machine learning predictive algorithms.",
    techStack: ["React.js", "Flask", "Python", "REST API", "JavaScript", "Machine Learning", "PWA", "Git", "GitHub"],
    features: [
      "Risk monitoring",
      "Prediction",
      "Alerts",
      "Health data integration",
      "Water-quality integration",
      "Rainfall data integration",
      "PWA interface",
      "API-driven risk visualization"
    ],
    githubUrl: "https://github.com/hasinfarukjan2006/AquaSentinel-AI",
    featured: true
  },
  {
    id: "proj-3",
    slug: "softrate-business-management",
    title: "Softrate Business Management Web Application",
    subtitle: "Modular suite of enterprise tools for invoicing, quotes, receipts, and revenue forecasting",
    year: "2026",
    description: "Comprehensive business management application featuring invoice generation, quote creation, receipt building, and revenue forecasting across 24 responsive pages.",
    overview: "Engineered during internship at Softrate Technologies, this system streamlines day-to-day administrative and financial utility tasks.",
    problem: "Small businesses often rely on fragmented spreadsheets and manual calculation tools.",
    solution: "Developed an integrated frontend suite powered by React.js and Flask services delivering instant client-side PDF generation.",
    techStack: ["React.js", "JavaScript", "HTML", "CSS", "Flask", "Git", "GitHub"],
    features: [
      "Invoice Generator",
      "Quote Generator",
      "Receipt Generator",
      "Revenue Forecaster",
      "Responsive UI",
      "Routing",
      "Calculation logic",
      "Interactive workflows",
      "24 application pages"
    ],
    githubUrl: "https://github.com/hasinfarukjan2006/softrate-tech-park",
    featured: true
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Oracle AI Vector Search Certified Professional",
    issuer: "Oracle University"
  },
  {
    id: "cert-2",
    title: "Human Computer Interaction",
    issuer: "NPTEL",
    grade: "Elite",
    score: "87%"
  },
  {
    id: "cert-3",
    title: "Pragati: Path to Future - Cohort 9",
    issuer: "Infosys"
  },
  {
    id: "cert-4",
    title: "AWS S3 Basics",
    issuer: "Coursera Project Network"
  },
  {
    id: "cert-5",
    title: "ReactJS and Node JS",
    issuer: "Unstop"
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "ach-1",
    title: "TCS CodeVita Season 13",
    detail: "Secured Global Rank 10,944.",
    type: "Contest"
  },
  {
    id: "ach-2",
    title: "Electraton'26",
    detail: "Participated in a National Level 24-Hour Hackathon.",
    type: "Hackathon"
  },
  {
    id: "ach-3",
    title: "SIMATS TECH SANGAMAM-26",
    detail: "Participated in a National Level 24-Hour Hackathon.",
    type: "Hackathon"
  },
  {
    id: "ach-4",
    title: "Elite Hack 1.0",
    detail: "Participated in a Global Online Hackathon.",
    type: "Hackathon"
  },
  {
    id: "ach-5",
    title: "Adobe University Hackathon",
    detail: "Participation in Adobe University Hackathon.",
    type: "Hackathon"
  },
  {
    id: "ach-6",
    title: "Kurukshetra'26 – K!ODE WARS",
    detail: "Participation in competitive programming event.",
    type: "Competition"
  },
  {
    id: "ach-7",
    title: "TechZen Operation Cipher 2026",
    detail: "Participation in national coding challenge.",
    type: "Competition"
  },
  {
    id: "ach-8",
    title: "Celesta'25",
    detail: "6-Hour Coding Hackathon.",
    type: "Hackathon"
  },
  {
    id: "ach-9",
    title: "DSA for DeepTech",
    detail: "International Level Bootcamp.",
    type: "Bootcamp"
  }
];
