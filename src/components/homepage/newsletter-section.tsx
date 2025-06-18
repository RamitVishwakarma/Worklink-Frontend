'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterSection() {
  return (
    <section className="relative z-10 -mb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-industrial-navy-800 rounded-xl p-8 relative shadow-xl">
          <div className="absolute top-0 left-0 w-full h-2 bg-industrial-safety-300 rounded-t-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-oswald text-2xl font-bold mb-2 text-white">
                Stay Connected
              </h3>
              <p className="text-industrial-navy-100 mb-2">
                Get updates on new opportunities and platform features.
              </p>
            </div>
            <div>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-industrial-safety-300"
                />
                <Button className="bg-industrial-safety-300 hover:bg-industrial-safety-400 text-industrial-gunmetal-800 font-medium whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
