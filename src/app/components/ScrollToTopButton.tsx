"use client"
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Utilisation d'une icône pour le bouton
import { motion } from 'framer-motion'; // Pour l'animation

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Fonction pour vérifier la position de défilement
  const checkScrollTop = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Défilement en douceur
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  return (
    <motion.div
      className={`fixed bottom-5 right-5 z-50 cursor-pointer p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition ${
        isVisible ? 'block' : 'hidden'
      }`}
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <FaArrowUp size={24} />
    </motion.div>
  );
};

export default ScrollToTopButton;