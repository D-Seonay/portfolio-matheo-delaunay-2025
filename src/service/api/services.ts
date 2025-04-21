import type { NextApiRequest, NextApiResponse } from "next";
import { ServiceType, ApiResponse, Lang } from "../../types";

const services: Record<Lang, ServiceType[]> = {
    fr: [
        { id:"1", title: "Maquettage UI/UX"},
        { id:"2", title: ""},
        { id:"3", title: "Développement Front-End"},
        { id:"4", title: ""},
        { id:"5", title: "Développement Back-End"},
        { id:"6", title: ""},
        { id:"7", title: "Création de Portfolio"},
        { id:"8", title: ""},
        { id:"9", title: "Développement d'Applications Mobiles"},
        { id:"10", title: ""},
    ],
    en: [
        { id:"1", title: "UI/UX Design"},
        { id:"2", title: ""},
        { id:"3", title: "Front-End Development"},
        { id:"4", title: ""},
        { id:"5", title: "Back-End Development"},
        { id:"6", title: ""},
        { id:"7", title: "Portfolio Creation"},
        { id:"8", title: ""},
        { id:"9", title: "Mobile App Development"},
        { id:"10", title: ""},
    ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<ServiceType[]>>) {
    const lang = (req.query.lang as Lang) || "fr";
    res.status(200).json({ data: services[lang] });
}