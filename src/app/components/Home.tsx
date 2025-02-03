"use client";

import React from 'react'
import { motion } from 'framer-motion'


export default function Home() {
    return (
    <div className="relative min-h-screen flex flex-col">
    {/* Background Shapes */}
    <div className="absolute inset-0 -z-10">
        <div
        className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 via-blue-700 to-black opacity-70 rounded-full blur-3xl"
    ></div>
        <div
        className="absolute bottom-20 right-1/3 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400 via-blue-500 to-black opacity-50 rounded-full blur-3xl"
    ></div>
    <div
        className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-800 to-black opacity-60 rounded-full blur-2xl"
    ></div>
    </div>
    {/* Main Section */}
    <main className="flex-grow flex flex-col items-center justify-center text-center text-white px-6">
    <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-6xl font-extrabold"
    >
        Your Vision, Our <span className="text-primary">Expertise</span> — <br /> Let's Build Together
    </motion.h1>
    <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-4 text-lg sm:text-xl max-w-2xl"
    >
        Turn your idea into a thriving digital product. With our hands-on support in strategy, design, and development, we'll craft a platform that ensures your launch is nothing short of remarkable.
    </motion.p>
    <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-6 bg-primary text-black px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300"
    >
        Start Today ↗
    </motion.button>
    </main>
</div>
)
}
