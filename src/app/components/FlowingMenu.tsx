"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { motion } from "framer-motion";
import InfiniteCarousel from './InfiniteCarousel';

interface Project {
  id: number;
  name: string;
  images: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: "Projet Alpha",
    images: ["/1.png"],
  },
  {
    id: 2,
    name: "Projet Beta",
    images: ["/2.png", "/3.png", "/2.png", "/3.png", "/2.png", "/3.png"],
  },
  {
    id: 3,
    name: "Projet Gamma",
    images: ["/3.png", "/4.png", "/3.png", "/4.png", "/3.png", "/4.png"],
  },
];

export default function ProjectsCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-screen flex justify-center items-center p-8">
      <div className="flex flex-col w-screen">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="relative group w-screen overflow-hidden"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              className="p-4 bg-black text-white text-center shadow-lg cursor-pointer"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Affichage du nom du projet */}
              {project.name}
            </motion.div>

            {/* Affichage du Carousel au Hover */}
            {hoveredIndex === idx && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full flex overflow-hidden">
                <motion.div
        className="flex gap-12 whitespace-nowrap text-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
                  >
                    {/* Dupliquer les éléments pour une animation continue */}
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        className="min-w-[300px] flex flex-col text-center p-4"
                      >
                        {/* Affichage de l'image ou du texte */}
                        {index % 2 === 0 ? (
                          // Afficher l'image si l'index est pair
                          <Image
                            src={image}
                            alt={`Image du projet ${project.name}`}
                            width={300}
                            height={200}
                            className="rounded-xl shadow-lg mb-4"
                          />
                        ) : (
                          // Afficher le texte si l'index est impair
                          <h3 className="text-xl font-bold text-white">
                            {project.name}
                          </h3>
                        )}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
