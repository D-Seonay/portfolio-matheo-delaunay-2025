"use client";

import { motion } from "framer-motion";
import { PiStarFourFill } from "react-icons/pi";

const services = [
  { id: 1, label: "Maquettage UI/UX" },
  { id: 2, icon: <PiStarFourFill className="h-6 w-6" /> },
  { id: 3, label: "Développement Front-End" },
  { id: 4, icon: <PiStarFourFill className="h-6 w-6" /> },
  { id: 5, label: "Développement Back-End" },
  { id: 6, icon: <PiStarFourFill className="h-6 w-6" /> },
  { id: 7, label: "Création de Portfolio" },
  { id: 8, icon: <PiStarFourFill className="h-6 w-6" /> },
];

export default function ServicesBanner() {
  return (
    <div className="w-full overflow-hidden py-4 backdrop-blur-lg shadow-md">
      <motion.div
        className="flex gap-12 whitespace-nowrap text-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
        {/* Première répétition des services */}
        {services.map((service) => (
          <span
            key={service.id}
            className="text-white text-lg font-semibold px-6 py-2 rounded-xl flex items-center gap-2"
          >
            {service.label || service.icon}
          </span>
        ))}

        {/* Deuxième répétition pour assurer la continuité du défilement */}
        {services.map((service) => (
          <span
            key={`repeat-${service.id}`}
            className="text-white text-lg font-semibold px-6 py-2 rounded-xl flex items-center gap-2"
          >
            {service.label || service.icon}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
