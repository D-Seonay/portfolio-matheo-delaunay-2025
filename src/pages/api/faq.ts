import type { NextApiRequest, NextApiResponse } from "next";
import { FAQType, ApiResponse, Lang } from "../../types";

const faqs: Record<Lang, FAQType[]> = {

    fr: [
            { id: "1", question: "Quels types de services proposez-vous?", answer: "Nous proposons une large gamme de services, y compris le marketing, le développement de produits, et plus encore."},
            { id: "2", question: "Proposez-vous un support après le lancement?", answer: "Oui, notre équipe est dédiée à fournir un support continu même après le lancement."},
            { id: "3", question: "Quels sont vos tarifs?", answer: "Nos tarifs varient en fonction des services demandés. Contactez-nous pour obtenir un devis personnalisé."},
            { id: "4", question: "Combien de temps faut-il pour terminer un projet?", answer: "Le temps nécessaire pour terminer un projet varie en fonction de l'ampleur et de la complexité. Contactez-nous pour un calendrier de projet."}
        ],
    en: [
            { id: "1", question: "What types of services do you offer?", answer: "We offer a wide range of services including marketing, product development, and more."},
            { id: "2", question: "Do you offer post-launch support?", answer: "Yes, our team is dedicated to providing continuous support even after launch."},
            { id : "3", question: "What are your rates?", answer: "Our rates vary depending on the services requested. Contact us for a personalized quote."},
            { id: "4", question: "How long does it take to complete a project?", answer: "The time to complete a project varies depending on the scope and complexity. Contact us for a project timeline."}


        ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<FAQType[]>>) {
    const lang = (req.query.lang as Lang) || "en";
    res.status(200).json({ data: faqs[lang] });
}