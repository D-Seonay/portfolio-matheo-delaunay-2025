"use client";

import { motion } from "framer-motion";
import { PiStarFourFill } from "react-icons/pi";
import { useLanguage } from "../context/LanguageContext";
import { ServiceType } from "@/types";
import { useEffect, useState } from "react";

export default function ServicesBanner() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    fetch(`/api/services?lang=${language}`)
      .then((response) => response.json())
      .then((data) => setServices(data.data))
      .catch((error) => console.error("Erreur lors du chargement des services :", error));
  }, [language]);

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
            {service.title || <PiStarFourFill className="h-6 w-6" />}
          </span>
        ))}

        {/* Deuxième répétition pour assurer la continuité du défilement */}
        {services.map((service) => (
          <span
            key={`repeat-${service.id}`}
            className="text-white text-lg font-semibold px-6 py-2 rounded-xl flex items-center gap-2"
          >
            {service.title || <PiStarFourFill className="h-6 w-6" />}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
