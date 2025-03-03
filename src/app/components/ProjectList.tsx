"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  { id: 1, name: "Food Landing", image: "/1.png", link: "/projects/food-landing" },
  { id: 2, name: "WebApp Design", image: "/2.png", link: "/projects/webapp-design" },
  { id: 3, name: "Key System", image: "/3.png", link: "/projects/key-system" },
];

export default function ProjectList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-300 mb-6">Project List</h2>
      {projects.map((project, idx) => (
        <Link href={project.link} key={project.id}>
          <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Contenu normal */}
            <motion.div
              className="flex items-center justify-between md:p-6 p-2 border-b border-gray-700 rounded-lg bg-gray-800 cursor-pointer transition-all duration-100"
              animate={{ 
                backgroundColor: hoveredIndex === idx ? "rgba(17, 17, 17, 0.9)" : "rgba(31, 41, 55, 0.7)",
                scale: hoveredIndex === idx ? 1.02 : 1
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xl font-semibold text-primary">
                {project.id}
              </span>
              <span className={`text-xl font-semibold transition-all ${
                hoveredIndex === idx ? "text-yellow-500" : "text-white"
              }`}>
                {project.name}
              </span>
              <motion.span
                className="text-2xl transition-all text-yellow-500"
                animate={{ 
                  x: hoveredIndex === idx ? 10 : 0,
                  rotate: hoveredIndex === idx ? 45 : 0
                }}
              >
                →
              </motion.span>
            </motion.div>

            {/* Image overlay on hover */}
            {hoveredIndex === idx && (
              <motion.div
                className="absolute inset-0 flex flex-row justify-around items-center p-6 bg-gray-800/95 text-center rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl font-semibold text-yellow-500">Project #{project.id}</span>
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  width={100}
                  height={100}
                  className="rounded-lg shadow-lg hover:scale-110 transition-transform duration-200"
                />
              </motion.div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}