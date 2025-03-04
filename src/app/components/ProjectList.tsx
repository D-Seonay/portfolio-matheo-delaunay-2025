"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project, ApiResponse } from "@/types";
import { useLanguage } from "../context/LanguageContext";

export default function ProjectList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/projects?lang=${language}`);
        const data: ApiResponse<Project[]> = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setProjects(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [language]);

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-gray-300 mb-6">Project List</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-800 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-gray-300 mb-6">Project List</h2>
        <div className="text-red-500 bg-red-100/10 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-300 mb-6">Project List</h2>
      {projects.map((project, idx) => (
        <Link href={`/projects/${project.id}`} key={project.id}>
          <div
            className="relative w-full overflow-hidden mb-4"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              className="flex items-left sm:items-center justify-between sm:flex-row flex-col md:p-6 p-2 border-b border-gray-700 rounded-lg bg-gray-800 cursor-pointer transition-all duration-100"
              animate={{ 
                backgroundColor: hoveredIndex === idx ? "rgba(17, 17, 17, 0.9)" : "rgba(31, 41, 55, 0.7)",
                scale: hoveredIndex === idx ? 1.02 : 1
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-start">
                <span className={`text-xl font-semibold transition-all ${
                  hoveredIndex === idx ? "text-yellow-500" : "text-white"
                }`}>
                  {project.name}
                </span>
                <span className="text-sm font-normal sm:text-base text-gray-400">{project.description}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.span
                  className="text-2xl transition-all text-yellow-500"
                  animate={{ 
                    x: hoveredIndex === idx ? 10 : 0,
                    rotate: hoveredIndex === idx ? 45 : 0
                  }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>

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