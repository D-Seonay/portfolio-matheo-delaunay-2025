// pages/api/home.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { HomeTextType } from '@/types';

const texts: Record<string, HomeTextType> = {
  en: {
    title: "Your Vision, My",
    titleHighlight: "Expertise",
    titleSecondaryPart: "Let's Build Together",
    description:
      "Turn your idea into a thriving digital product. With our hands-on support in strategy, design, and development, I'll create a platform that ensures your launch is remarkable.",
    button: "Start Today",
  },
  fr: {
    title: "Votre Vision, Mon",
    titleHighlight: "Expertise",
    titleSecondaryPart: "Construisons Ensemble",
    description:
      "Transformez votre idée en un produit numérique florissant. Avec mon soutien en stratégie, design et développement, je créerai une plateforme qui garantira que votre lancement soit remarquable.",
    button: "Commencez Aujourd'hui",
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query;
  const language = lang === 'fr' ? 'fr' : 'en';
  res.status(200).json(texts[language]);
}
