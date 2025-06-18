'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export function Footer() {
  return (
    <footer
      className="bg-industrial-gunmetal-800 text-white pt-16 pb-8"
      id="contact"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-industrial-safety-300 rounded-md -rotate-45"></div>
                <div className="absolute inset-[2px] bg-industrial-gunmetal-800 rounded-md -rotate-45 flex items-center justify-center">
                  <span className="text-industrial-safety-300 font-oswald text-base font-bold tracking-wider -not-rotate-45">
                    WL
                  </span>
                </div>
              </div>
              <span className="font-oswald font-bold text-2xl tracking-wider text-white">
                WorkLink
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              The first digital marketplace connecting skilled labor with
              industrial opportunities and machine sharing.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-industrial-safety-300 hover:text-industrial-gunmetal-800 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-oswald text-lg font-bold mb-6 border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                'Find Work',
                'Post Requirements',
                'Browse Machines',
                'List Equipment',
                'How It Works',
                'Pricing',
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-industrial-safety-300 transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-oswald text-lg font-bold mb-6 border-b border-gray-700 pb-2">
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                'Help Center',
                'Safety Guidelines',
                'Certification Process',
                'Equipment Standards',
                'Success Stories',
                'Blog',
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-industrial-safety-300 transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-oswald text-lg font-bold mb-6 border-b border-gray-700 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-industrial-safety-300 mr-3 mt-1" />
                <span className="text-gray-400">
                  123 Industrial Way, <br />
                  Manufacturing District, <br />
                  Delhi 110001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-industrial-safety-300 mr-3" />
                <span className="text-gray-400">+91 93057-86097</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-industrial-safety-300 mr-3" />
                <a
                  href="mailto:vishwakarmaramit@gmail.com"
                  className="text-gray-400 hover:text-industrial-safety-300 transition-colors duration-300 break-all"
                >
                  vishwakarmaramit@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            © 2025 IndustrialConnect. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center">
            <Link
              href="#"
              className="text-gray-500 hover:text-industrial-safety-300 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-industrial-safety-300 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-industrial-safety-300 transition-colors duration-300"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
