"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";
import { AboutMeContent } from "@/types";

const AboutMe = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<AboutMeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  // Parallax effects
  const experienceY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const educationY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/about-me?lang=${language}`);
        if (!response.ok) {
          throw new Error('Failed to fetch about me data');
        }
        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutMe();
  }, [language]);

  if (isLoading) {
    return (
      <section id="about-me" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-900/80 backdrop-blur-sm rounded w-1/4 mx-auto"></div>
            <div className="h-4 bg-gray-900/80 backdrop-blur-sm rounded w-1/2 mx-auto"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-[400px] bg-gray-900/80 backdrop-blur-sm rounded-2xl"></div>
              <div className="space-y-8">
                <div className="h-8 bg-gray-900/80 backdrop-blur-sm rounded w-1/3"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-900/80 backdrop-blur-sm rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !content) {
    return (
      <section id="about-me" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
            {error || 'Failed to load content'}
          </div>
        </div>
      </section>
    );
  }

  const timelineItems = [...content.education, ...content.experience]
    .sort((a, b) => new Date(b.period.split(' - ')[0]).getTime() - new Date(a.period.split(' - ')[0]).getTime());

  const totalPages = Math.ceil(timelineItems.length / itemsPerPage);
  const currentItems = timelineItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  return (
    <section id="about-me" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
          <p className="text-xl text-gray-400">{content.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden">
              <Image
                src="/img/pp.svg"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="mt-6">
              <p className="text-gray-300 leading-relaxed">
                {content.description}
              </p>
            </div>
          </motion.div>

          {/* Right Column - Skills & Experience */}
          <div className="space-y-8">


            {/* Favorite Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Technologies de cœur</h3>
              <div className="flex flex-wrap gap-3">
                {content.favoriteTechnologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white rounded-full text-sm hover:from-blue-600/30 hover:to-cyan-600/30 transition-all border border-blue-500/20"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

                        {/* Skills */}
                        <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {content.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timeline Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 mt-12 w-full"
        >
          <h3 className="text-3xl font-bold text-white mb-12">Parcours</h3>

          {/* Timeline Bar */}
          <div className="relative mb-16">
            {/* Timeline line */}
            <div className="absolute left-0 top-1/2 w-full h-1 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50" />
            
            {/* Timeline years */}
            <div className="relative flex justify-between">
              {timelineItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Year dot */}
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-2" />
                  {/* Year text */}
                  <span className="text-sm text-gray-400">
                    {item.period.split(' - ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between mb-8">
            <button 
              onClick={handlePrevious}
              className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 transition-all hover:from-blue-500/30 hover:to-cyan-500/30"
              aria-label="Voir les événements précédents"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 transition-all hover:from-blue-500/30 hover:to-cyan-500/30"
              aria-label="Voir les événements suivants"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {currentItems.map((item, index) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/50 transition-all border border-gray-800/50"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-white">
                      {item.period.split(' - ')[0]}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {('school' in item) ? item.school : item.company}
                  </h4>
                  
                  <p className="text-gray-400 mb-3">
                    {('degree' in item) ? item.degree : item.title}
                  </p>
                  
                  <p className="text-gray-300 text-sm">
                    {('location' in item) ? item.location : item.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
