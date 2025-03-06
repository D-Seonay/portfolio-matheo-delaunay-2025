import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Experience, Education } from "@/types";

interface TimelineSectionProps {
  education: Education[];
  experience: Experience[];
}

const TimelineSection = ({ education, experience }: TimelineSectionProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const timelineItems = [...education, ...experience]
    .sort((a, b) => new Date(b.period.split(' - ')[0]).getTime() - new Date(a.period.split(' - ')[0]).getTime());

  const totalPages = Math.ceil(timelineItems.length / itemsPerPage);
  const currentItems = timelineItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="relative bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 mt-12 w-full"
    >
      <h3 className="text-3xl font-bold text-white mb-12">Parcours</h3>

      {/* Timeline Bar */}
      <div className="relative mb-16">
        {/* Timeline line */}
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50" />
        
        {/* Timeline years */}
        <div className="relative flex justify-between">
          {timelineItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Year dot */}
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-2" />
              {/* Year text */}
              <span className="text-sm text-gray-400">
                {item.period.split(' - ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-between mb-8">
        <button 
          onClick={handlePrevious}
          className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 transition-all hover:from-blue-500/30 hover:to-cyan-500/30"
          aria-label="Voir les événements précédents"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={handleNext}
          className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 transition-all hover:from-blue-500/30 hover:to-cyan-500/30"
          aria-label="Voir les événements suivants"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {currentItems.map((item, index) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/50 transition-all border border-gray-800/50"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-white">
                  {item.period.split(' - ')[0]}
                </span>
              </div>
              
              <h4 className="text-xl font-semibold text-white mb-2">
                {('school' in item) ? item.school : item.company}
              </h4>
              
              <p className="text-gray-400 mb-3">
                {('degree' in item) ? item.degree : item.title}
              </p>
              
              <p className="text-gray-300 text-sm">
                {('location' in item) ? item.location : item.description}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TimelineSection; 