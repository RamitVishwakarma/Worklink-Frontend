'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IndustrialIcon } from './industrial-icon';

interface NavigationItem {
  href: string;
  label: string;
  icon:
    | 'gear'
    | 'factory'
    | 'wrench'
    | 'cog'
    | 'hammer'
    | 'hardhat'
    | 'bolt'
    | 'circuit';
  description?: string;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
}

export function Navigation({ items, className }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('space-y-2', className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-industrial transition-all duration-200',
            'hover:bg-industrial-gunmetal-100 hover:shadow-industrial',
            pathname === item.href
              ? 'bg-industrial-safety-100 text-industrial-gunmetal-800 border-l-4 border-industrial-safety-400'
              : 'text-industrial-gunmetal-600 hover:text-industrial-gunmetal-800'
          )}
        >
          <IndustrialIcon
            icon={item.icon}
            size="sm"
            className={cn(
              'transition-colors',
              pathname === item.href
                ? 'text-industrial-safety-600'
                : 'text-industrial-gunmetal-400'
            )}
          />
          <div className="flex-1">
            <div className="font-medium">{item.label}</div>
            {item.description && (
              <div className="text-sm text-industrial-gunmetal-500">
                {item.description}
              </div>
            )}
          </div>
        </Link>
      ))}
    </nav>
  );
}

// Quick access navigation for main sections
export function QuickNavigation() {
  const quickNavItems: NavigationItem[] = [
    {
      href: '/gigs',
      label: 'Browse Gigs',
      icon: 'hammer',
      description: 'Find work opportunities',
    },
    {
      href: '/machines',
      label: 'View Machines',
      icon: 'gear',
      description: 'Access industrial equipment',
    },
    {
      href: '/worker/dashboard',
      label: 'Worker Portal',
      icon: 'hardhat',
      description: 'Manage your work profile',
    },
    {
      href: '/startup/dashboard',
      label: 'Startup Hub',
      icon: 'bolt',
      description: 'Post jobs and requirements',
    },
    {
      href: '/manufacturer/dashboard',
      label: 'Manufacturer Center',
      icon: 'factory',
      description: 'Manage machines and applications',
    },
  ];
  return (
    <div className="bg-white rounded-industrial border border-industrial-border p-6 shadow-industrial">
      <h3 className="industrial-card-title text-industrial-gunmetal-800 mb-4">
        Quick Access
      </h3>
      <Navigation items={quickNavItems} />
    </div>
  );
}

// Breadcrumb navigation
interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-industrial-gunmetal-400">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-industrial-navy-600 hover:text-industrial-navy-800 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-industrial-gunmetal-600 font-medium">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
