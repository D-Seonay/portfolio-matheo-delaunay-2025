"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";


const faqs = [
  {
    question: "What types of services do you offer?",
    answer: "We offer a wide range of services including marketing, product development, and more."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, our team is dedicated to providing continuous support even after launch."
  },
  {
    question: "Can you help with Generative AI for my business?",
    answer: "Absolutely, we specialize in integrating Generative AI solutions."
  },
  {
    question: "What tools and technologies do you use?",
    answer: "We use the latest tools such as React, Node.js, and Tailwind CSS."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="text-white min-h-full py-16 px-4 md:px-20 w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-navy">FAQs</h1>
        <p className="text-center text-gray-400 mb-12">
          Explore inspiring thought leadership publications about business and technology.
        </p>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className=" rounded-2xl p-6 shadow-lg cursor-pointer"
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
