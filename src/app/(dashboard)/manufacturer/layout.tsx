'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export default function ManufacturerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout userType="manufacturer">{children}</DashboardLayout>;
}
