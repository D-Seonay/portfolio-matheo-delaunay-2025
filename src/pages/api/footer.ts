import type { NextApiRequest, NextApiResponse } from "next";
import { FooterDataType, ApiResponse, Lang } from "../../types";

const footerData: Record<Lang, FooterDataType> = {
    fr: {
        title: "À propos",
        socials: [
            { id: "1", name: "LinkedIn", icon: "FaLinkedin", link: "https://www.linkedin.com/in/matheo-delaunay/" },
            { id: "2", name: "Github", icon: "FaGithub", link: "https://github.com/D-Seonay" },
        ],
        rights: "©2025 SEONAY. TOUS DROITS RÉSERVÉS.",
        credits: "Conçu & Développé avec ❤️ par Mathéo Delaunay",
    },

    en: {
        title: "About",
        socials: [
            { id: "1", name: "LinkedIn", icon: "FaLinkedin", link: "https://www.linkedin.com/in/matheo-delaunay/" },
            { id: "2", name: "Github", icon: "FaGithub", link: "https://github.com/D-Seonay" },
        ],
        rights: "©2025 SEONAY. ALL RIGHTS RESERVED.",
        credits: "Designed & Developed with ❤️ by Mathéo Delaunay",
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<FooterDataType>>) {
    const lang = (req.query.lang as Lang) || "fr";
    res.status(200).json({ data: footerData[lang] });
}