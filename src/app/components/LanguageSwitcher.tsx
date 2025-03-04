// src/components/LanguageSwitcher.tsx
"use client";
import React from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="py-2 text-sm text-gray-300 hover:text-gray-100"
    >
      {language === "fr" ? "Changer en Anglais  🇬🇧" : "Switch to French  🇫🇷"}
    </button>
  );
};

export default LanguageSwitcher;
  