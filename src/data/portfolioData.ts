import { Project, ExperienceItem, SkillCategory, EducationItem, CertificationItem } from '../types';

export const PERSONAL_INFO = {
  name: "Abhilash Bollepalli",
  headline: "Data & AI Developer",
  positioning: "Turning messy operational data into clean pipelines, statistical insights, and production AI applications.",
  shortBio: "Data & AI Developer graduating in 2026 from MLR Institute of Technology (AIML). Focused on practical machine learning, exploratory data analysis (EDA), automated data cleaning, and shipping production applications with Python, React, and modern LLM workflows.",
  location: "Hyderabad, Telangana, India",
  email: "abhilashshiva.b@gmail.com",
  phone: "+91 9030422529",
  resumePath: "/resume.pdf",
  socials: {
    github: "https://github.com/abhilashshiva",
    linkedin: "https://www.linkedin.com/in/abhilash-bollepalli/",
    email: "mailto:abhilashshiva.b@gmail.com"
  },
  availability: "Open to Data & AI Developer Opportunities"
};

export const PROJECTS: Project[] = [
  {
    id: "food-detecto",
    number: "01",
    title: "Food Detecto",
    subtitle: "Real-Time Food Classification & Dietary Macro Analysis",
    shortDescription: "Engineered an AI food recognition app using Python, YOLOv8 vision models, and React, providing real-time nutritional insights and macro breakdowns from camera input.",
    period: "2026",
    statusBadge: "Shipped & Live",
    role: "AI & Full-Stack Developer",
    technologies: ["Python", "YOLOv8", "FastAPI", "React.js", "Google Cloud"],
    imagePlaceholderText: "Food Detecto Vision AI & Nutritional Dashboard",
    featured: true,
    links: {
      github: "https://github.com/abhilashshiva/food-detecto",
      live: "https://food-detecto.vercel.app"
    },
    caseStudy: {
      overview: "Food Detecto was built to help health-conscious users track nutritional intake instantly through computer vision rather than manual food logging.",
      problem: "Traditional fitness apps require typing every ingredient manually, resulting in high user drop-off. The challenge was detecting multi-item meal plates accurately with sub-second latency.",
      solution: "Trained and deployed a YOLOv8 object detection model wrapped in a lightweight FastAPI microservice on Google Cloud Run, connected to a responsive React front-end.",
      myContribution: [
        "Curated, labeled, and augmented a dataset of 3,500+ dish images across Indian and Western diets.",
        "Trained and evaluated YOLOv8 classification weights achieving 92.4% mAP@0.5.",
        "Built asynchronous REST endpoints in Python/FastAPI with image compression to ensure <650ms response times.",
        "Implemented nutritional lookup tables mapping detected foods to verified USDA/NIN macro databases."
      ],
      architecture: {
        summary: "Lightweight containerized inference service on Google Cloud Run communicating via JSON REST with a React web client.",
        stack: [
          { category: "Computer Vision", items: ["Python", "YOLOv8", "OpenCV", "NumPy"] },
          { category: "Backend API", items: ["FastAPI", "Uvicorn", "Pydantic", "Docker"] },
          { category: "Frontend & Cloud", items: ["React.js", "Tailwind CSS", "Google Cloud Run"] }
        ]
      },
      resultsAndLimitations: {
        results: [
          "Achieved 92.4% validation accuracy across top 60 common meal categories.",
          "Reduced average user meal logging time from ~90 seconds to under 3 seconds.",
          "Smooth sub-second inference latency on standard mobile 4G/5G connections."
        ],
        limitations: [
          "Complex mixed curries and blended gravies require multi-label estimation rather than single bounding boxes.",
          "Portion weight estimation is currently inferred by reference plate size."
        ]
      }
    }
  },
  {
    id: "edmit",
    number: "02",
    title: "EDMIT — Academic ERP Platform",
    subtitle: "Role-Based Fee Reconciliation & Enrollment Automation",
    shortDescription: "Role-based institutional platform built for MLRIT centralizing semester registration, fee clearance verification, and administrative audit trails.",
    period: "2025",
    statusBadge: "Deployed for MLRIT",
    role: "Full-Stack Developer",
    technologies: ["React.js", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
    imagePlaceholderText: "EDMIT Administrative Fee Ledger & Approval Portal",
    featured: true,
    links: {
      github: "https://github.com/abhilashshiva/edmit",
      live: "https://edmit-mlrit.vercel.app"
    },
    caseStudy: {
      overview: "EDMIT is an institutional management platform developed to eliminate physical fee receipts and manual desk approvals for hundreds of engineering students at MLRIT.",
      problem: "Administrative staff spent 40+ hours per semester manually cross-referencing bank challans with student hall tickets, resulting in long queues and delayed course enrollments.",
      solution: "Engineered a secure web application powered by React and Supabase. Implemented PostgreSQL Row-Level Security (RLS) to enforce strict role boundaries between students, accounts clerks, and department heads.",
      myContribution: [
        "Designed normalized PostgreSQL schemas with automated triggers for fee balance reconciliation.",
        "Implemented Supabase JWT authentication and Row-Level Security policies to prevent privilege escalation.",
        "Built responsive administrative dashboards with live search, batch status approvals, and CSV export.",
        "Tested the platform against concurrent student submissions during semester cutoff hours."
      ],
      architecture: {
        summary: "Serverless relational architecture pairing Supabase (PostgreSQL with RLS) with a reactive React frontend.",
        stack: [
          { category: "Database & Security", items: ["PostgreSQL", "Supabase", "Row-Level Security (RLS)", "JWT"] },
          { category: "Application Layer", items: ["Node.js", "Express", "REST APIs"] },
          { category: "Client Interface", items: ["React.js", "Tailwind CSS", "Lucide Icons"] }
        ]
      },
      resultsAndLimitations: {
        results: [
          "Adopted across MLRIT academic departments during enrollment periods.",
          "Eliminated physical paper verification queues, cutting processing turnaround by ~70%.",
          "Zero ledger mismatch incidents recorded during live deployment."
        ],
        limitations: [
          "Legacy university database required batch CSV import scripts rather than direct API synchronization."
        ]
      }
    }
  },
  {
    id: "studport",
    number: "03",
    title: "Studport — Placement Portal",
    subtitle: "Campus Placement Management & Recruiter Search Directory",
    shortDescription: "Centralized placement repository allowing students to manage verified profiles and enabling campus recruiters to filter candidates by technical skill tags.",
    period: "2024",
    statusBadge: "Completed Project",
    role: "Web & Platform Developer",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5/CSS3", "Apache"],
    imagePlaceholderText: "Studport Candidate Directory & Placement Filter",
    featured: true,
    links: {
      github: "https://github.com/abhilashshiva/studport",
      live: "https://studport-demo.vercel.app"
    },
    caseStudy: {
      overview: "Studport was created to streamline campus recruitment drives, providing students with standardized profile profiles while offering coordinators candidate filtering tools.",
      problem: "Placement drives relied on disconnected Google Sheets and emailed resumes, causing recruiters to waste hours filtering eligible students for coding rounds.",
      solution: "Built a customized web portal using PHP and MySQL structured with dedicated roles for Students, Faculty Placement Officers, and Visiting Recruiters.",
      myContribution: [
        "Structured relational MySQL database tables for student grades, skill tags, and resume document paths.",
        "Developed dynamic search filters allowing recruiters to query by CGPA threshold, branch, and programming languages.",
        "Enforced file upload validation to ensure resume files complied with format and size security constraints."
      ],
      architecture: {
        summary: "Relational web stack utilizing PHP, MySQL, and modular CSS for clean data management.",
        stack: [
          { category: "Backend & Database", items: ["PHP 8.x", "MySQL", "PDO Prepared Statements"] },
          { category: "Frontend", items: ["JavaScript", "HTML5", "CSS3 Grid/Flexbox"] }
        ]
      },
      resultsAndLimitations: {
        results: [
          "Centralized 500+ student candidate profiles under standardized technical tags.",
          "Reduced recruiter candidate shortlisting time during on-campus recruitment drives.",
          "Provided reliable reporting for faculty placement coordinators."
        ],
        limitations: [
          "Early version utilized localized file storage before cloud object storage migration."
        ]
      }
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Pulsus Healthtech",
    role: "AI & Data Developer Intern",
    period: "Jul 2026 – Present",
    location: "Hyderabad, Telangana",
    status: "Active",
    summary: "Investigating organizational datasets and deploying automated AI workflow tools to identify and resolve performance bottlenecks.",
    highlights: [
      "Extracted, sanitized, and structured high-volume operational and user engagement records using Python (BeautifulSoup, Pandas).",
      "Identified critical workflow bottlenecks and conversion drop-offs through exploratory data analysis (EDA) and statistical validation.",
      "Engineered automated data extraction scripts and prompt-augmented workflow pipelines (Claude API, Antigravity) that reduced manual review cycles."
    ],
    technologies: ["Python", "Pandas", "EDA", "Web Scraping", "Prompt Engineering", "Claude API"]
  },
  {
    company: "Bryte",
    role: "Data & AI Developer Intern",
    period: "Aug 2025 – Jun 2026",
    location: "Hyderabad, Telangana",
    status: "Delivered",
    summary: "Engineered customized data pipelines and predictive classification utilities for client deliverables.",
    highlights: [
      "Analyzed client datasets for healthcare and consumer products, diagnosing pipeline bottlenecks across Aqua10, Vydhya Hospitals, and Food Detecto.",
      "Trained, validated, and tuned machine learning classification models with Scikit-learn, consistently maintaining ~80% validation accuracy.",
      "Built modular Python ETL scripts to ingest, normalize, and validate messy CSV/JSON client feeds."
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "ETL Pipelines", "Model Validation", "FastAPI"]
  },
  {
    company: "MLRIT Centre for Innovation & Entrepreneurship (CIE)",
    role: "Operations & Tech Initiatives Lead",
    period: "Jan 2025 – Dec 2025",
    location: "Hyderabad, Telangana",
    status: "Delivered",
    summary: "Directed student technical initiatives, hackathons, and regional innovation partnerships.",
    highlights: [
      "Led technical event execution and corporate sponsorship outreach, securing regional industry partnerships for campus hackathons.",
      "Spearheaded logistics and developer coordination for national-level hackathons and Telangana's first regional AR/VR experiential summit.",
      "Bridged engineering student project teams with faculty advisors and industry mentors to prototype applied software products."
    ],
    technologies: ["Project Operations", "Technical Coordination", "Hackathon Logistics", "AR/VR Showcases"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Data Engineering & Analytics",
    skills: ["Pandas", "NumPy", "SQL", "Data Scraping", "Data Cleaning", "Exploratory Data Analysis (EDA)", "Root-Cause Analysis", "Power BI", "Tableau"]
  },
  {
    category: "GenAI & LLM Orchestration",
    skills: ["RAG Architectures", "Prompt Engineering", "Vector Embeddings", "AI Guardrails", "Agentic Workflows", "Model Evaluation", "Context Optimization"]
  },
  {
    category: "Machine Learning & Modeling",
    skills: ["scikit-learn", "TensorFlow", "PyTorch", "Classification", "Regression", "Feature Engineering", "Clustering", "Statistical Testing"]
  },
  {
    category: "AI Tools & Models",
    skills: ["Gemini", "Claude", "ChatGPT", "Grok", "Llama 3", "DeepSeek", "Runway ML", "Claude Code", "Google Antigravity"]
  },
  {
    category: "Programming & Cloud Stack",
    skills: ["Python", "JavaScript / TypeScript", "React.js", "Node.js", "Java", "C", "Google Cloud Platform", "PostgreSQL", "Git", "Jupyter"]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "MLR Institute of Technology",
    degree: "B.Tech in Computer Science (AIML)",
    period: "Nov 2022 – Jun 2026",
    location: "Hyderabad, Telangana",
    grade: "CGPA: 8.1 / 10"
  },
  {
    institution: "Bhashyam Junior College",
    degree: "Board of Intermediate Education",
    period: "2020 – 2022",
    location: "Hyderabad, Telangana",
    grade: "87.1%"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "Data Analytics Essentials",
    issuer: "CISCO",
    date: "Nov 2024",
    details: "Foundational analytics, data visualization, and business intelligence."
  },
  {
    title: "Python for Data Science (PY0101EN)",
    issuer: "IBM",
    date: "Aug 2023",
    details: "Data structures, Pandas, NumPy, and scientific computing in Python."
  },
  {
    title: "Cloud Computing Foundations & Generative AI Pathways",
    issuer: "Google Cloud / GDSC",
    date: "Oct 2023",
    details: "GCP core infrastructure, model tuning, and generative AI prompt engineering."
  },
  {
    title: "Data Structures and Algorithms using Java",
    issuer: "NPTEL (IIT Kharagpur)",
    date: "Jul–Oct 2024",
    details: "12-week comprehensive theoretical and applied algorithms certification."
  }
];
