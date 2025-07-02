'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export default function StartupDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout userType="startup">{children}</DashboardLayout>;
}
