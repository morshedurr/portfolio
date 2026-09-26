export interface ProfileData {
  name: string;
  titles: string[];
  tagline: string;
  bio: string;
  subBio?: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  resumeUrl: string;
  profileImage: string;
  keyExpertise: string[];
  academicSpotlight: {
    title: string;
    description: string;
    badge: string;
  };
}

export interface WorkExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  badge?: string;
  highlights: string[];
  order: number;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa?: string;
  rank?: string;
  eqfLevel?: string;
  badge?: string;
  description: string;
  highlights?: string[];
  order: number;
}

export interface AwardItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  description: string;
  color?: string;
  imageUrl?: string;
  credentialUrl?: string;
  order: number;
}

export interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  badge?: string;
  order: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  description: string;
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  tags: string[];
  featured?: boolean;
  order: number;
}

export interface ResearchItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  order: number;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  badge?: string;
  description?: string;
  order: number;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
  order: number;
}

export interface LanguageItem {
  name: string;
  level: string;
  proficiencyNote?: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  role: string;
  department: string;
  institution: string;
  relationship: string;
  email: string;
  phone: string;
  order: number;
}

export interface TeachingCourseItem {
  id: string;
  code?: string;
  title: string;
  department: string;
  institution: string;
  term?: string;
  level: string;
  description: string;
  topics: string[];
  order: number;
}

export type SectionId = 
  | 'hero' 
  | 'about' 
  | 'teaching'
  | 'research'
  | 'education'
  | 'experience' 
  | 'awards' 
  | 'projects' 
  | 'leadership' 
  | 'skills' 
  | 'certifications' 
  | 'references' 
  | 'contact';

export interface PortfolioData {
  profile: ProfileData;
  teachingCourses: TeachingCourseItem[];
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  awards: AwardItem[];
  leadership: LeadershipItem[];
  research: ResearchItem[];
  projects: ProjectItem[];
  technicalSkills: SkillItem[];
  softSkills: SkillItem[];
  skillCategories: SkillCategory[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  references: ReferenceItem[];
  sectionsOrder: SectionId[];
  sectionVisibility: Record<SectionId, boolean>;
}
