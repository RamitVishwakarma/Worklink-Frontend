'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  IndustrialCard,
  IndustrialCardContent,
  IndustrialCardHeader,
  IndustrialCardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  IndustrialLayout,
  IndustrialContainer,
  IndustrialHeader,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { useAuthStore } from '@/lib/store/authStore';
import { useToast } from '@/hooks/use-toast';
import withAuth from '@/components/auth/withAuth';
import { UserType, Machine, MachineApplication } from '@/lib/types';
import api from '@/lib/api';
import {
  Settings,
  Plus,
  Factory,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Eye,
  Edit,
  Cog,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';

function ManufacturerDashboardPage() {
  const { user } = useAuthStore();
  const { toast } = useToast();

  const [machines, setMachines] = useState<Machine[]>([]);
  const [applications, setApplications] = useState<MachineApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMachines: 0,
    activeMachines: 0,
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
  });

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [machinesResponse, applicationsResponse] = await Promise.all([
        api.get('/manufacturer/machines'),
        api.get('/manufacturer/machine-applications'),
      ]);

      const machinesData = machinesResponse.data;
      const applicationsData = applicationsResponse.data;

      setMachines(machinesData);
      setApplications(applicationsData);

      // Calculate stats
      const totalMachines = machinesData.length;
      const activeMachines = machinesData.filter(
        (m: Machine) => m.isAvailable
      ).length;
      const totalApplications = applicationsData.length;
      const pendingApplications = applicationsData.filter(
        (app: MachineApplication) => app.status === 'pending'
      ).length;
      const approvedApplications = applicationsData.filter(
        (app: MachineApplication) => app.status === 'approved'
      ).length;
      const rejectedApplications = applicationsData.filter(
        (app: MachineApplication) => app.status === 'rejected'
      ).length;

      setStats({
        totalMachines,
        activeMachines,
        totalApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <IndustrialLayout>
      <IndustrialContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex justify-between items-center"
          >
            <div>
              <IndustrialHeader level={1} className="flex items-center gap-3">
                <IndustrialIcon
                  icon="factory"
                  size="lg"
                  className="text-industrial-accent"
                />
                Manufacturer Dashboard
              </IndustrialHeader>
              <p className="text-industrial-secondary mt-2">
                Welcome back, {user?.companyName || 'Manufacturer'}! Manage your
                machines and applications.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/manufacturer/profile">
                <Button variant="industrial-secondary" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link href="/manufacturer/add-machine">
                <Button variant="industrial-primary" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Machine
                </Button>
              </Link>
            </div>
          </motion.div>
          {/* Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <IndustrialCard key={i}>
                  <IndustrialCardContent className="p-6">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </IndustrialCardContent>
                </IndustrialCard>
              ))
            ) : (
              <>
                <IndustrialCard
                  variant="industrial"
                  className="hover:shadow-lg transition-shadow"
                >
                  <IndustrialCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-industrial-secondary">
                          Total Machines
                        </p>
                        <p className="text-3xl font-bold text-industrial-primary">
                          {stats.totalMachines}
                        </p>
                      </div>
                      <IndustrialIcon
                        icon="factory"
                        size="lg"
                        className="text-industrial-accent"
                      />
                    </div>
                    <p className="text-xs text-industrial-muted mt-2">
                      {stats.activeMachines} currently active
                    </p>
                  </IndustrialCardContent>
                </IndustrialCard>

                <IndustrialCard
                  variant="industrial"
                  className="hover:shadow-lg transition-shadow"
                >
                  <IndustrialCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-industrial-secondary">
                          Total Applications
                        </p>
                        <p className="text-3xl font-bold text-industrial-primary">
                          {stats.totalApplications}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-emerald-500" />
                    </div>
                    <p className="text-xs text-industrial-muted mt-2">
                      {stats.pendingApplications} pending review
                    </p>
                  </IndustrialCardContent>
                </IndustrialCard>

                <IndustrialCard
                  variant="industrial"
                  className="hover:shadow-lg transition-shadow"
                >
                  <IndustrialCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-industrial-secondary">
                          Approved Applications
                        </p>
                        <p className="text-3xl font-bold text-emerald-600">
                          {stats.approvedApplications}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-emerald-500" />
                    </div>
                    <p className="text-xs text-industrial-muted mt-2">
                      Successfully processed
                    </p>
                  </IndustrialCardContent>
                </IndustrialCard>

                <IndustrialCard
                  variant="industrial"
                  className="hover:shadow-lg transition-shadow"
                >
                  <IndustrialCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-industrial-secondary">
                          Pending Applications
                        </p>
                        <p className="text-3xl font-bold text-industrial-accent">
                          {stats.pendingApplications}
                        </p>
                      </div>
                      <Clock className="h-8 w-8 text-industrial-accent" />
                    </div>
                    <p className="text-xs text-industrial-muted mt-2">
                      Awaiting your review
                    </p>
                  </IndustrialCardContent>
                </IndustrialCard>

                <IndustrialCard
                  variant="industrial"
                  className="hover:shadow-lg transition-shadow"
                >
                  <IndustrialCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-industrial-secondary">
                          Active Machines
                        </p>
                        <p className="text-3xl font-bold text-blue-600">
                          {stats.activeMachines}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="text-xs text-industrial-muted mt-2">
                      Available for applications
                    </p>
                  </IndustrialCardContent>
                </IndustrialCard>

                <IndustrialCard
                  variant="industrial"
                  className="hover:shadow-lg transition-shadow"
                >
                  <IndustrialCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-industrial-secondary">
                          Rejected Applications
                        </p>
                        <p className="text-3xl font-bold text-red-600">
                          {stats.rejectedApplications}
                        </p>
                      </div>
                      <XCircle className="h-8 w-8 text-red-500" />
                    </div>
                    <p className="text-xs text-industrial-muted mt-2">
                      Declined requests
                    </p>
                  </IndustrialCardContent>
                </IndustrialCard>
              </>
            )}
          </motion.div>{' '}
          {/* Recent Machines */}
          <motion.div variants={itemVariants}>
            <IndustrialCard variant="industrial">
              <IndustrialCardHeader className="flex flex-row items-center justify-between">
                <IndustrialCardTitle className="text-lg font-semibold flex items-center gap-2">
                  <IndustrialIcon icon="gear" size="sm" />
                  Your Machines
                </IndustrialCardTitle>
                <Link href="/manufacturer/machines">
                  <Button variant="industrial-secondary" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </IndustrialCardHeader>
              <IndustrialCardContent>
                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-6 w-16" />
                      </div>
                    ))}
                  </div>
                ) : machines.length === 0 ? (
                  <div className="text-center py-8">
                    <IndustrialIcon
                      icon="factory"
                      size="xl"
                      className="text-industrial-muted mx-auto mb-4"
                    />
                    <p className="text-industrial-secondary mb-4">
                      No machines listed yet
                    </p>
                    <Link href="/manufacturer/add-machine">
                      <Button variant="industrial-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Machine
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {machines.slice(0, 5).map((machine) => (
                      <div
                        key={machine.id}
                        className="flex items-center justify-between p-4 border border-industrial-border rounded-lg hover:bg-industrial-primary/5 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-gradient-to-br from-industrial-accent to-industrial-accent/80 rounded-lg flex items-center justify-center">
                            <IndustrialIcon
                              icon="factory"
                              size="md"
                              className="text-industrial-gunmetal-900"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-industrial-primary">
                              {machine.name}
                            </h3>
                            <p className="text-sm text-industrial-secondary">
                              {machine.type} • {machine.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              machine.isAvailable
                                ? 'industrial-primary'
                                : 'industrial-secondary'
                            }
                          >
                            {machine.isAvailable ? 'Available' : 'Unavailable'}
                          </Badge>
                          <Link
                            href={`/manufacturer/machines/${machine.id}/edit`}
                          >
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>{' '}
          {/* Recent Applications */}
          <motion.div variants={itemVariants}>
            <IndustrialCard variant="industrial">
              <IndustrialCardHeader className="flex flex-row items-center justify-between">
                <IndustrialCardTitle className="text-lg font-semibold flex items-center gap-2">
                  <IndustrialIcon icon="hardhat" size="sm" />
                  Recent Applications
                </IndustrialCardTitle>
                <Link href="/manufacturer/applications">
                  <Button variant="industrial-secondary" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </IndustrialCardHeader>
              <IndustrialCardContent>
                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-6 w-16" />
                      </div>
                    ))}
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-industrial-muted mx-auto mb-4" />
                    <p className="text-industrial-secondary">
                      No applications received yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.slice(0, 5).map((application) => (
                      <div
                        key={application.id}
                        className="flex items-center justify-between p-4 border-2 border-industrial-gunmetal-300 rounded-lg hover:bg-metal-grid transition-colors shadow-industrial-sm hover:shadow-industrial-md hover:border-industrial-gunmetal-400"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-gradient-to-br from-industrial-navy-500 to-industrial-navy-600 rounded-lg flex items-center justify-center shadow-industrial-sm">
                            {application.applicantType === 'worker' ? (
                              <IndustrialIcon
                                icon="hardhat"
                                size="sm"
                                className="text-white"
                              />
                            ) : (
                              <IndustrialIcon
                                icon="cog"
                                size="sm"
                                className="text-white"
                              />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-industrial-gunmetal-800">
                              {application.applicantType === 'worker'
                                ? 'Worker'
                                : 'Startup'}{' '}
                              - {application.applicantId}
                            </h3>
                            <p className="text-sm text-industrial-secondary flex items-center gap-1">
                              <IndustrialIcon
                                icon="wrench"
                                size="sm"
                                className="text-industrial-secondary"
                              />
                              Applied for {application.machine?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              application.status === 'approved'
                                ? 'industrial-success'
                                : application.status === 'rejected'
                                  ? 'industrial-danger'
                                  : 'industrial-accent'
                            }
                            className="uppercase text-xs font-bold"
                          >
                            {application.status}
                          </Badge>
                          <span className="text-xs text-industrial-gunmetal-600 bg-industrial-gunmetal-100 px-2 py-1 rounded">
                            {new Date(
                              application.appliedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>
          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <IndustrialCard variant="industrial-accent">
              <IndustrialCardHeader className="flex flex-row items-center justify-between">
                <IndustrialCardTitle className="text-lg font-semibold flex items-center gap-2">
                  <IndustrialIcon icon="gear" size="sm" animated />
                  Quick Actions
                </IndustrialCardTitle>
              </IndustrialCardHeader>
              <IndustrialCardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/manufacturer/add-machine" className="block">
                    <Button
                      variant="industrial-outline"
                      className="w-full justify-start h-auto p-4 border-2 hover:bg-industrial-gunmetal-50"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gradient-to-br from-industrial-safety-300 to-industrial-safety-400 rounded-lg flex items-center justify-center mr-3 shadow-industrial-sm">
                          <Plus className="h-5 w-5 text-industrial-gunmetal-800" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-industrial-gunmetal-800">
                            Add New Machine
                          </div>
                          <div className="text-xs text-industrial-secondary">
                            List a new machine for applications
                          </div>
                        </div>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/manufacturer/machines" className="block">
                    <Button
                      variant="industrial-outline"
                      className="w-full justify-start h-auto p-4 border-2 hover:bg-industrial-gunmetal-50"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gradient-to-br from-industrial-navy-300 to-industrial-navy-400 rounded-lg flex items-center justify-center mr-3 shadow-industrial-sm">
                          <Factory className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-industrial-gunmetal-800">
                            Manage Machines
                          </div>
                          <div className="text-xs text-industrial-secondary">
                            View and edit your machines
                          </div>
                        </div>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/manufacturer/applications" className="block">
                    <Button
                      variant="industrial-outline"
                      className="w-full justify-start h-auto p-4 border-2 hover:bg-industrial-gunmetal-50"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gradient-to-br from-industrial-gunmetal-600 to-industrial-gunmetal-700 rounded-lg flex items-center justify-center mr-3 shadow-industrial-sm">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-industrial-gunmetal-800">
                            Review Applications
                          </div>
                          <div className="text-xs text-industrial-secondary">
                            Approve or reject requests
                          </div>
                        </div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>
        </motion.div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
}

export default withAuth(ManufacturerDashboardPage, {
  allowedUserTypes: [UserType.MANUFACTURER],
});
