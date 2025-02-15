import type { NextApiRequest, NextApiResponse } from "next";
import { Project, ApiResponse, Lang } from "../../types";

const projects: Record<Lang, Project[]> = {
  fr: [
    { id: "1", name: "Fake Moon", description: "E-commerce", image: "/1.png", link: "#", tags: ["React"] },
    { id: "2", name: "Fake Mars", description: "E-commerce", image: "/2.png", link: "#1", tags: ["React"] },
    { id: "3", name: "Fake Shop", description: "E-commerce", image: "/3.png", link: "#2", tags: ["React"] },
  ],

  en: [
    { id: "1", name: "Fake Shop", description: "E-commerce site", image: "/img1.png", link: "", tags: ["React"] },
    { id: "2", name: "Fake Shop", description: "E-commerce site", image: "/img1.png", link: "", tags: ["React"] },
    { id: "3", name: "Fake Shop", description: "E-commerce site", image: "/img1.png", link: "", tags: ["React"] },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Project[]>>) {
  const lang = (req.query.lang as Lang) || "fr";
  res.status(200).json({ data: projects[lang] });
}
