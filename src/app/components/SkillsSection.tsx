import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FaReact, FaNodeJs, FaDatabase, FaCloud, FaTools, FaMobile } from 'react-icons/fa';
import { PiBrainBold } from "react-icons/pi";
import type { SkillGroup } from "@/pages/api/skills";

// Map des icônes et leurs couleurs pour chaque catégorie
const categoryConfig: { [key: string]: { icon: IconType; color: string } } = {
  Frontend: { icon: FaReact, color: "text-cyan-500" },
  Backend: { icon: FaNodeJs, color: "text-green-500" },
  "Base de données": { icon: FaDatabase, color: "text-purple-500" },
  DevOps: { icon: FaCloud, color: "text-blue-500" },
  Mobile: { icon: FaMobile, color: "text-red-500" },
  Outils: { icon: FaTools, color: "text-yellow-500" },
};

const SkillsSection = () => {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const ref = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/skills');
        if (!response.ok) {
          throw new Error('Failed to fetch skills');
        }
        const data = await response.json();
        setSkillGroups(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-800 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-2/3 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-xl h-40"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading skills: {error}</p>
      </div>
    );
  }

  return (
    <section ref={ref} className="min-h-screen flex items-center py-20">
      <div className="space-y-8 w-full">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
            Technologies
          </h3>
          <p className="text-xl text-gray-400">
            Un aperçu des technologies que je maîtrise pour créer des applications web modernes et performantes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillGroups.map((group, index) => {
            const config = categoryConfig[group.title];
            if (!config) return null;
            const { icon: Icon, color } = config;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-lg bg-gray-800/50 group-hover:bg-opacity-70 transition-all duration-300 ${color.replace('text-', 'bg-')}/10`}
                  >
                    <Icon className={`w-7 h-7 ${color} transform transition-all duration-300`} />
                  </motion.div>
                  <h4 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {group.title}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1.5 ${color.replace('text-', 'bg-')}/5 text-white rounded-full text-sm border ${color.replace('text-', 'border-')}/20 hover:border-opacity-50 transition-all duration-300 cursor-default`}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="text-center mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 hover:border-blue-400/30 transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-3 text-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <PiBrainBold className="w-6 h-6 text-blue-400" />
            </motion.div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Toujours en veille technologique et en apprentissage continu
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection; 