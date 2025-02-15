"use client"
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => {
  return (
    <footer className="text-white py-8 px-4 min-w-full relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-1 w-[250px] h-[250px] bg-gradient-to-br from-blue-500 via-blue-700 to-black opacity-70 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-1 right-1 w-[300px] h-[300px] bg-gradient-to-br from-cyan-400 via-blue-500 to-black opacity-50 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-gradient-to-br from-blue-800 to-black opacity-60 rounded-full blur-2xl animate-blob"></div> 
        </div>


        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Rights */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-xl font-bold text-primary">Seonay.</h1>
          <LanguageSwitcher />

          <p className="text-sm mt-2">© 2025 MyWebsite. All rights reserved.</p>

        </div>

        {/* Site Map */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-4 text-primary">Site Map</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-primary">Home</a></li>
            <li><a href="#" className="hover:text-primary">About</a></li>
            <li><a href="#" className="hover:text-primary">Projects</a></li>
            <li><a href="#" className="hover:text-primary">FAQ</a></li>
          </ul>
        </div>

        {/* Socials and Legal */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-4 text-primary">Follow Us</h2>
          <div className="flex space-x-4 mb-4">
            <a href="https://www.linkedin.com/in/matheo-delaunay/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500" title="LinkedIn Profile">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/D-Seonay" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400" title="GitHub Profile">
              <FaGithub size={24} />
            </a>
          </div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-primary">Legal Notice</a></li>
            <li><a href="#" className="hover:text-primary">Terms and Conditions</a></li>
            <li><a href="mailto:contact@mywebsite.com" className="hover:text-primary">matheodelaunay04@gmail.com</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
