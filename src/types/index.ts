export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  period: string;
  statusBadge: string;
  role: string;
  technologies: string[];
  imagePlaceholderText: string;
  featured: boolean;
  links: {
    github?: string;
    live?: string;
    appStore?: string;
    playStore?: string;
  };
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    myContribution: string[];
    architecture: {
      summary: string;
      stack: { category: string; items: string[] }[];
    };
    resultsAndLimitations: {
      results: string[];
      limitations: string[];
    };
  };
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  status: 'In Implementation' | 'Delivered' | 'Active';
  summary?: string;
  highlights: string[];
  technologies?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  grade: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  details?: string;
}
