import { Project, ExperienceItem, SkillCategory, EducationItem, CertificationItem } from '../types';

export const PERSONAL_INFO = {
  name: "Abhilash Bollepalli",
  headline: "Data & AI Engineer",
  positioning: "Transforming complex data into intelligent, production-ready AI systems.",
  shortBio: "Data and AI developer turning raw data into actionable insights and robust AI-driven systems. Strong expertise in data cleaning, exploratory analysis, root-cause investigation, and engineering practical AI workflows.",
  location: "Hyderabad, Telangana, India",
  email: "abhilashshiva.b@gmail.com",
  phone: "+91 9030422529",
  resumePath: "/resume.pdf",
  socials: {
    github: "https://github.com/abhilashshiva",
    linkedin: "https://linkedin.com",
    email: "mailto:abhilashshiva.b@gmail.com"
  },
  availability: "Available for Data Science & AI Engineering Roles"
};

export const PROJECTS: Project[] = [
  {
    id: "food-detecto",
    number: "01",
    title: "Food Detecto App",
    subtitle: "AI Food Detection & Audience Engagement Application",
    shortDescription: "Turned an influencer's audience engagement challenge into a launched startup product, engineering the app across React, backend services, and Google Cloud infrastructure.",
    period: "2026",
    statusBadge: "Live on App & Play Store",
    role: "Lead Full-Stack & AI Engineer",
    technologies: ["React.js", "Bootstrap", "Java", "Python", "Google Cloud"],
    imagePlaceholderText: "Food Detecto Mobile & Web Application Interface",
    featured: true,
    links: {
      // Marked placeholders until verified direct store links are provided
      appStore: "#",
      playStore: "#"
    },
    caseStudy: {
      overview: "Food Detecto was conceived to solve audience retention and engagement challenges for a prominent content creator. The goal was to provide interactive nutrition and food identification tools directly to thousands of active community members.",
      problem: "The client needed a frictionless, high-accuracy application capable of handling dynamic user queries, identifying food items, and providing meaningful dietary feedback without prohibitive infrastructure latency.",
      solution: "Engineered a scalable multi-tier architecture pairing a responsive React.js and Bootstrap client with an optimized Python/Java backend running on Google Cloud, delivering real-time processing and smooth cross-platform availability.",
      myContribution: [
        "Conceived the application architecture from initial user requirements into production specifications.",
        "Built responsive client interface modules with React.js and Bootstrap for cross-device compatibility.",
        "Engineered server-side logic in Python and Java to ingest, validate, and process food classification queries.",
        "Configured Google Cloud deployment pipelines for high reliability during launch."
      ],
      architecture: {
        summary: "Decoupled cloud architecture utilizing containerized services on Google Cloud, connected via REST APIs to a responsive React front-end.",
        stack: [
          { category: "Frontend", items: ["React.js", "Bootstrap", "HTML5/CSS3"] },
          { category: "Backend & Logic", items: ["Python", "Java", "RESTful APIs"] },
          { category: "Cloud & Infrastructure", items: ["Google Cloud Platform", "Containerized microservices"] }
        ]
      },
      resultsAndLimitations: {
        results: [
          "Successfully deployed and launched onto both Google Play Store and Apple App Store.",
          "Stabilized end-to-end processing pipeline under real user traffic.",
          "Delivered intuitive user onboarding that boosted audience engagement."
        ],
        limitations: [
          "Edge device camera latency varies on older mobile chipsets.",
          "Fine-grained multi-ingredient nutritional breakdown continues to be refined with newer classification models."
        ]
      }
    }
  },
  {
    id: "edmit",
    number: "02",
    title: "EDMIT — Educational Management Tool",
    subtitle: "Role-Based Academic Administration & Workflow System",
    shortDescription: "Role-based institutional platform digitizing fee payment verification and course registration, eliminating manual paperwork across academic departments.",
    period: "2025",
    statusBadge: "Live for MLRIT",
    role: "Full-Stack Developer",
    technologies: ["React.js", "Node.js", "Supabase", "PostgreSQL"],
    imagePlaceholderText: "EDMIT Academic Administration & Fee Portal",
    featured: true,
    links: {
      live: "#"
    },
    caseStudy: {
      overview: "EDMIT is an institutional management system developed for MLR Institute of Technology to centralize disparate academic workflows, student course registrations, and fee clearing.",
      problem: "Administrative staff and students were burdened by paper-heavy verification queues, disconnected fee records, and delayed approval cycles during semester enrollments.",
      solution: "Designed and deployed a unified web application using React.js, Node.js, and Supabase. Implemented strict role-based access control (RBAC) guaranteeing segregated workflows for students, faculty, and administrative heads.",
      myContribution: [
        "Architected role-based database schemas and security policies in Supabase / PostgreSQL.",
        "Developed administrative dashboards for student registration approvals and audit logging.",
        "Built reliable automated fee verification flows that significantly reduced physical department visits.",
        "Conducted end-user validation sessions with academic staff to refine interface ergonomics."
      ],
      architecture: {
        summary: "Modern serverless relational architecture with Supabase handling row-level security and authentication, backed by Node.js micro-endpoints and a React client.",
        stack: [
          { category: "Frontend", items: ["React.js", "Tailwind CSS / UI Components", "State Management"] },
          { category: "Backend & DB", items: ["Node.js", "Supabase", "PostgreSQL (RLS)", "JWT Auth"] }
        ]
      },
      resultsAndLimitations: {
        results: [
          "Rolled out live for MLRIT institutional use across academic departments.",
          "Substantially cut physical paperwork and manual processing hours during enrollment periods.",
          "Real-time reconciliation of fee clearance status for students and admin staff."
        ],
        limitations: [
          "Institutional legacy database migration required batch ETL scripts rather than instant two-way sync."
        ]
      }
    }
  },
  {
    id: "studport",
    number: "03",
    title: "Studport — Placement & Networking Platform",
    subtitle: "Campus Placement Management & Recruiter Portal",
    shortDescription: "Centralized placement management portal featuring resume uploads, recruiter filtering, and structured student profile visibility for hiring drives.",
    period: "2024",
    statusBadge: "Completed Platform",
    role: "Web & Platform Developer",
    technologies: ["WordPress", "PHP", "MySQL", "XAMPP"],
    imagePlaceholderText: "Studport Placement Portal & Student Directory",
    featured: true,
    links: {
      github: "#"
    },
    caseStudy: {
      overview: "Studport was engineered to streamline campus placement operations, providing students with a profile and resume repository while offering visiting recruiters clean candidate filtering.",
      problem: "Placement coordinators managed thousands of student resumes via scattered spreadsheets and email chains, leading to lost records, mismatched eligibility, and lost recruiter time.",
      solution: "Constructed a dedicated portal utilizing WordPress, custom post types, and MySQL under a localized XAMPP environment, structured to handle candidate resume submissions, skill tagging, and recruiter search queries.",
      myContribution: [
        "Configured custom portal schema and user roles for Students, Placement Officers, and Recruiters.",
        "Implemented secure resume upload pipelines and standardized profile metadata collection.",
        "Tested local deployment stress-testing under simulated concurrent student uploads in XAMPP."
      ],
      architecture: {
        summary: "Monolithic CMS stack utilizing WordPress core with custom plugins, PHP hooks, and MySQL relational database on Apache/XAMPP.",
        stack: [
          { category: "CMS & Framework", items: ["WordPress", "PHP", "HTML/CSS"] },
          { category: "Database & Server", items: ["MySQL", "Apache (XAMPP Environment)"] }
        ]
      },
      resultsAndLimitations: {
        results: [
          "Delivered unified student directory with searchable technical skill tags.",
          "Accelerated placement drive shortlisting for campus coordinators.",
          "Demonstrated practical utility of rapid CMS prototyping for internal workflows."
        ],
        limitations: [
          "Initial version ran locally via XAMPP for campus network deployment prior to cloud hosting."
        ]
      }
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Pulsus Healthtech",
    role: "AI Developer",
    period: "Jul 2026 – Present",
    location: "Hyderabad, Telangana",
    status: "In Implementation",
    summary: "Leading data investigation and AI workflow engineering to diagnose and reverse performance downtrends.",
    highlights: [
      "Scraped, cleaned, and structured high-volume market and organizational data to analyze drivers behind a six-month decline in company performance.",
      "Identified the underlying root causes in 42 days through methodical exploratory data analysis and statistical validation.",
      "Developed a data-backed corrective framework and intelligent automation tools utilizing Google Antigravity and Claude, currently in active implementation."
    ],
    technologies: ["Python", "Data Scraping", "EDA", "Google Antigravity", "Claude", "Root-Cause Analysis"]
  },
  {
    company: "Bryte",
    role: "Data & AI Engineer",
    period: "Aug 2025 – Jun 2026",
    location: "Hyderabad, Telangana",
    status: "Delivered",
    summary: "Engineered customized AI-driven solutions and automated data pipelines across healthcare and consumer product clients.",
    highlights: [
      "Analyzed raw client datasets to isolate core operational bottlenecks across 3 client engagements: Aqua10, Vydhya Hospitals, and Food Detecto.",
      "Designed and deployed tailored AI-driven tools and workflow automations matching bespoke client specifications.",
      "Consistently achieved ~80% model and pipeline accuracy across deployed classification and automation tasks."
    ],
    technologies: ["Python", "Machine Learning", "Data Cleaning", "AI Workflow Automation", "Prompt Engineering"]
  },
  {
    company: "MLRIT Centre for Innovation & Entrepreneurship (CIE)",
    role: "Chief Operating Officer (COO)",
    period: "Jan 2025 – Dec 2025",
    location: "Hyderabad, Telangana",
    status: "Delivered",
    summary: "Directed operational growth, institutional partnerships, and regional technology showcase events.",
    highlights: [
      "Led sponsorship strategy and promotional outreach, securing 40% of institutional clients and delivering 60% of required operating revenue for the 2025 academic calendar.",
      "Spearheaded and executed high-visibility regional technology events, including a national-level hackathon and Telangana's first VR & AR experiential summit.",
      "Coordinated cross-functional teams bridging student technical innovators, faculty leads, and external industry sponsors."
    ],
    technologies: ["Operations", "Strategic Growth", "AR/VR Integration", "Sponsorship & Partnerships"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "SQL", "Java", "C", "JavaScript", "HTML", "CSS"]
  },
  {
    category: "Data & Analytics",
    skills: ["Pandas", "NumPy", "Power BI", "Tableau", "Data Scraping", "Data Cleaning", "Exploratory Data Analysis (EDA)", "Root-Cause Analysis"]
  },
  {
    category: "AI & Machine Learning",
    skills: ["scikit-learn", "TensorFlow", "PyTorch", "Generative AI", "AI Workflow Automation"]
  },
  {
    category: "AI Tools & LLMs",
    skills: ["Gemini", "Claude", "ChatGPT", "Grok", "Llama AI", "Runway ML", "DeepSeek"]
  },
  {
    category: "Web & Cloud Infrastructure",
    skills: ["React.js", "Node.js", "Bootstrap", "Google Cloud Platform", "Git", "Jupyter", "Unity (AR/VR)"]
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
