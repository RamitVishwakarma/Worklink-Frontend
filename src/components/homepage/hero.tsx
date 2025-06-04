'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Hero background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-gunmetal-800/90 to-industrial-gunmetal-800/70 z-10" />
        <img
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
                <span className="font-oswald font-bold text-industrial-gunmetal-800 tracking-wider">
                  INDUSTRIAL REVOLUTION 4.0
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-oswald font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            >
              Connecting Skilled Labor with Industrial Opportunity
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
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
              <Button className="bg-industrial-safety-300 hover:bg-industrial-safety-400 text-industrial-gunmetal-800 font-bold text-lg px-8 py-6 rounded-md shadow-lg shadow-industrial-safety-300/20">
                Find Work
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-300 hover:bg-white/20 hover:text-black/70 font-bold text-lg px-8 py-6 rounded-md"
              >
                Post Requirements
              </Button>
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
