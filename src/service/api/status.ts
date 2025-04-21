import type { NextApiRequest, NextApiResponse } from "next";
import { Status, ApiResponse, Lang } from "../../types";

const statuses: Record<Lang, Status[]> = {
  fr: [
    { id: "1", status: "En ligne", text: "Ouvert à la discussion.", label: "En ligne" },
    { id: "2", status: "En attente", text: "Déjà sur un projet. Veuillez patienter.", label: "Absent" },
    { id: "3", status: "Hors ligne", text: "Occupé. Laissez un message.", label: "Hors ligne" }
    ],
  en: [
    { id: "1", status: "Online", text: "Open for discussion.", label: "Online" },
    { id: "2", status: "Pending", text: "Already on a project. Please wait.", label: "Away" },
    { id: "3", status: "Offline", text: "Busy. Leave a message.", label: "Offline" }
  ]
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Status[]>>) {
  const lang = (req.query.lang as Lang) || "en";
  const id = (req.query.id as string) || "1";
  
  const result = statuses[lang].filter((status) => status.id === id);

  if (result.length === 0) {
    return res.status(404).json({ data: [], message: "Status not found" });
  }

  res.status(200).json({ data: result });
}
