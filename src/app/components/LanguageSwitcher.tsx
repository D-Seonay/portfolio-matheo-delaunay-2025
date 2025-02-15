// src/components/LanguageSwitcher.tsx
"use client";
import React from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
    >
      {language === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
    </button>
  );
};

export default LanguageSwitcher;
