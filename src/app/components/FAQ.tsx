"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { FAQType } from "../../types";


export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Fetch FAQs from API
    fetch("/api/faq?lang=fr") // Change the lang query parameter to "en" for English FAQs
      .then((response) => response.json())
      .then((data) => setFaqs(data.data))
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="text-white min-h-full py-16 px-4 md:px-20 w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center text-primary">FAQs</h1>
        <p className="text-center text-gray-400 mb-12">
          Explore inspiring thought leadership publications about business and technology.
        </p>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-4 shadow-lg cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{faq.question}</h2>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="w-6 h-6 text-gray-400" />
                </motion.div>
              </div>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-gray-300"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
