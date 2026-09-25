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
    period: "2024 – 2028",
    schools: [
      { institution: "Sowdaambikaa Group of Schools, Trichy", qualification: "Higher Secondary Certificate (HSC)", score: "79%", year: "2023" },
      { institution: "St. Dominic Savio Matric Hr. Sec. School, Karur", qualification: "Secondary School Leaving Certificate (SSLC)", score: "95%", year: "2021" }
    ]
  },
  highlights: [
    { title: "Software Development", description: "Building responsive web interfaces, full-stack tools, and functional utility modules." },
    { title: "AI / ML", description: "Developing Edge AI solutions, CNN models, signal processing, and predictive systems." },
    { title: "Problem Solving", description: "Solid grounding in DSA, OOP, DBMS, OS, and computer networks." }
  ],
  domains: ["Software Development", "Artificial Intelligence", "Machine Learning", "Edge AI"]
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
    duration: "Jun 2026",
    location: "Chennai",
    responsibilities: [
      "Developed and enhanced responsive web interfaces for business productivity and financial utility applications.",
      "Worked on Invoice Generator, Quote Generator, Receipt Generator, and Revenue Forecaster modules with interactive calculation logic.",
      "Implemented routing, UI improvements, responsive layouts, and functional validation across 24 application pages.",
      "Used Git and GitHub for source-code management and development workflows."
    ]
  },
  {
    id: "exp-2",
    company: "CodSoft",
    role: "Full Stack Development Intern",
    duration: "Jul 03 – Jul 10, 2025",
    location: "Remote",
    responsibilities: [
      "Developed responsive frontend components and implemented practical web-development features using HTML, CSS, and JavaScript.",
      "Applied software-development and project-structuring concepts to assigned implementation tasks."
    ]
  },
  {
    id: "exp-3",
    company: "InternPe",
    role: "Web Development Intern",
    duration: "Jul 07 – Aug 03, 2025",
    location: "Remote",
    responsibilities: [
      "Developed functional web components using HTML, CSS, and JavaScript.",
      "Implemented responsive layouts and strengthened practical frontend development skills through project-based tasks."
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
    overview: "SafeCare is an intelligent Edge AI hearing system designed to solve traditional acoustic amplification limitations. By processing multi-directional MEMS audio streams locally on a Raspberry Pi Zero 2 W, SafeCare classifies environmental acoustics in real-time, prioritizes emergency sounds, and applies adaptive speech enhancement.",
    problem: "Traditional hearing aids uniformly amplify ambient sound, causing auditory discomfort in loud environments while failing to alert users to specific spatial safety hazards like oncoming vehicle horns or emergency sirens.",
    solution: "SafeCare employs an optimized Convolutional Neural Network (CNN) model running on TensorFlow Lite. It extracts Mel-Frequency Cepstral Coefficients (MFCC) using Librosa to instantly classify environmental sound profiles and dynamically suppress background noise while accentuating speech and high-priority acoustic alerts.",
    techStack: ["Python", "TensorFlow Lite", "Librosa", "CNN", "MFCC", "Raspberry Pi Zero 2 W", "INMP441 MEMS Microphones"],
    features: [
      "Developing an Edge AI smart hearing-aid system for speech enhancement, environmental sound recognition, and safety alerts.",
      "Designed environmental sound classification for Speech, Horn, Siren, Music, Traffic, and Background Noise using MFCC features and a CNN model.",
      "Implemented adaptive noise suppression, speech enhancement, directional sound detection, and emergency sound prioritization using dual microphones and Raspberry Pi Zero 2 W."
    ],
    categories: ["Speech", "Horn", "Siren", "Music", "Traffic", "Background Noise"],
    architectureNotes: [
      "Acoustic Capture: INMP441 MEMS Microphones sample ambient audio stream",
      "Feature Extraction: Librosa converts raw audio into MFCC spectrogram tensor matrices",
      "Model Inference: Quantized CNN model executes on TensorFlow Lite engine at sub-50ms latency",
      "Output Processing: Raspberry Pi Zero 2 W channels spatial directional cues and filtered speech audio"
    ],
    featured: true
  },
  {
    id: "proj-2",
    slug: "aquasentinel-ai",
    title: "AquaSentinel AI: Water-Borne Disease Early Warning System",
    subtitle: "AI-enabled platform for community-level water-borne disease risk monitoring",
    year: "2026",
    description: "Developed an AI-enabled platform for community-level water-borne disease risk monitoring using health, water-quality, and rainfall data.",
    overview: "AquaSentinel AI bridges community health management with predictive machine learning. The platform aggregates water quality indices, local rainfall data, and public health indicators to forecast potential water-borne disease outbreaks before they amplify into critical emergencies.",
    problem: "Remote and underserved communities frequently experience water-borne pathogen outbreaks without timely risk advisories, resulting in delayed medical intervention.",
    solution: "A Progressive Web Application (PWA) backed by a Python Flask REST API that feeds multi-source environmental metrics into machine learning predictive algorithms, generating live community-level risk visualization and automated alerting.",
    techStack: ["React.js", "Flask", "Python", "REST API", "JavaScript", "Machine Learning", "PWA", "Git", "GitHub"],
    features: [
      "Developed an AI-enabled platform for community-level water-borne disease risk monitoring using health, water-quality, and rainfall data.",
      "Built a React.js frontend and Flask REST API for risk monitoring, prediction, alerts, and integration of health, water-quality, and rainfall data.",
      "Designed a mobile-first Progressive Web App with responsive navigation, offline-oriented functionality, and API-driven risk visualization."
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
    description: "Developed Invoice Generator, Quote Generator, Receipt Generator, and Revenue Forecaster modules for business productivity workflows across 24 application pages.",
    overview: "Engineered during internship at Softrate Technologies, this system streamlines day-to-day administrative and financial utility tasks for small-to-medium business workflows through a unified interactive dashboard.",
    problem: "Small businesses often rely on fragmented spreadsheets and manual calculation tools for quote generation, billing, and revenue projection, leading to operational friction and error risk.",
    solution: "Developed an integrated frontend suite powered by React.js and Flask services delivering instant client-side PDF generation, real-time revenue projection models, and responsive workflow navigation across 24 modular application pages.",
    techStack: ["React.js", "JavaScript", "HTML", "CSS", "Flask", "Git", "GitHub"],
    features: [
      "Developed Invoice Generator, Quote Generator, Receipt Generator, and Revenue Forecaster modules for business productivity workflows.",
      "Implemented responsive UI, application routing, calculation logic, and interactive workflows across 24 application pages.",
      "Verified page functionality, routing, calculation logic, and result-display workflows throughout the application."
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
    title: "NPTEL Human Computer Interaction",
    detail: "Achieved Elite certification with a score of 87%.",
    type: "Certification"
  },
  {
    id: "ach-2b",
    title: "Electraton’26 and SIMATS (TECH SANGAMAM-26)",
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
    title: "Adobe University Hackathon and Kurukshetra’26 – K!ODE WARS",
    detail: "Participated in hackathon and competitive programming events.",
    type: "Hackathon"
  },
  {
    id: "ach-7",
    title: "TechZen Operation Cipher 2026 and Celesta’25",
    detail: "Participated in 6-Hour Coding Hackathon.",
    type: "Competition"
  },
  {
    id: "ach-9",
    title: "DSA for DeepTech",
    detail: "Completed an International Level Bootcamp.",
    type: "Bootcamp"
  }
];
