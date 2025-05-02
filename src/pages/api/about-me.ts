import { NextApiRequest, NextApiResponse } from 'next';
import { AboutMeResponse } from '@/types';

const aboutMeData: AboutMeResponse = {
  fr: {
    title: "À propos de moi",
    subtitle: "Étudiant en Bachelor Développeur IA & Data Science",
    description: "Étudiant passionné en informatique à l'EPSI Nantes, je me spécialise dans le développement Full Stack et l'IA. Mon parcours combine formation académique et expériences professionnelles enrichissantes.",
    skills: [
      "React.js",
      "Django",
      "Node.js",
      "Python",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS",
      "MySQL",
      "PHP",
      "Symfony",
      "Linux",
      "DevOps",
      "Figma",
      "Active Directory",
      "C++",
      "Méthodes Agiles",
      "Docker",
      "Git",
      "React Native",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Tailwind CSS",
      "Framer Motion",
      "Next.js",
      "Express.js",

    ],
    favoriteTechnologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Python",
      "Docker"
    ],
    experience: [
      {
        title: "Développeur Full Stack",
        company: "BACKCAR",
        period: "Novembre 2024 - Janvier 2025",
        description: "Optimisation et débogage de l'application Car Expresso pour la gestion interne, le suivi clients et la recherche de véhicules. Développement d'une application d'automatisation des commandes et rappels commerciaux via l'API Airtable."
      },
      {
        title: "Développeur Full Stack",
        company: "DCH-IT",
        period: "Janvier 2024 - Février 2024",
        description: "Développement full stack avec PHP/Symfony et Twig/JS. Utilisation de DevOps sur Debian et conception sur Figma."
      },
      {
        title: "Développeur Full Stack",
        company: "NoBullshit Engineers",
        period: "Mai 2023 - Juin 2023",
        description: "Conception et développement d'un formulaire d'incident, intégration API Better Uptime, mise en place CI/CD et tests automatisés."
      },
      {
        title: "Technicien Informatique",
        company: "Campus La Mennais Ploërmel",
        period: "Novembre 2020 - Août 2022",
        description: "Support technique, maintenance informatique et administration réseau dans un établissement d'enseignement."
      }
    ],
    education: [
      {
        school: "EPSI Nantes",
        degree: "Bachelor Développeur en IA et Data Science",
        period: "2022 - Présent",
        location: "Nantes, France"
      }
    ]
  },
  en: {
    title: "About Me",
    subtitle: "AI & Data Science Developer Student",
    description: "Passionate IT student at EPSI Nantes, specializing in Full Stack Development and AI. My journey combines academic training with enriching professional experiences.",
    skills: [
      "React.js",
      "Django",
      "Node.js",
      "Python",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS",
      "MySQL",
      "PHP",
      "Symfony",
      "Linux",
      "DevOps",
      "Figma",
      "Active Directory",
      "C++",
      "Agile Methods",
      "Docker",
      "Git",
      "React Native",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Tailwind CSS",
      "Framer Motion",
      "Next.js",
      "Express.js",
    ],
    favoriteTechnologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Python",
      "Docker"
    ],
    experience: [
      {
        title: "Full Stack Developer",
        company: "BACKCAR",
        period: "November 2024 - January 2025",
        description: "Optimization and debugging of Car Expresso application for internal management, customer tracking and vehicle search. Development of an application for order automation and commercial reminders via Airtable API."
      },
      {
        title: "Full Stack Developer",
        company: "DCH-IT",
        period: "January 2024 - February 2024",
        description: "Full stack development with PHP/Symfony and Twig/JS. DevOps usage on Debian and design with Figma."
      },
      {
        title: "Full Stack Developer",
        company: "NoBullshit Engineers",
        period: "May 2023 - June 2023",
        description: "Design and development of an incident form, Better Uptime API integration, CI/CD and automated testing implementation."
      },
      {
        title: "IT Technician",
        company: "Campus La Mennais Ploërmel",
        period: "November 2020 - August 2022",
        description: "Technical support, computer maintenance and network administration in an educational institution."
      }
    ],
    education: [
      {
        school: "EPSI Nantes",
        degree: "Bachelor's in AI and Data Science Development",
        period: "2022 - Present",
        location: "Nantes, France"
      }
    ]
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lang } = req.query;

  if (!lang || (lang !== 'fr' && lang !== 'en')) {
    return res.status(400).json({ error: 'Invalid language parameter' });
  }

  return res.status(200).json(aboutMeData[lang as keyof AboutMeResponse]);
}