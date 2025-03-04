"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };

    // Initial check
    checkMobile();

    // Listen for window resize
    window.addEventListener('resize', checkMobile);

    // Only add mouse tracking if not mobile
    if (!isMobile) {
      const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      const handleMouseEnter = () => {
        const interactiveElements = document.querySelectorAll('a, button, Link, [role="button"]');
        interactiveElements.forEach(element => {
          element.addEventListener('mouseenter', () => setIsHovering(true));
          element.addEventListener('mouseleave', () => setIsHovering(false));
        });
      };

      window.addEventListener('mousemove', updateMousePosition);
      handleMouseEnter();

      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
        window.removeEventListener('resize', checkMobile);
        const interactiveElements = document.querySelectorAll('a, button, Link, [role="button"]');
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', () => setIsHovering(true));
          element.removeEventListener('mouseleave', () => setIsHovering(false));
        });
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.8,
        }}
      />
    </>
  );
}