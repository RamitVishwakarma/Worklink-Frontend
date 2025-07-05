'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuIcon, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { NotificationBell } from '@/components/ui/notifications';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.userType) {
      case 'worker':
        return '/worker/dashboard';
      case 'startup':
        return '/startup/dashboard';
      case 'manufacturer':
        return '/manufacturer/dashboard';
      default:
        return '/';
    }
  };

  const getProfileLink = () => {
    if (!user) return '/';
    switch (user.userType) {
      case 'worker':
        return '/worker/profile';
      case 'startup':
        return '/startup/profile';
      case 'manufacturer':
        return '/manufacturer/profile';
      default:
        return '/';
    }
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    const name = user.name || user.email || 'User';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-industrial-gunmetal-800/95 shadow-md py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="WorkLink Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span
            className={`industrial-section-heading text-2xl tracking-wider ${
              isScrolled ? 'text-white' : 'text-industrial-gunmetal-400'
            }`}
          >
            WorkLink
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
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

          {!isAuthenticated ? (
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
          ) : (
            <Link
              href={getDashboardLink()}
              className={`font-medium transition-colors hover:text-industrial-safety-300 ${
                isScrolled ? 'text-gray-200' : 'text-industrial-gunmetal-400'
              }`}
            >
              Dashboard
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <NotificationBell
                iconClassName={`transition-colors ${
                  isScrolled
                    ? 'text-gray-200 hover:text-industrial-safety-300'
                    : 'text-industrial-gunmetal-400 hover:text-industrial-safety-300'
                }`}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full hover:bg-industrial-muted/10"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-industrial-navy-600 text-white font-medium text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white border-gray-200 shadow-lg"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal text-gray-900">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-gray-600">
                        {user?.email}
                      </p>
                      <p className="text-xs leading-none text-blue-600 capitalize">
                        {user?.userType}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem asChild>
                    <Link
                      href={getProfileLink()}
                      className="flex items-center text-gray-900 hover:bg-gray-50"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={getDashboardLink()}
                      className="flex items-center text-gray-900 hover:bg-gray-50"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
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
                  variant="industrial-accent"
                  size="sm"
                  className="font-semibold hover:shadow-md transition-all duration-200"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
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
          <div className="mx-auto px-4 py-4">
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

              {isAuthenticated ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    className="text-gray-200 py-2 hover:text-industrial-safety-300 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={getProfileLink()}
                    className="text-gray-200 py-2 hover:text-industrial-safety-300 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 py-2 hover:text-red-300 font-medium text-left"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <div className="text-gray-200 py-2 font-medium">
                    Dashboards:
                  </div>
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
                    <Button
                      variant="industrial-accent"
                      className="font-semibold w-full hover:shadow-md transition-all duration-200"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
