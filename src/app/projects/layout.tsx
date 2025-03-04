"use client";

import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
} 