"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import { FAQType } from "../../types";
import { useLanguage } from "../context/LanguageContext";

export default function FAQ() {
  const { language } = useLanguage();
  const [faqs, setFaqs] = useState<FAQType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/faq?lang=${language}`)
      .then((response) => response.json())
      .then((data) => setFaqs(data.data))
      .catch((error) => console.error("Erreur lors du chargement des FAQs :", error));
  }, [language]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen flex items-center py-20">
      <div className="w-full space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
        <h3 className="text-4xl font-bold text-transparent bg-clip-text text-center relative bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
        {language === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}
          </h3>
          <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto">
            {language === 'fr'
              ? "Découvrez les réponses aux questions les plus courantes sur mes services et ma façon de travailler."
              : "Find answers to the most common questions about my services and how I work."}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 max-w-6xl mx-auto px-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              onClick={() => toggleFAQ(index)}
              className="group bg-[#0a0a0a]/80 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/40 transition-all border border-gray-800/50 hover:border-gray-700/50 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer w-full"
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 p-3 rounded-lg group-hover:bg-opacity-70 transition-all duration-300 bg-blue-500/10"
                >
                  <FaQuestionCircle className="w-6 h-6 text-blue-500" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 pr-8 relative">
                    {faq.question}
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 top-1"
                    >
                      <FaChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                    </motion.div>
                  </h3>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <p className="text-gray-400 text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
