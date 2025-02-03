"use client";

import { motion } from "framer-motion";
import { PiStarFourFill } from "react-icons/pi";


const services = [
  "Maquettage UI/UX",
<PiStarFourFill className="h-6 w-6"/>,
  "Développement Front-End",
<PiStarFourFill className="h-6 w-6"/>,
  "Développement Back-End",
<PiStarFourFill className="h-6 w-6"/>,
  "Création de Portfolio",
<PiStarFourFill  className="h-6 w-6"/>,
];

export default function ServicesBanner() {
  return (
    <div className="w-full overflow-hidden py-4 backdrop-blur-lg shadow-md">
      <motion.div
        className="flex gap-12 whitespace-nowrap text-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 10, // Ajuste la durée pour contrôler la vitesse du défilement
          ease: "linear",
        }}
      >
        {/* Première répétition des services */}
        {services.map((service, index) => (
          <span
            key={index}
            className="text-white text-lg font-semibold px-6 py-2 rounded-xl flex items-center gap-2"
          >
            {service}
          </span>
        ))}

        {/* Deuxième répétition pour continuer le défilement */}
        {services.map((service, index) => (
          <span
            key={index + services.length}
            className="text-white text-lg font-semibold px-6 py-2 rounded-xl flex items-center gap-2"
          >
            {service}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
