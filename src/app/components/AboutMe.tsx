"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { AboutMeContent } from "@/types";
import ProfileSection from "./ProfileSection";
import SkillsSection from "./SkillsSection";
import FeaturesSection from "./FeaturesSection";

const AboutMe = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<AboutMeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        <div className="grid grid-cols-1">
          {/* Left Column - Profile */}
          <ProfileSection description={content.description} />


        </div>

        {/* Features Section */}
        <FeaturesSection />

        {/* Skills Section */}
        <SkillsSection />




        {/* Timeline Section */}
        {/*
        <TimelineSection 
          education={content.education}
          experience={content.experience}
        />
        */}
      </div>
    </section>  );
};

export default AboutMe;
