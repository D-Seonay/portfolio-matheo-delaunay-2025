import type { NextApiRequest, NextApiResponse } from "next";
import { FAQType, ApiResponse, Lang } from "../../types";

const faqs: Record<Lang, FAQType[]> = {

    fr: [
            { 
                id: "1", 
                question: "Quelles sont vos principales expertises techniques ?", 
                answer: "Je suis spécialisé dans le développement web moderne avec React.js, Next.js, et Node.js. Je maîtrise également TypeScript, les bases de données SQL/NoSQL, et les pratiques DevOps. Mon expertise s'étend aussi au développement mobile avec React Native."
            },
            { 
                id: "2", 
                question: "Comment assurez-vous la qualité de vos projets ?", 
                answer: "J'applique les meilleures pratiques de développement : tests automatisés, intégration continue, revue de code, et optimisation des performances. Je suis également les principes du Clean Code et utilise des outils modernes pour garantir la qualité."
            },
            { 
                id: "3", 
                question: "Proposez-vous un support après le lancement ?", 
                answer: "Oui, je fournis un support continu après le lancement, incluant la maintenance, les mises à jour de sécurité, et l'optimisation des performances. Je reste disponible pour les évolutions futures du projet."
            },
            { 
                id: "4", 
                question: "Quelle est votre approche de la gestion de projet ?", 
                answer: "J'utilise une approche agile adaptée à chaque projet, avec des points réguliers, une communication transparente, et des livrables itératifs. Je m'adapte aux besoins spécifiques de chaque client tout en maintenant une structure claire."
            },
            { 
                id: "5", 
                question: "Comment gérez-vous la sécurité des applications ?", 
                answer: "La sécurité est une priorité dans tous mes projets. J'implémente les meilleures pratiques de sécurité, incluant le chiffrement des données, la protection contre les injections SQL, et les authentifications sécurisées."
            },
            { 
                id: "6", 
                question: "Travaillez-vous sur des projets à distance ?", 
                answer: "Oui, je travaille efficacement à distance grâce à des outils de collaboration modernes et une communication régulière. Je m'adapte aux fuseaux horaires et aux préférences de communication de mes clients."
            }
        ],
    en: [
            { 
                id: "1", 
                question: "What are your main technical expertise areas?", 
                answer: "I specialize in modern web development with React.js, Next.js, and Node.js. I'm also proficient in TypeScript, SQL/NoSQL databases, and DevOps practices. My expertise extends to mobile development with React Native."
            },
            { 
                id: "2", 
                question: "How do you ensure project quality?", 
                answer: "I apply best development practices including automated testing, continuous integration, code review, and performance optimization. I also follow Clean Code principles and use modern tools to ensure quality."
            },
            { 
                id: "3", 
                question: "Do you offer post-launch support?", 
                answer: "Yes, I provide continuous support after launch, including maintenance, security updates, and performance optimization. I remain available for future project evolutions."
            },
            { 
                id: "4", 
                question: "What's your approach to project management?", 
                answer: "I use an agile approach adapted to each project, with regular check-ins, transparent communication, and iterative deliverables. I adapt to each client's specific needs while maintaining a clear structure."
            },
            { 
                id: "5", 
                question: "How do you handle application security?", 
                answer: "Security is a priority in all my projects. I implement security best practices, including data encryption, protection against SQL injections, and secure authentication methods."
            },
            { 
                id: "6", 
                question: "Do you work on remote projects?", 
                answer: "Yes, I work effectively remotely using modern collaboration tools and regular communication. I adapt to clients' time zones and communication preferences."
            }
        ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<FAQType[]>>) {
    const lang = (req.query.lang as Lang) || "en";
    res.status(200).json({ data: faqs[lang] });
}