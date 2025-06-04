'use client';

import * as React from 'react';
import Link from 'next/link';
import { MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-industrial-gunmetal-800/95 shadow-md py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-industrial-safety-300 rounded-md -rotate-45"></div>
            <div className="absolute inset-[2px] bg-industrial-gunmetal-800 rounded-md -rotate-45 flex items-center justify-center">
              <span className="text-industrial-safety-300 font-oswald text-sm font-bold tracking-wider -not-rotate-45">
                WL
              </span>
            </div>
          </div>
          <span
            className={`font-oswald font-bold text-2xl tracking-wider ${
              isScrolled ? 'text-white' : 'text-industrial-gunmetal-400'
            }`}
          >
            WorkLink
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/gigs"
            className={`font-medium transition-colors hover:text-industrial-safety-300 ${
              isScrolled ? 'text-gray-200' : 'text-industrial-gunmetal-400'
            }`}
          >
            Browse Gigs
          </Link>
          <Link
            href="/machines"
            className={`font-medium transition-colors hover:text-industrial-safety-300 ${
              isScrolled ? 'text-gray-200' : 'text-industrial-gunmetal-400'
            }`}
          >
            View Machines
          </Link>
          <div className="relative group">
            <button
              className={`font-medium transition-colors hover:text-industrial-safety-300 ${
                isScrolled ? 'text-gray-200' : 'text-industrial-gunmetal-400'
              }`}
            >
              Dashboards
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <Link
                  href="/worker/dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-industrial-safety-100 hover:text-industrial-gunmetal-800"
                >
                  Worker Dashboard
                </Link>
                <Link
                  href="/startup/dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-industrial-safety-100 hover:text-industrial-gunmetal-800"
                >
                  Startup Dashboard
                </Link>
                <Link
                  href="/manufacturer/dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-industrial-safety-100 hover:text-industrial-gunmetal-800"
                >
                  Manufacturer Dashboard
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/signin"
            className={`font-medium transition-colors hover:text-industrial-safety-300 ${
              isScrolled ? 'text-gray-200' : 'text-industrial-gunmetal-400'
            }`}
          >
            Sign In
          </Link>
          <Link href="/signup">
            <Button
              variant="default"
              className="bg-industrial-safety-300 hover:bg-industrial-safety-400 text-industrial-gunmetal-800 font-medium"
            >
              Sign Up
            </Button>
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden ${isScrolled ? 'text-white' : 'text-industrial-gunmetal-800'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-industrial-gunmetal-800/95 border-t border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/gigs"
                className="text-gray-200 py-2 hover:text-industrial-safety-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Gigs
              </Link>
              <Link
                href="/machines"
                className="text-gray-200 py-2 hover:text-industrial-safety-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                View Machines
              </Link>
              <div className="text-gray-200 py-2 font-medium">Dashboards:</div>
              <Link
                href="/worker/dashboard"
                className="text-gray-300 py-1 pl-4 hover:text-industrial-safety-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Worker Dashboard
              </Link>
              <Link
                href="/startup/dashboard"
                className="text-gray-300 py-1 pl-4 hover:text-industrial-safety-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Startup Dashboard
              </Link>
              <Link
                href="/manufacturer/dashboard"
                className="text-gray-300 py-1 pl-4 hover:text-industrial-safety-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Manufacturer Dashboard
              </Link>
              <Link
                href="/signin"
                className="text-gray-200 py-2 hover:text-industrial-safety-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-industrial-safety-300 hover:bg-industrial-safety-400 text-industrial-gunmetal-800 font-medium w-full">
                  Sign Up
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
