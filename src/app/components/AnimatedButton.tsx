import React from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { motion } from "framer-motion";

interface ButtonProps {
  text: string; // Le texte à afficher dans le bouton
  link: string; // Le lien vers lequel rediriger
}

const Button: React.FC<ButtonProps> = ({ text, link }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }} // Effet d'agrandissement au survol
      whileTap={{ scale: 0.95 }} // Réduction lors du clic
      className="relative inline-flex h-12 transition-transform overflow-hidden rounded-lg p-[1px] focus:outline-none mt-6"
    >
      {/* Animation de gradient */}
      <motion.span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,#fbbf24_50%,#fcd34d_100%)]"
        layoutId="gradient-animation"
      ></motion.span>
      {/* Contenu du bouton */}
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
        {text}
        <FaPaperPlane className="w-5 h-5" />
      </span>
    </motion.a>
  );
};

export default Button;
    