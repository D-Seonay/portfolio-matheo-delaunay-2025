"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Food Landing",
    image: "/1.png",
  },
  {
    id: 2,
    title: "WebApp Design",
    image: "/2.png",
  },
  {
    id: 3,
    title: "Key System",
    image: "/3.png",
  },
];

export default function ProjectList() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative min-h-screen bg-[#f6f4f0] text-black w-full p-8">
      <h1 className="text-4xl font-semibold mb-10">Project List</h1>
      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProject(project.image)}
            onMouseLeave={() => setHoveredProject(null)}
            onMouseMove={handleMouseMove}
            className="flex items-center gap-4 cursor-pointer"
          >
            <span className="text-4xl font-bold text-yellow-500">
              {project.id}
            </span>
            <h2 className="text-3xl font-semibold hover:italic transition duration-300">
              {project.title}
            </h2>
          </div>
        ))}
      </div>

      {hoveredProject && (
        <motion.img
          src={hoveredProject}
          alt="Preview"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: mousePosition.x - 150, // Décalage pour centrer l'image
            y: mousePosition.y - 500, // Décalage pour centrer l'image
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className=" pointer-events-none rounded-full shadow-xl w-[300px] h-[300px] object-cover"
        />
      )}
    </div>
  );
}
