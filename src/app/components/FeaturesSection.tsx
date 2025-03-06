import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaBrain, FaRocket, FaCoffee, FaLightbulb, FaUsers } from 'react-icons/fa';
import type { Feature } from "@/pages/api/features";
import { useLanguage } from "../context/LanguageContext";

// Map des icônes pour chaque catégorie
const iconConfig: { [key: string]: { icon: typeof FaCode; color: string } } = {
  tech: { icon: FaCode, color: "text-blue-500" },
  creative: { icon: FaBrain, color: "text-purple-500" },
  solution: { icon: FaRocket, color: "text-cyan-500" },
  performance: { icon: FaCoffee, color: "text-yellow-500" },
  innovation: { icon: FaLightbulb, color: "text-green-500" },
  collaboration: { icon: FaUsers, color: "text-red-500" },
};

const FeaturesSection = () => {
  const { language } = useLanguage();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/features?lang=${language}`);
        if (!response.ok) {
          throw new Error('Failed to fetch features');
        }
        const data = await response.json();
        setFeatures(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, [language]); // Recharger quand la langue change

  if (isLoading) {
    return (
      <div className="mt-20 mb-16 space-y-8 animate-pulse">
        <div className="h-12 bg-gray-800 rounded w-1/3 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-xl h-40"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading features: {error}</p>
      </div>
    );
  }

  return (
    <div className="mt-20 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mb-16"
      >
        <h2 className="text-4xl font-bold text-transparent bg-clip-text mb-8 text-center relative">
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold border-2 border-white/80 px-8 py-2 rounded-lg">
              {language === 'fr' ? 'Mes compétences' : 'My Skills'}
            </span>
          </span>
          <span className="opacity-0">
            {language === 'fr' ? 'Mes compétences' : 'My Skills'}
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => {
          const config = iconConfig[feature.category];
          const Icon = config.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/40 transition-all border border-gray-800/50 hover:border-gray-700/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 p-3 bg-gray-800/50 rounded-lg group-hover:bg-opacity-70 transition-all duration-300 ${config.color.replace('text-', 'bg-')}/10`}
                >
                  <Icon className={`w-8 h-8 ${config.color}`} />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FeaturesSection; 