"use client";

import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import { FooterDataType } from "@/types";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterDataType | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    fetch(`/api/footer?lang=${language}`)
      .then((res) => res.json())
      .then((data) => setFooterData(data.data))
      .catch((error) => console.error("Erreur lors du chargement du footer :", error));
  }, [language]);

  return (
    <footer className="relative w-full text-white py-14 overflow-hidden">
      {/* Grand texte en arrière-plan */}
      <h1 className="text-[15vw] font-bold text-gray-800 opacity-30 absolute inset-0 flex justify-center items-center select-none pointer-events-none">
        Seonay.
      </h1>

      {/* Contenu du footer */}
      <div className="relative z-10 flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-8 px-4 md:px-20">
        <div className="flex flex-col items-start gap-2">
          <span className="text-xs font-mono opacity-70">{footerData?.rights}</span> 
          <LanguageSwitcher />
        </div>


        
        <div className="flex flex-row gap-4">
          {footerData?.socials.map((social) => (
            <Link key={social.id} href={social.link} target="_blank" className="flex items-center gap-2 hover:text-gray-400 transition duration-200">
              {social.name === "LinkedIn" && <FaLinkedin className="h-5 w-5" />}
              {social.name === "Github" && <FaGithub className="h-5 w-5" />}
              {social.name === "Email" && <FaEnvelope className="h-5 w-5" />}
              <span>{social.name}</span>
            </Link>
          ))}
        </div>
        
        <span className="text-xs font-mono opacity-70">{footerData?.credits}</span>
        
      </div>
    </footer>
  );
}
