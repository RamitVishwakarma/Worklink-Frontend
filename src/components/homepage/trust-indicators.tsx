'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Award,
  ShieldCheck,
  Users,
  Clock,
  BarChart2,
} from 'lucide-react';

const stats = [
  {
    value: '15,000+',
    label: 'Blue-Collar Workers',
    icon: Users,
    color: 'bg-industrial-navy-100 text-industrial-navy-600',
  },
  {
    value: '5,500+',
    label: 'Idle Machines Available',
    icon: BarChart2,
    color: 'bg-industrial-safety-100 text-industrial-safety-600',
  },
  {
    value: '850+',
    label: 'Active Gigs Posted',
    icon: CheckCircle2,
    color: 'bg-industrial-gunmetal-100 text-industrial-gunmetal-600',
  },
  {
    value: '2.5 hrs',
    label: 'Avg. Match Time',
    icon: Clock,
    color: 'bg-industrial-safety-200 text-industrial-safety-700',
  },
];

const certifications = [
  'ISO 9001',
  'OSHA Compliant',
  'CE Certification',
  'UL Listed',
];

export function TrustIndicators() {
  return (
    <section className="py-20 bg-white" id="trust">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-oswald font-bold text-3xl md:text-4xl text-industrial-gunmetal-800 mb-4">
            Bridging the Industrial Gap
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Connecting skilled blue-collar workers with startups and unlocking
            idle manufacturing capacity. WorkLink transforms downtime into
            opportunity for everyone in the industrial ecosystem.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-oswald font-bold text-3xl text-industrial-gunmetal-800">
                  {stat.value}
                </div>
                <div className="text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 rounded-xl p-8 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <ShieldCheck className="w-6 h-6 text-industrial-safety-300 mr-2" />
                <h3 className="font-oswald font-bold text-xl text-industrial-gunmetal-800">
                  Industrial Safety First
                </h3>
              </div>
              <p className="text-gray-600 max-w-md">
                Every worker, startup, and manufacturer on our platform meets
                rigorous safety and quality standards to ensure reliable
                industrial partnerships.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
                >
                  <Award className="w-5 h-5 text-industrial-gunmetal-800 mr-2" />
                  <span className="font-medium text-sm text-industrial-gunmetal-800">
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
