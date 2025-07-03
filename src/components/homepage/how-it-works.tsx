'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const steps = [
  {
    number: '01',
    title: 'Join Your Industrial Community',
    description:
      'Register as a worker, startup, or manufacturer. Complete your profile with skills, equipment, or project needs.',
    image:
      'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=600',
    actionText: 'Sign Up Now',
    actionLink: '/signup',
  },
  {
    number: '02',
    title: 'Discover Opportunities',
    description:
      'Workers find gigs, startups locate idle machines, manufacturers list equipment. Smart matching connects the right parties.',
    image:
      'https://images.pexels.com/photos/3912992/pexels-photo-3912992.jpeg?auto=compress&cs=tinysrgb&w=600',
    actionText: 'Browse Marketplace',
    actionLink: '/gigs',
  },
  {
    number: '03',
    title: 'Collaborate & Earn',
    description:
      'Execute projects with rented equipment and skilled workers. Build lasting partnerships in the industrial ecosystem.',
    image:
      'https://images.pexels.com/photos/3855962/pexels-photo-3855962.jpeg?auto=compress&cs=tinysrgb&w=600',
    actionText: 'Start Earning',
    actionLink: '/machines',
  },
];

export function HowItWorks() {
  return (
    <section
      className="py-20 bg-industrial-navy-800 relative overflow-hidden"
      id="how-it-works"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="industrial-section-heading text-white mb-4">
            How WorkLink Transforms Industry
          </h2>
          <p className="industrial-body-text text-industrial-navy-100 max-w-3xl mx-auto">
            From idle machinery to skilled workforce connections, we're
            revolutionizing how the industrial ecosystem collaborates and
            thrives together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-industrial-navy-800/50 backdrop-blur-sm border border-industrial-navy-600 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-industrial-navy-500/10 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-navy-800 to-transparent"></div>
                </div>

                <div className="p-6 relative">
                  {/* Step number - blueprint style */}
                  <div className="absolute -top-12 right-6 w-24 h-24 bg-industrial-safety-300 flex items-center justify-center rounded-full text-industrial-gunmetal-800 font-industrial-display text-3xl font-black border-4 border-white/10">
                    {step.number}
                  </div>

                  <h3 className="industrial-card-title text-white mb-3 mt-4">
                    {step.title}
                  </h3>
                  <p className="industrial-body-text text-industrial-navy-100 mb-4">
                    {step.description}
                  </p>

                  <Link href={step.actionLink}>
                    <Button
                      variant="outline"
                      className="w-full border-industrial-safety-300 text-industrial-safety-800 font-industrial-heading font-semibold tracking-wide hover:bg-industrial-safety-300 hover:text-industrial-gunmetal-800 transition-colors"
                    >
                      {step.actionText}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-2 bg-industrial-safety-300 z-0"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
