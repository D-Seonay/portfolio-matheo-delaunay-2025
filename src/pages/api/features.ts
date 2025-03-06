import { NextApiRequest, NextApiResponse } from 'next';
import { IconType } from 'react-icons';
import { Lang } from "@/types";

export interface Feature {
  title: string;
  description: string;
  category: string;
}

const features: Record<Lang, Feature[]> = {
  fr: [
    {
      title: "Expertise technique",
      description: "Maîtrise des technologies web modernes pour créer des applications performantes et évolutives.",
      category: "tech"
    },
    {
      title: "Approche créative",
      description: "Chaque projet est une opportunité d'innover et de repousser les limites du design et de la technologie.",
      category: "creative"
    },
    {
      title: "Solutions sur mesure",
      description: "Développement d'applications adaptées à vos besoins spécifiques et à votre vision.",
      category: "solution"
    },
    {
      title: "Performance optimale",
      description: "Optimisation constante pour garantir vitesse, fluidité et expérience utilisateur exceptionnelle.",
      category: "performance"
    },
    {
      title: "Innovation continue",
      description: "Veille technologique permanente pour appliquer les meilleures pratiques du développement web.",
      category: "innovation"
    },
    {
      title: "Collaboration efficace",
      description: "Communication transparente et travail d'équipe pour des projets réussis.",
      category: "collaboration"
    }
  ],
  en: [
    {
      title: "Technical Expertise",
      description: "Mastery of modern web technologies to create high-performance and scalable applications.",
      category: "tech"
    },
    {
      title: "Creative Approach",
      description: "Each project is an opportunity to innovate and push the boundaries of design and technology.",
      category: "creative"
    },
    {
      title: "Custom Solutions",
      description: "Development of applications tailored to your specific needs and vision.",
      category: "solution"
    },
    {
      title: "Optimal Performance",
      description: "Constant optimization to ensure exceptional speed, fluidity, and user experience.",
      category: "performance"
    },
    {
      title: "Continuous Innovation",
      description: "Constant technology watch to apply best practices in web development.",
      category: "innovation"
    },
    {
      title: "Effective Collaboration",
      description: "Transparent communication and teamwork for successful projects.",
      category: "collaboration"
    }
  ]
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const lang = (req.query.lang as Lang) || "en";
    res.status(200).json(features[lang]);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 