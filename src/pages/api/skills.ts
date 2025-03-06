import { NextApiRequest, NextApiResponse } from 'next';

export interface Skill {
  name: string;
  level?: number;
  category?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

const skills: Skill[] = [
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
  { name: "Méthodes Agiles", category: "Tools" }
];

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: skills.filter(skill => skill.category === "Frontend")
  },
  {
    title: "Backend",
    skills: skills.filter(skill => skill.category === "Backend")
  },
  {
    title: "Base de données",
    skills: skills.filter(skill => skill.category === "Database")
  },
  {
    title: "DevOps",
    skills: skills.filter(skill => skill.category === "DevOps")
  },
  {
    title: "Mobile",
    skills: skills.filter(skill => skill.category === "Mobile")
  },
  {
    title: "Outils",
    skills: skills.filter(skill => skill.category === "Tools")
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    res.status(200).json(skillGroups);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 