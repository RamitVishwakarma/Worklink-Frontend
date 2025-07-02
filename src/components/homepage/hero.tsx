'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Hero background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-gunmetal-800/90 to-industrial-gunmetal-800/70 z-10" />
        <Image
          src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Industrial workers"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-[85vh] flex flex-col justify-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <div className="inline-block bg-industrial-safety-300 px-4 py-1 rounded-md mb-4">
                <span className="industrial-caption text-industrial-gunmetal-800">
                  INDUSTRIAL REVOLUTION 4.0
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="industrial-hero-text text-white mb-6 leading-tight"
            >
              Connecting Skilled Labor with Industrial Opportunity
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="industrial-body-text text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
            >
              The First Digital Marketplace for Blue-Collar Jobs and Machine
              Sharing. Connect, collaborate, and contribute to the future of
              industrial work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/gigs">
                <Button
                  variant="industrial-accent"
                  size="xl"
                  className="industrial-hero-text text-base sm:text-lg px-8 py-6 shadow-lg shadow-industrial-safety-300/20 hover:shadow-industrial-safety-300/30 transition-all duration-300"
                >
                  Find Work
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="industrial-outline"
                  size="xl"
                  className="border-2 border-white/70 text-white hover:bg-white/20 hover:border-white hover:text-white font-bold text-base sm:text-lg px-8 py-6 transition-all duration-300"
                >
                  Post Requirements
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scrolling indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          <div className="w-10 h-16 border-2 border-white/30 rounded-full flex items-start justify-center pt-3">
            <div className="w-2 h-3 bg-white rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
