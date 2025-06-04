'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  CalendarClock,
  MapPin,
  Shield,
  BadgeCheck,
  BarChart,
  MessageSquare,
  Smartphone,
  CreditCard,
} from 'lucide-react';

const features = [
  {
    icon: CalendarClock,
    title: 'On-Demand Scheduling',
    description:
      'Book workers or machines with real-time availability. No waiting, no hassle.',
    cta: 'Learn More',
  },
  {
    icon: MapPin,
    title: 'Proximity Matching',
    description:
      'Find opportunities within your area. Reduce travel time and costs.',
    cta: 'Explore',
  },
  {
    icon: Shield,
    title: 'Verified Credentials',
    description:
      'Every worker and machine is verified for safety and quality standards.',
    cta: 'Our Standards',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description:
      'Transparent pricing with secure payment processing and escrow options.',
    cta: 'Payment Options',
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-20 bg-gray-100" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-oswald font-bold text-3xl md:text-4xl text-industrial-gunmetal-800 mb-4">
            Powerful Platform Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform is built with industrial-grade features to power your
            business and career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.02) 75%, transparent 75%, transparent)',
                  backgroundSize: '20px 20px',
                }}
              >
                <div className="border-b border-gray-200">
                  <div className="h-2 bg-industrial-safety-300 rounded-t-lg"></div>
                </div>

                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-industrial-gunmetal-800/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-industrial-safety-300/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-industrial-gunmetal-800" />
                    </div>
                    <h3 className="font-oswald text-xl font-bold text-industrial-gunmetal-800">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6">{feature.description}</p>

                  <Button
                    variant="link"
                    className="px-0 text-industrial-safety-500 hover:text-industrial-safety-600 font-medium"
                  >
                    {feature.cta} →
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button className="bg-industrial-gunmetal-800 hover:bg-industrial-gunmetal-900 text-white font-medium px-8 py-6 rounded-md">
            Explore All Features
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
