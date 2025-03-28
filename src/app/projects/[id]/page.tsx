"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project, ApiResponse } from "@/types";
import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";

export default function ProjectDetail() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { language } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [hasNextProject, setHasNextProject] = useState(false);
  const [hasPreviousProject, setHasPreviousProject] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        // Précharger l'image principale avant même de charger les données
        if (id) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'image';
          preloadLink.href = `/api/projects/${id}/image`;
          preloadLink.type = 'image/webp';
          preloadLink.media = '(min-width: 768px)';
          preloadLink.crossOrigin = 'anonymous';
          document.head.appendChild(preloadLink);
        }

        const response = await fetch(`/api/projects?id=${id}&lang=${language}`);
        const data: ApiResponse<Project> = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setProject(data.data || null);

        // Vérifier si le prochain projet existe
        const nextResponse = await fetch(`/api/projects?id=${parseInt(id) + 1}&lang=${language}`);
        const nextData = await nextResponse.json();
        setHasNextProject(!nextData.error && nextData.data);

        // Vérifier si le projet précédent existe
        if (parseInt(id) > 1) {
          const prevResponse = await fetch(`/api/projects?id=${parseInt(id) - 1}&lang=${language}`);
          const prevData = await prevResponse.json();
          setHasPreviousProject(!prevData.error && prevData.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, language]);

  // Précharger l'image principale avec plusieurs techniques
  useEffect(() => {
    const mainScreenshot = project?.screenshots?.[0];
    if (mainScreenshot) {
      // 1. Préchargement avec link preload
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = mainScreenshot;
      link.type = 'image/webp';
      link.media = '(min-width: 768px)';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);

      // 2. Préchargement avec fetch
      fetch(mainScreenshot, {
        method: 'GET',
        mode: 'cors',
        cache: 'force-cache',
        headers: {
          'Accept': 'image/webp,image/*,*/*;q=0.8',
        }
      });

      // 3. Préchargement avec Image
      const img = new window.Image();
      img.src = mainScreenshot;
      img.crossOrigin = 'anonymous';
    }
  }, [project?.screenshots]);

  if (isLoading) {
    return (
      <div className="p-8 mt-14">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-900/80 backdrop-blur-sm rounded w-1/4"></div>
            <div className="aspect-video bg-gray-900/80 backdrop-blur-sm rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-900/80 backdrop-blur-sm rounded w-3/4"></div>
              <div className="h-4 bg-gray-900/80 backdrop-blur-sm rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-8 mt-14">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
            {error || "Project not found"}
          </div>
        </div>
      </div>
    );
  }

  const handleNextProject = () => {
    const nextId = parseInt(project.id) + 1;
    router.push(`/projects/${nextId}`);
  };

  const handlePreviousProject = () => {
    const prevId = parseInt(project.id) - 1;
    router.push(`/projects/${prevId}`);
  };

  return (
    <div className="p-8 relative min-h-screen">
      {/* Background Image */}
      <Image
        src="/grid.svg"
        alt="grid bg"
        className="absolute inset-0 z-0 min-w-full"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        loading="eager"
      />

      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 opacity-50 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 via-blue-700 to-black opacity-70 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-1/3 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400 via-blue-500 to-black opacity-50 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-800 to-black opacity-60 rounded-full blur-2xl animate-blob"></div>
      </div>

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gray-black/20 backdrop-blur-sm -z-5"></div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* En-tête du projet */}
          <div className="flex justify-between items-start flex-col sm:flex-row mt-14">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {project.link ? (
                  <Link 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-500 transition-colors"
                  >
                    {project.name} ↗
                  </Link>
                ) : (
                  project.name
                )}
              </h1>
              <p className="text-xl text-gray-400">{project.description}</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Galerie d'images */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden">
              <Image
                src={project.screenshots[activeImage]}
                alt={`${project.name} main screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
                priority
                loading="eager"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMkhiSk5NVVVXW1xbOEVJW1VfX1//2wBDARUXFx4aHjshITtVQy8vVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                decoding="async"
                fetchPriority="high"
                crossOrigin="anonymous"
                onLoad={() => {
                  // Marquer l'image comme chargée pour le LCP
                  if (typeof window !== 'undefined') {
                    window.performance?.mark?.('lcp-image-loaded');
                  }
                }}
              />
            </div>

            {/* Miniatures */}
            <div className="grid grid-cols-3 gap-4">
              {project.screenshots.map((screenshot, index) => (
                <div 
                  key={index}
                  className={`relative aspect-video bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition-all ${
                    activeImage === index ? 'ring-2 ring-yellow-500' : 'hover:opacity-80'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={screenshot}
                    alt={`${project.name} thumbnail ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 33vw, 25vw"
                    className="object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={75}
                    decoding="async"
                    crossOrigin="anonymous"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description détaillée et Collaborateurs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">À propos du projet</h2>
                <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
              </div>

              {/* Section Collaborateurs */}
              {project.collaborators.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Équipe du projet</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.collaborators.map((collaborator) => (
                      <motion.div
                        key={collaborator.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4"
                      >
                        <div>
                          <h3 className="text-white font-semibold">{collaborator.name}</h3>
                          <p className="text-gray-400 text-sm">{collaborator.role}</p>
                          {collaborator.link && (
                            <Link
                              href={collaborator.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-yellow-500 text-sm hover:underline mt-1 inline-block"
                            >
                              Voir le profil →
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              {/* Status du projet */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Status</h3>
                <div className="">
                  <span className={`px-3 py-2 rounded-full text-sm ${
                    project.status === 'production' ? 'bg-green-500/20 text-green-500' :
                    project.status === 'development' ? 'bg-blue-500/20 text-blue-400' :
                    project.status === 'completed' ? 'bg-purple-500/20 text-purple-500' :
                    project.status === 'archived' ? 'bg-gray-500/20 text-gray-500' :
                    'bg-yellow-500/20 text-yellow-500' // pour paused
                  }`}>
                    {project.status === 'production' ? 'En Production' :
                     project.status === 'development' ? 'En Développement' :
                     project.status === 'completed' ? 'Terminé' :
                     project.status === 'archived' ? 'Archivé' :
                     'En Pause'}
                  </span>
                </div>
              </div>

              {/* Fonctionnalités */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Fonctionnalités</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Repository */}
              {project.repository && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Repository</h3>
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        project.repository.isPrivate 
                          ? 'bg-red-500/20 text-red-500' 
                          : 'bg-green-500/20 text-green-500'
                      }`}>
                        {project.repository.isPrivate ? 'Privé' : 'Public'}
                      </span>
                    </div>
                    {!project.repository.isPrivate && (
                      <Link
                        href={project.repository.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Voir le code source
                      </Link>
                    )}
                    {project.repository.isPrivate && (
                      <p className="text-gray-400 text-sm italic">
                        Ce repository est privé et ne peut pas être partagé publiquement.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Lien vers le projet */}
              {project.link && project.link !== "#" && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Lien du projet</h3>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors bg-gray-900/80 backdrop-blur-sm rounded-lg p-4"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Visiter le site
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Navigation buttons at the bottom */}
          <div className="relative backdrop-blur-sm p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
              <div className="flex items-center gap-4">

                
                <motion.button
                  whileHover={hasPreviousProject ? { scale: 1.05 } : {}}
                  whileTap={hasPreviousProject ? { scale: 0.95 } : {}}
                  onClick={handlePreviousProject}
                  disabled={!hasPreviousProject}
                  className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                    hasPreviousProject 
                      ? 'bg-gray-800 text-yellow-500 hover:bg-gray-700 cursor-pointer'
                      : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  ← Précédent
                </motion.button>
              </div>

              {project.link && project.link !== "#" && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition-colors"
                >
                  Voir le projet en direct ↗
                </Link>
              )}

              <motion.button
                whileHover={hasNextProject ? { scale: 1.05 } : {}}
                whileTap={hasNextProject ? { scale: 0.95 } : {}}
                onClick={handleNextProject}
                disabled={!hasNextProject}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                  hasNextProject 
                    ? 'bg-gray-800 text-yellow-500 hover:bg-gray-700 cursor-pointer'
                    : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                }`}
              >
                Suivant →
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 