"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full py-4 px-6 flex justify-between items-center z-50"
    >
      {/* Logo */}
      <Link href="/" className="text-primary text-2xl font-bold">
        Seonay.
      </Link>

      {/* Menu Desktop */}
      <ul className="hidden md:flex gap-6 px-6 py-3 rounded-xl backdrop-blur-lg shadow-md">
        {["Home", "About Me", "Projects", "FAQ"].map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer mx-2"
          >
            <Link href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-white text-lg hover:text-primary transition">
              {item}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* CTA Contact */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden md:block">
        <Link href="#contact" className="bg-primary text-black px-6 py-2 rounded-xl text-lg font-bold shadow-md hover:bg-yellow-500 transition">
          Contact
        </Link>
      </motion.div>

      {/* Burger Menu (Mobile) */}
      <div className="md:hidden text-white hover:text-primary transition">
        <button 
        onClick={toggleMenu}
        className="text-2xl"
        type="button"
        aria-label="Open Menu"
        >
            <FaBars size={24} />
        </button>
      </div>

      {/* Menu Mobile (Slide-in) */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-full h-full bg-black/80 backdrop-blur-lg flex flex-col items-center justify-center gap-6 shadow-lg md:hidden"
        >
          {/* Bouton pour fermer le menu */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-white text-2xl hover:text-primary transition"
            type="button"
            aria-label="Close Menu"
          >
            <FaTimes />
          </button>

          {["Home", "About Me", "Projects", "FAQ", "Contact"].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-white text-2xl hover:text-primary transition"
                onClick={toggleMenu} // Ferme le menu après un clic
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
