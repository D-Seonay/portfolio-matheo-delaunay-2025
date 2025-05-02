import { NextApiRequest, NextApiResponse } from 'next';
import { Lang } from "@/types";

export interface Skill {
  name: string;
  level?: number;
  category?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

const skillsData: Record<Lang, { skills: Skill[]; groups: SkillGroup[] }> = {
  fr: {
    skills: [
      { name: "React.js", category: "Frontend" },
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "JavaScript", category: "Frontend" },
      { name: "HTML5", category: "Frontend" },
      { name: "CSS", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Framer Motion", category: "Frontend" },
      
      { name: "Node.js", category: "Backend" },
      { name: "Express.js", category: "Backend" },
      { name: "Django", category: "Backend" },
      { name: "Python", category: "Backend" },
      { name: "PHP", category: "Backend" },
      { name: "Symfony", category: "Backend" },
      { name: "Java", category: "Backend" },
      { name: "Spring Boot", category: "Backend" },
      
      { name: "MySQL", category: "Base de données" },
      { name: "PostgreSQL", category: "Base de données" },
      
      { name: "Linux", category: "DevOps" },
      { name: "Docker", category: "DevOps" },
      { name: "Git", category: "DevOps" },
      
      { name: "React Native", category: "Mobile" },
      
      { name: "Figma", category: "Outils" },
      { name: "Active Directory", category: "Outils" },
      { name: "Méthodes Agiles", category: "Outils" }
    ],
    groups: [
      {
        title: "Frontend",
        skills: []  // Sera rempli dynamiquement
      },
      {
        title: "Backend",
        skills: []
      },
      {
        title: "Base de données",
        skills: []
      },
      {
        title: "DevOps",
        skills: []
      },
      {
        title: "Mobile",
        skills: []
      },
      {
        title: "Outils",
        skills: []
      }
    ]
  },
  en: {
    skills: [
      { name: "React.js", category: "Frontend" },
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "JavaScript", category: "Frontend" },
      { name: "HTML5", category: "Frontend" },
      { name: "CSS", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Framer Motion", category: "Frontend" },
      
      { name: "Node.js", category: "Backend" },
      { name: "Express.js", category: "Backend" },
      { name: "Django", category: "Backend" },
      { name: "Python", category: "Backend" },
      { name: "PHP", category: "Backend" },
      { name: "Symfony", category: "Backend" },
      { name: "Java", category: "Backend" },
      { name: "Spring Boot", category: "Backend" },
      
      { name: "MySQL", category: "Database" },
      { name: "PostgreSQL", category: "Database" },
      
      { name: "Linux", category: "DevOps" },
      { name: "Docker", category: "DevOps" },
      { name: "Git", category: "DevOps" },
      
      { name: "React Native", category: "Mobile" },
      
      { name: "Figma", category: "Tools" },
      { name: "Active Directory", category: "Tools" },
      { name: "Agile Methods", category: "Tools" }
    ],
    groups: [
      {
        title: "Frontend",
        skills: []
      },
      {
        title: "Backend",
        skills: []
      },
      {
        title: "Database",
        skills: []
      },
      {
        title: "DevOps",
        skills: []
      },
      {
        title: "Mobile",
        skills: []
      },
      {
        title: "Tools",
        skills: []
      }
    ]
  }
};

// Fonction pour remplir les groupes avec les compétences correspondantes
function prepareSkillGroups(lang: Lang) {
  const data = skillsData[lang];
  return data.groups.map(group => ({
    ...group,
    skills: data.skills.filter(skill => {
      const categoryMap: Record<string, string> = {
        "Base de données": "Database",
        "Outils": "Tools"
      };
      
      const skillCategory = skill.category;
      const groupTitle = group.title;
      
      return lang === 'fr' 
        ? skillCategory === groupTitle
        : skillCategory === (categoryMap[groupTitle] || groupTitle);
    })
  }));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const lang = (req.query.lang as Lang) || "en";
    const groups = prepareSkillGroups(lang);
    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 