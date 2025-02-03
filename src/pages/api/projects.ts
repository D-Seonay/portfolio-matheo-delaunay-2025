import type { NextApiRequest, NextApiResponse } from "next";

type Project = {
  id: number;
  name: string;
  description: string;
};

const projects: Project[] = [
  { id: 1, name: "Fake Shop", description: "E-commerce avec React & Tailwind." },
  { id: 2, name: "Pokedex", description: "Pokedex interactif en Django." },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(projects);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
