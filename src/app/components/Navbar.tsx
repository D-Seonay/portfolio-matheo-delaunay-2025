"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full py-4 px-6 flex justify-between items-center z-50"
    >
      {/* Logo */}
      <Link href="/" className="text-white text-2xl font-bold">
        MyLogo
      </Link>

      {/* Menu */}
      <ul className="hidden md:flex gap-6 px-6 py-3 rounded-xl backdrop-blur-lg shadow-md">
        {["Home", "About Me", "Projects", "FAQ", "Contact"].map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer mx-2"
          >
            <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-white text-lg hover:text-gray-300 transition">
              {item}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* CTA Contact */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href="/contact" className="bg-primary text-black px-6 py-2 rounded-xl text-lg font-bold shadow-md hover:bg-yellow-400 transition">
          Contact
        </Link>
        {/* <button className="bg-white text-black px-4 py-2 rounded-lg shadow-lg">Contact Us</button> */}


      </motion.div>
    </motion.nav>
  );
}
