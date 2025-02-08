"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  { name: "Food-Collect", image: "/file.svg" },
  { name: "Inventory Manager", image: "/images/inventory.png" },
  { name: "Fake Shop", image: "/images/fake-shop.png" },
  { name: "Campus Connect", image: "/images/campus-connect.png" },
  { name: "Pokédex", image: "/images/pokedex.png" },
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<{ name: string; image: string } | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white p-10">
      <h2 className="text-3xl font-bold mb-6">Mes Projets</h2>
      <ul className="space-y-4">  
        {projects.map((project, index) => (
          <li
            key={index}
            className="text-xl cursor-pointer hover:text-blue-400"
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
            onMouseMove={handleMouseMove}
          >
            {project.name}
          </li>
        ))}
      </ul>
      {hoveredProject && (
        <motion.img
          src={hoveredProject.image}
          alt={hoveredProject.name}
          className="absolute w-40 h-40 rounded-lg shadow-lg"
          style={{
            top: cursorPos.y + 10,
            left: cursorPos.x + 10,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      )}
    </div>
  );
}

