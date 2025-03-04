export type ProjectStatus = 'production' | 'development' | 'completed' | 'archived' | 'paused';

export interface Repository {
    url: string;
    isPrivate: boolean;
}

export interface Collaborator {
    id: string;
    name: string;
    role: string;
    image?: string;
    link?: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    image: string;
    link: string;
    status: ProjectStatus;
    repository?: Repository;
    tags: string[];
    features: string[];
    technologies: string[];
    screenshots: string[];
    collaborators: Collaborator[];
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}  
export type Lang = "fr" | "en";


export interface FAQType {
    id: string;
    question: string;
    answer: string;
}

export interface Status {
    id: string;
    status: string;
    text: string;
    label: string;
}

export type HomeTextType = {
    title: string;
    titleHighlight: string;
    titleSecondaryPart: string;
    description: string;
    button: string;
};


export type ServiceType = {
    id: string;
    title: string;
};

export type FooterDataType = {
    title: string;
    socials: SocialLink[];
    rights: string;
    credits: string;
};

export type SocialLink = {
    id: string;
    name: string;
    icon: string;
    link: string;
};

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  location: string;
}

export interface AboutMeContent {
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  favoriteTechnologies: string[];
  experience: Experience[];
  education: Education[];
}

export interface AboutMeResponse {
  fr: AboutMeContent;
  en: AboutMeContent;
}