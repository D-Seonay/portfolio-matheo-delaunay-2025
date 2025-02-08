"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8 relative w-full background-grey">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-4xl font-bold text-blue-400 mb-4">À propos de moi</h1>
        <p className="text-lg text-gray-300">
          Salut ! Je suis Mathéo Delaunay, un développeur passionné par le numérique et les nouvelles technologies.
          Actuellement en alternance dans le secteur du développement, j&apos;étudie à l&apos;EPSI Nantes. J&apos;ai une forte expertise
          en React, Tailwind CSS, Django et Symfony, et je travaille sur divers projets, allant du web au mobile.
        </p>
        
        <h2 className="text-2xl font-semibold text-blue-300 mt-6">Compétences</h2>
        <ul className="mt-4 text-gray-400 text-lg grid grid-cols-2 gap-2">
          <li>⚡ React & Vue</li>
          <li>⚡ Django & Symfony</li>
          <li>⚡ Node.js & Express</li>
          <li>⚡ MySQL, MongoDB</li>
          <li>⚡ Tailwind CSS & Framer Motion</li>
          <li>⚡ Docker & CI/CD</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-300 mt-6">Expérience</h2>
        <p className="mt-4 text-gray-300">
          J&apos;ai eu l&apos;opportunité de travailler sur divers projets, notamment la refonte du site Food-Collect,
          un système d&apos;inventaire en Symfony, ainsi qu&apos;une application mobile de suivi sportif.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutMe;
