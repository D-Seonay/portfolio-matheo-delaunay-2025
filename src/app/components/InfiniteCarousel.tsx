"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type SlideProps = {
  text: string;
  image: string;
};

type InfiniteCarouselProps = {
  slides: SlideProps[];
};

export default function InfiniteCarousel({ slides }: InfiniteCarouselProps) {
  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex gap-12 whitespace-nowrap text-center"
        initial={{ x: '0%' }}
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          duration: 10,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-[300px] flex flex-col items-center justify-center text-center p-4"
          >
            <Image
              src={slide.image}
              alt={slide.text}
              width={300}
              height={200}
              className="rounded-xl shadow-lg mb-4"
            />
            <h3 className="text-xl font-bold text-white">{slide.text}</h3>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
