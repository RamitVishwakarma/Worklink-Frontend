'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Cog, Factory } from 'lucide-react';

const ValueCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-industrial-safety-300 group hover:transform hover:translate-y-[-8px] transition-transform duration-300"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-industrial-safety-300/10 transition-colors duration-300">
        <Icon className="w-8 h-8 text-industrial-safety-500" />
      </div>
      <h3 className="font-oswald text-2xl font-bold text-industrial-gunmetal-800 mb-3">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export function ValueProposition() {
  return (
    <section className="py-20 bg-gray-50" id="value-proposition">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-oswald font-bold text-3xl md:text-4xl text-industrial-gunmetal-800 mb-4">
            Three Ecosystems, One Platform
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            WorkLink breaks down silos between blue-collar workers, innovative
            startups, and established manufacturers. We transform idle resources
            into active opportunities for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ValueCard
            icon={Wrench}
            title="Skilled Workers Thrive"
            description="Apply for gigs at startups and manufacturers. Showcase your skills, build your reputation, and earn consistent income in the industrial sector."
            delay={0.1}
          />
          <ValueCard
            icon={Cog}
            title="Startups Scale Smart"
            description="Access idle manufacturing equipment during off-seasons. Execute projects without massive capital investments while finding skilled operators."
            delay={0.3}
          />
          <ValueCard
            icon={Factory}
            title="Manufacturers Maximize Assets"
            description="Turn idle machinery into revenue streams. List equipment, find reliable workers, and optimize capacity utilization year-round."
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
}
