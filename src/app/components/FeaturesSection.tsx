import { motion } from "framer-motion";
import { FaCode, FaBrain, FaRocket, FaCoffee, FaLightbulb, FaUsers } from 'react-icons/fa';

const features = [
  {
    icon: <FaCode className="w-8 h-8 text-blue-500" />,
    title: "Expertise technique",
    description: "Maîtrise des technologies web modernes pour créer des applications performantes et évolutives."
  },
  {
    icon: <FaBrain className="w-8 h-8 text-purple-500" />,
    title: "Approche créative",
    description: "Chaque projet est une opportunité d'innover et de repousser les limites du design et de la technologie."
  },
  {
    icon: <FaRocket className="w-8 h-8 text-cyan-500" />,
    title: "Solutions sur mesure",
    description: "Développement d'applications adaptées à vos besoins spécifiques et à votre vision."
  },
  {
    icon: <FaCoffee className="w-8 h-8 text-yellow-500" />,
    title: "Performance optimale",
    description: "Optimisation constante pour garantir vitesse, fluidité et expérience utilisateur exceptionnelle."
  },
  {
    icon: <FaLightbulb className="w-8 h-8 text-green-500" />,
    title: "Innovation continue",
    description: "Veille technologique permanente pour appliquer les meilleures pratiques du développement web."
  },
  {
    icon: <FaUsers className="w-8 h-8 text-red-500" />,
    title: "Collaboration efficace",
    description: "Communication transparente et travail d'équipe pour des projets réussis."
  }
];

const FeaturesSection = () => {
  return (
    <div className="mt-20 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/40 transition-all border border-gray-800/50"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-gray-800/50 rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturesSection; 