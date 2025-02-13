"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StatusButton() {
    const [status, setStatus] = useState("Loading...");
    const [text, setText] = useState("");
    const [statusId, setStatusId] = useState("0");
    const [statusLabel, setStatusLabel] = useState("Indéfini");
    const lang = "fr"; // ou récupérer dynamiquement selon la langue du navigateur

    useEffect(() => {
        async function fetchStatus() {
            try {
                const res = await fetch(`/api/status?lang=${lang}&id=1`);
                const data = await res.json();
                if (data.data.length > 0) {
                    setStatus(data.data[0].status);
                    setText(data.data[0].text);
                    setStatusId(data.data[0].id);
                    setStatusLabel(data.data[0].label);
                }
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        }

        fetchStatus();
        const interval = setInterval(fetchStatus, 5000); // Actualisation toutes les 5s
        return () => clearInterval(interval);
    }, []);

    // Définition des couleurs des statuts
    const statusColors: Record<string, { bg: string; ping: string; label: string }> = {
        "1": { bg: "bg-green-500", ping: "bg-green-400", label: statusLabel },
        "2": { bg: "bg-yellow-500", ping: "bg-yellow-400", label: statusLabel },
        "3": { bg: "bg-red-500", ping: "bg-red-400", label: statusLabel },
    };

    // Récupération des couleurs selon statusId, avec fallback si non trouvé
    const { bg, ping } = statusColors[statusId] || { bg: "bg-gray-500", ping: "bg-gray-400", label: "Indéfini" };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bottom-10 left-5 flex items-center space-x-3 px-5 py-2 bg-black text-white rounded-full shadow-lg border border-primary absolute z-50"
        >
            <motion.span 
                className="relative flex h-4 w-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                <span className={`absolute inline-flex h-full w-full rounded-full ${ping} opacity-75 animate-ping`}></span>
                <span className={`relative inline-flex rounded-full h-4 w-4 ${bg}`}></span>
            </motion.span>
            <span className="font-medium text-sm">{status} - {text}</span>
        </motion.div>
    );
}
