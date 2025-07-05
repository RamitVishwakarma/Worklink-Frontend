'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/navigation';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardNavLinkProps {
  href: string;
  icon:
    | 'gear'
    | 'factory'
    | 'wrench'
    | 'cog'
    | 'hammer'
    | 'hardhat'
    | 'bolt'
    | 'circuit';
  label: string;
  active: boolean;
}

const DashboardNavLink = ({
  href,
  icon,
  label,
  active,
}: DashboardNavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
        active
          ? 'bg-industrial-safety-100 text-industrial-safety-900 border-l-4 border-industrial-safety-400'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      )}
    >
      <IndustrialIcon
        icon={icon}
        size="sm"
        className={active ? 'text-industrial-safety-600' : 'text-gray-400'}
      />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'worker' | 'startup' | 'manufacturer';
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname();

  // Define breadcrumb items based on current path
  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split('/').filter(Boolean);

    const items = [
      { href: '/', label: 'Home' },
      { href: `/${userType}/dashboard`, label: capitalize(userType) },
    ];
    if (pathSegments.length > 2) {
      // Add additional breadcrumb segments for deeper paths
      const lastSegment = pathSegments[pathSegments.length - 1];
      const path = `/${pathSegments.join('/')}`;
      items.push({ href: path, label: formatPathname(lastSegment) });
    }

    return items;
  };

  // Format pathname for display in breadcrumbs
  const formatPathname = (path: string) => {
    // Convert kebab-case to Title Case
    return path
      .split('-')
      .map((word) => capitalize(word))
      .join(' ');
  };

  // Capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Navigation links based on user type
  const getNavLinks = () => {
    const baseLinks = [
      {
        href: `/${userType}/dashboard`,
        icon: 'gear' as const,
        label: 'Dashboard',
      },
      {
        href: `/${userType}/profile`,
        icon: 'hardhat' as const,
        label: 'Profile',
      },
    ];

    const userSpecificLinks = {
      worker: [
        {
          href: '/worker/applied-gigs',
          icon: 'bolt' as const,
          label: 'Applied Gigs',
        },
        {
          href: '/worker/machines',
          icon: 'factory' as const,
          label: 'Machines',
        },
      ],
      startup: [
        {
          href: '/startup/create-gig',
          icon: 'bolt' as const,
          label: 'Create Gig',
        },
        { href: '/startup/gigs', icon: 'wrench' as const, label: 'Your Gigs' },
        {
          href: '/startup/machines',
          icon: 'factory' as const,
          label: 'Machines',
        },
      ],
      manufacturer: [
        {
          href: '/manufacturer/add-machine',
          icon: 'cog' as const,
          label: 'Add Machine',
        },
        {
          href: '/manufacturer/machines',
          icon: 'factory' as const,
          label: 'Your Machines',
        },
      ],
    };

    return [...baseLinks, ...userSpecificLinks[userType]];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm py-5 h-[80px]">
        {/* <div className="container mx-auto px-4">
          <Breadcrumb items={getBreadcrumbItems()} className="text-sm" />
        </div> */}
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 shadow-sm hidden lg:block">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-oswald font-bold text-xl text-gray-800">
              {capitalize(userType)} Portal
            </h2>
            <p className="text-sm text-gray-600">Manage your industrial work</p>
          </div>

          <nav className="p-4 space-y-2">
            {getNavLinks().map((link) => (
              <DashboardNavLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                label={link.label}
                active={pathname === link.href}
              />
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
              >
                <IndustrialIcon
                  icon="gear"
                  size="sm"
                  className="text-gray-400"
                />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/signin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
              >
                {/* Using imported Lucide icon for logout */}
                <LogOut className="size-4" />
                <span className="font-medium">Sign Out</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile navigation */}
        <div className="lg:hidden w-full bg-white p-4 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-oswald font-bold text-xl text-gray-800">
              {capitalize(userType)} Portal
            </h2>

            <details className="dropdown dropdown-end relative">
              <summary className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-200 border border-gray-200">
                <IndustrialIcon
                  icon="gear"
                  size="sm"
                  className="text-gray-700"
                />
              </summary>
              <div className="dropdown-menu absolute right-0 mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                <nav className="p-2 space-y-1">
                  {getNavLinks().map((link) => (
                    <DashboardNavLink
                      key={link.href}
                      href={link.href}
                      icon={link.icon}
                      label={link.label}
                      active={pathname === link.href}
                    />
                  ))}

                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                    >
                      <IndustrialIcon
                        icon="gear"
                        size="sm"
                        className="text-gray-400"
                      />
                      <span className="font-medium">Home</span>
                    </Link>
                    <Link
                      href="/signin"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Sign Out</span>
                    </Link>
                  </div>
                </nav>
              </div>
            </details>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 bg-white rounded-md shadow-sm m-4">
          {children}
        </div>
      </div>
    </div>
  );
}
