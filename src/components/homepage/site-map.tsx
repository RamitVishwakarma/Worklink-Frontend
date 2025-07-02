'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { IndustrialCard } from '@/components/ui/industrial-card';

interface RouteSection {
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
  routes: {
    path: string;
    name: string;
    description: string;
  }[];
}

const routeSections: RouteSection[] = [
  {
    title: 'Authentication',
    description: 'Account access and registration',
    icon: 'hardhat',
    routes: [
      { path: '/signin', name: 'Sign In', description: 'Access your account' },
      { path: '/signup', name: 'Sign Up', description: 'Create new account' },
    ],
  },
  {
    title: 'General Platform',
    description: 'Public platform features',
    icon: 'gear',
    routes: [
      {
        path: '/gigs',
        name: 'Browse Gigs',
        description: 'View available job opportunities',
      },
      {
        path: '/machines',
        name: 'View Machines',
        description: 'Browse available industrial equipment',
      },
    ],
  },
  {
    title: 'Worker Portal',
    description: 'Worker-specific features and tools',
    icon: 'hammer',
    routes: [
      {
        path: '/worker/dashboard',
        name: 'Dashboard',
        description: 'Worker overview and stats',
      },
      {
        path: '/worker/profile',
        name: 'Profile',
        description: 'Manage personal information',
      },
      {
        path: '/worker/applied-gigs',
        name: 'Applied Gigs',
        description: 'Track job applications',
      },
      {
        path: '/worker/machines',
        name: 'Machines',
        description: 'View and apply for machine access',
      },
    ],
  },
  {
    title: 'Startup Hub',
    description: 'Startup-specific features and tools',
    icon: 'bolt',
    routes: [
      {
        path: '/startup/dashboard',
        name: 'Dashboard',
        description: 'Startup overview and stats',
      },
      {
        path: '/startup/profile',
        name: 'Profile',
        description: 'Manage company information',
      },
      {
        path: '/startup/create-gig',
        name: 'Create Gig',
        description: 'Post new job opportunities',
      },
      {
        path: '/startup/gigs',
        name: 'Your Gigs',
        description: 'Manage posted jobs',
      },
      {
        path: '/startup/machines',
        name: 'Machines',
        description: 'Browse and access equipment',
      },
    ],
  },
  {
    title: 'Manufacturer Center',
    description: 'Manufacturer-specific features and tools',
    icon: 'factory',
    routes: [
      {
        path: '/manufacturer/dashboard',
        name: 'Dashboard',
        description: 'Manufacturer overview and stats',
      },
      {
        path: '/manufacturer/profile',
        name: 'Profile',
        description: 'Manage company information',
      },
      {
        path: '/manufacturer/add-machine',
        name: 'Add Machine',
        description: 'List new equipment',
      },
      {
        path: '/manufacturer/machines',
        name: 'Your Machines',
        description: 'Manage listed equipment',
      },
    ],
  },
];

export function SiteMap() {
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
            Platform Overview
          </h2>
          <p className="text-industrial-gunmetal-600 max-w-2xl mx-auto">
            Explore all features and capabilities of the WorkLink platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routeSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            >
              <IndustrialCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <IndustrialIcon
                    icon={section.icon}
                    size="lg"
                    className="text-industrial-safety-600"
                  />
                  <div>
                    <h3 className="font-oswald font-bold text-xl text-industrial-gunmetal-800">
                      {section.title}
                    </h3>
                    <p className="text-sm text-industrial-gunmetal-600">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {section.routes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      className="block p-3 rounded-industrial border border-industrial-border hover:border-industrial-safety-300 hover:bg-industrial-safety-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-industrial-gunmetal-800 group-hover:text-industrial-safety-700">
                            {route.name}
                          </div>
                          <div className="text-sm text-industrial-gunmetal-600">
                            {route.description}
                          </div>
                        </div>
                        <IndustrialIcon
                          icon="circuit"
                          size="sm"
                          className="text-industrial-gunmetal-400 group-hover:text-industrial-safety-600 transition-colors"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </IndustrialCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-industrial-gunmetal-600 mb-6">
            Ready to start your industrial journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-industrial-safety-300 hover:bg-industrial-safety-400 text-industrial-gunmetal-800 font-bold px-8 py-3 rounded-industrial transition-colors">
                Get Started
              </button>
            </Link>
            <Link href="/signin">
              <button className="border-2 border-industrial-gunmetal-300 hover:bg-industrial-gunmetal-100 text-industrial-gunmetal-800 font-bold px-8 py-3 rounded-industrial transition-colors">
                Sign In
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
