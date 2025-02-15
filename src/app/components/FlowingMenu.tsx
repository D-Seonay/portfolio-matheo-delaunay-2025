"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  images: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: "Projet Alpha",
    images: [
      "/1.png",
      "/2.png",
      "/3.png",
    ],
  },
  {
    id: 2,
    name: "Projet Beta",
    images: [
      "/images/projet2-1.jpg",
      "/images/projet2-2.jpg",
      "/images/projet2-3.jpg",
    ],
  },
  {
    id: 3,
    name: "Projet Gamma",
    images: [
      "/images/projet3-1.jpg",
      "/images/projet3-2.jpg",
      "/images/projet3-3.jpg",
    ],
  },
];

export default function ProjectsCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Changement automatique des images
  React.useEffect(() => {
    if (hoveredIndex !== null) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % projects[hoveredIndex].images.length);
      }, 2000); // Change toutes les 2 secondes
      return () => clearInterval(interval);
    }
  }, [hoveredIndex]);

  return (
    <div className="w-full flex justify-center items-center p-8 bg-gray-900">
      <nav className="flex flex-col gap-8 w-full max-w-3xl">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="relative group w-full overflow-hidden"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setCurrentImage(0);
            }}
          >
            <motion.div
              className="p-4 bg-gray-800 text-white text-center rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              {project.name}
            </motion.div>

            {/* Conteneur pour l'image et le texte */}
            <motion.div
              className="absolute inset-0 flex items-center gap-4 pl-4"
              initial={{ x: "-100%", opacity: 0 }}
              animate={hoveredIndex === idx ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src={project.images[currentImage]}
                alt={project.name}
                width={100}
                height={100}
                className="rounded-lg object-cover shadow-md"
              />
              <motion.span
                className="text-white text-xl font-bold"
                initial={{ x: -50, opacity: 0 }}
                animate={hoveredIndex === idx ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {project.name}
              </motion.span>
            </motion.div>
          </div>
        ))}
      </nav>
    </div>
  );
}
