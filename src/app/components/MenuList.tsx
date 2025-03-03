"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
    id: number;
    name: string;
    image: string;
    link: string;
}

const menuItems: MenuItem[] = [
    { id: 1, name: "APPETIZERS", image: "/1.png", link: "/appetizers" },
    { id: 2, name: "SALADS", image: "/salad1.png", link: "/salads" },
    { id: 3, name: "MEAT", image: "/meat1.png", link: "/meat" },
    { id: 4, name: "SEAFOOD", image: "/seafood1.png", link: "/seafood" },
    { id: 5, name: "SOUPS", image: "/soup1.png", link: "/soups" },
    { id: 6, name: "VEGETABLES", image: "/veg1.png", link: "/vegetables" },
    { id: 7, name: "DRINKS", image: "/drink1.png", link: "/drinks" },
];

export default function MenuList() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Menu List</h2>
            {menuItems.map((item, idx) => (
                <Link href={item.link} key={item.id}>
                    <div
                        className="relative w-full overflow-hidden"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Contenu normal */}
                        <motion.div
                            className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800 cursor-pointer transition-all duration-100"
                            animate={{ backgroundColor: hoveredIndex === idx ? "#111" : "#444" }}
                        >
                            <span className={`text-lg font-semibold transition-all ${hoveredIndex === idx ? "text-yellow-500" : "text-white"}`}>
                                {item.name}
                            </span>

                            {/* Animation de la flèche */}
                            <motion.span
                                className="text-xl transition-all"
                                animate={{ rotate: hoveredIndex === idx ? 180 : 0 }}
                            >
                                →
                            </motion.span>
                        </motion.div>

                        {/* Affichage de l'image et du numéro de projet au hover */}
                        {hoveredIndex === idx && (
                            <motion.div
                                className="absolute inset-0 flex flex-row justify-around items-center p-4 transition-all duration-300 bg-gray-800 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <span className="text-lg font-semibold text-yellow-500">Project #{item.id}</span>
                                <Image
                                    src={item.image}
                                    alt={`${item.name} preview`}
                                    width={80}
                                    height={80}
                                    className="rounded-lg shadow-lg"
                                />
                            </motion.div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
}