"use client";

import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";


export default function ScrollDownIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
      <motion.div
        animate={{ y: [0, 10, 0] }} // Mouvement haut-bas
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaChevronDown className="w-8 h-8 text-gray-200 opacity-50" />
      </motion.div>
    </div>
  );
}
