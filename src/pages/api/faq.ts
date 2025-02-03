import type { NextApiRequest, NextApiResponse } from "next";
import { FAQ, ApiResponse, Lang } from "../../types";

const faqs: Record<Lang, FAQ[]> = {
    fr: [
            { id: "1", question: "Quels types de services proposez-vous?", answer: "Nous proposons une large gamme de services, y compris le marketing, le développement de produits, et plus encore."},
            { id: "2", question: "Proposez-vous un support après le lancement?", answer: "Oui, notre équipe est dédiée à fournir un support continu même après le lancement."},
        ],
    en: [
            { id: "1", question: "What types of services do you offer?", answer: "We offer a wide range of services including marketing, product development, and more."},
            { id: "2", question: "Do you offer post-launch support?", answer: "Yes, our team is dedicated to providing continuous support even after launch."}
        ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<FAQ[]>>) {
    const lang = (req.query.lang as Lang) || "fr";
    res.status(200).json({ data: faqs[lang] });
}