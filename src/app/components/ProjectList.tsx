"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project, ApiResponse } from "@/types";
import { useLanguage } from "../context/LanguageContext";
import { FaCode, FaGithub } from "react-icons/fa";

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
    <section className="min-h-screen flex items-center py-20">
      <div className="w-full space-y-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-16 text-center"
          >
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
              {language === 'fr' ? 'Mes Projets' : 'My Projects'}
            </h3>
  
            <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto">
              {language === 'fr'
                ? "Découvrez mes réalisations et projets personnels, du développement web au mobile."
                : "Explore my achievements and personal projects, from web to mobile development."}
            </p>
          </motion.div>
            
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid gap-6 max-w-6xl mx-auto px-4"
          >
            {projects.map((project, idx) => (
              <Link href={`/projects/${project.id}`} key={project.id}>
                <motion.div
                  className="group relative w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center justify-between p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-gray-700/50 hover:shadow-lg hover:shadow-blue-500/10">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 p-3 bg-gray-800/50 rounded-lg group-hover:bg-opacity-70 transition-all duration-300 bg-blue-500/10"
                      >
                        <FaCode className="w-6 h-6 text-blue-500" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {project.name}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
  
                  {hoveredIndex === idx && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.name} preview`}
                        width={200}
                        height={150}
                        className="rounded-lg shadow-lg object-cover"
                      />
                    </motion.div>
                  )}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
  );
}