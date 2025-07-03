'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { IndustrialCard } from '@/components/ui/industrial-card';

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon:
    | 'gear'
    | 'factory'
    | 'wrench'
    | 'cog'
    | 'hammer'
    | 'hardhat'
    | 'bolt'
    | 'circuit';
  path: string;
  features: string[];
  color: string;
}

const roleOptions: RoleOption[] = [
  {
    id: 'worker',
    title: 'Blue-Collar Worker',
    description: 'Find skilled gigs and access machinery for your projects',
    icon: 'hardhat',
    path: '/worker/dashboard',
    features: [
      'Browse and apply to industrial gigs',
      'Access idle machinery from manufacturers',
      'Build your skills and reputation',
      'Earn consistent income in your trade',
    ],
    color: 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100',
  },
  {
    id: 'startup',
    title: 'Startup',
    description: 'Scale with idle machinery and skilled workers',
    icon: 'bolt',
    path: '/startup/dashboard',
    features: [
      'Post project requirements and gigs',
      'Rent idle manufacturing equipment',
      'Find verified skilled workers',
      'Scale production without capital investment',
    ],
    color: 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
    description: 'Monetize idle equipment during off-seasons',
    icon: 'factory',
    path: '/manufacturer/dashboard',
    features: [
      'List idle machinery for rental',
      'Generate revenue from unused assets',
      'Connect with verified operators',
      'Maximize equipment utilization year-round',
    ],
    color:
      'border-industrial-safety-500 bg-gradient-to-br from-industrial-safety-50 to-industrial-safety-100',
  },
];

export function RoleSelector() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-oswald font-bold text-3xl md:text-4xl text-industrial-gunmetal-800 mb-4">
            Join the Industrial Ecosystem
          </h2>
          <p className="text-industrial-gunmetal-600 max-w-3xl mx-auto">
            Whether you're a skilled worker seeking opportunities, a startup
            needing resources, or a manufacturer with idle equipment, WorkLink
            connects your needs with solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roleOptions.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <IndustrialCard className={`h-full border-l-4 ${role.color}`}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="p-3 rounded-full bg-industrial-gunmetal-100 flex items-center justify-center">
                    <IndustrialIcon
                      icon={role.icon}
                      size="lg"
                      className="text-industrial-gunmetal-800"
                    />
                  </div>
                  <h3 className="font-oswald font-bold text-xl text-industrial-gunmetal-800">
                    {role.title}
                  </h3>
                </div>

                <p className="text-industrial-gunmetal-600 mb-6">
                  {role.description}
                </p>

                <ul className="space-y-2 mb-8">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-industrial-safety-500 mt-1">✓</span>
                      <span className="text-industrial-gunmetal-700 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Link href={role.path}>
                    <button className="w-full bg-industrial-gunmetal-800 hover:bg-industrial-gunmetal-900 text-white font-medium py-3 rounded-industrial transition-colors">
                      Enter {role.title} Dashboard
                    </button>
                  </Link>

                  <Link href="/signup">
                    <button className="w-full mt-2 border border-industrial-gunmetal-300 hover:bg-industrial-gunmetal-50 text-industrial-gunmetal-700 font-medium py-2 rounded-industrial transition-colors text-sm">
                      Sign Up as {role.title}
                    </button>
                  </Link>
                </div>
              </IndustrialCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
