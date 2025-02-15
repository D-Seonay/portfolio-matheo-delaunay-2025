"use client";
import React, { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";

// Simulation d'un appel API (Remplace ça par ton appel API réel)
const fetchSkills = async () => {
  // Remplace cette ligne par un vrai appel API
  return [
    { title: "React", description: "Développement d'interfaces avec React." },
    { title: "Node.js", description: "Backend avec Node.js et Express." },
    { title: "Tailwind CSS", description: "Design avec Tailwind CSS." },
    { title: "Framer Motion", description: "Animations avec Framer Motion." },
    { title: "TypeScript", description: "Développement avec TypeScript." },
    { title: "MongoDB", description: "Base de données MongoDB." },
  ];
};

export default function SkillsList() {
  interface Skill {
    title: string;
    description: string;
  }

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de l'appel API", error);
        setLoading(false);
      }
    };

    getSkills();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white">Chargement des compétences...</div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {skills.map((skill, index) => (
        <SpotlightCard
          key={index}
          title={skill.title}
          description={skill.description}
          bgColor="bg-black" // Choisis une couleur de fond
          textColor="text-white" // Choisis la couleur du texte
        />
      ))}
    </div>
  );
}
