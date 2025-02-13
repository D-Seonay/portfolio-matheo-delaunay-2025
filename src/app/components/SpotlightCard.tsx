"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
    title: string;
    description: string;
    bgColor?: string; // Couleur de fond personnalisable
    textColor?: string; // Couleur du texte personnalisable
    children?: React.ReactNode; // Contenu additionnel
}

export default function SpotlightCard({
    title,
    description,
    bgColor = "bg-gray-800",
    textColor = "text-white",
    children,
}: SpotlightCardProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        setMousePosition({ x, y });
    };

    return (
        <div className="flex items-center justify-center">
            <motion.div
                onMouseMove={handleMouseMove}
                className={`relative w-80 h-48 p-6 rounded-lg shadow-xl overflow-hidden border border-gray-700 ${bgColor} ${textColor}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Spotlight Effect */}
                <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x + 160}px ${mousePosition.y + 96}px, rgba(255, 255, 255, 0.15), transparent 80%)`,
                    }}
                />

                {/* Content */}
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-gray-400 text-sm mt-1">{description}</p>

                {/* Contenu optionnel */}
                {children && <div className="mt-3">{children}</div>}

                {/* Subtle Glow Effect */}
                <motion.div
                    className="absolute inset-0 rounded-lg border border-transparent"
                    animate={{ opacity: [0, 0.3, 0], transition: { duration: 2, repeat: Infinity } }}
                    style={{ boxShadow: `0px 0px 20px rgba(255, 255, 255, 0.15)` }}
                />
            </motion.div>
        </div>
    );
}
