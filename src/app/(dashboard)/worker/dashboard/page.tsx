'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  IndustrialCard,
  IndustrialCardContent,
  IndustrialCardDescription,
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
import {
  IndustrialHeading,
  IndustrialText,
} from '@/components/ui/industrial-typography';
import {
  ResponsiveGrid,
  ResponsiveStack,
} from '@/components/ui/industrial-responsive';
import { AccessibleStatus } from '@/components/ui/industrial-accessibility';
import { useAuthStore } from '@/lib/store/authStore';
import { useToast } from '@/hooks/use-toast';
import {
  getAllGigs,
  getAppliedGigsForWorker,
  getWorkerProfile,
} from '@/lib/api';
import { Gig, GigApplication, WorkerProfile } from '@/lib/types';
import {
  Briefcase,
  MapPin,
  Calendar,
  User,
  Settings,
  Eye,
  Building,
  Wrench,
  HardHat,
  Factory,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import withAuth from '@/components/auth/withAuth';
import { UserType } from '@/lib/types';
import Link from 'next/link';

function WorkerDashboardPage() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();

  const [profile, setProfile] = useState<WorkerProfile | null>(null);
  const [recentGigs, setRecentGigs] = useState<Gig[]>([]);
  const [appliedGigs, setAppliedGigs] = useState<GigApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch profile, recent gigs, and applied gigs in parallel
      const [profileRes, gigsRes, appliedGigsRes] = await Promise.all([
        getWorkerProfile(user!.id),
        getAllGigs({ limit: 6 }),
        getAppliedGigsForWorker(user!.id),
      ]);

      setProfile(profileRes.data);
      setRecentGigs(gigsRes.data);
      setAppliedGigs(appliedGigsRes.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (loading) {
    return (
      <IndustrialLayout>
        <IndustrialContainer>
          <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-64 bg-industrial-muted" />
              <Skeleton className="h-4 w-96 bg-industrial-muted" />
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <IndustrialCard key={i}>
                  <IndustrialCardContent className="p-6">
                    <Skeleton className="h-4 w-16 mb-2 bg-industrial-muted" />
                    <Skeleton className="h-8 w-12 bg-industrial-muted" />
                  </IndustrialCardContent>
                </IndustrialCard>
              ))}
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IndustrialCard>
                <IndustrialCardHeader>
                  <Skeleton className="h-6 w-32 bg-industrial-muted" />
                </IndustrialCardHeader>
                <IndustrialCardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton
                      key={i}
                      className="h-16 w-full bg-industrial-muted"
                    />
                  ))}
                </IndustrialCardContent>
              </IndustrialCard>
              <IndustrialCard>
                <IndustrialCardHeader>
                  <Skeleton className="h-6 w-32 bg-industrial-muted" />
                </IndustrialCardHeader>
                <IndustrialCardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton
                      key={i}
                      className="h-16 w-full bg-industrial-muted"
                    />
                  ))}
                </IndustrialCardContent>
              </IndustrialCard>
            </div>
          </div>
        </IndustrialContainer>
      </IndustrialLayout>
    );
  }

  const stats = [
    {
      title: 'Applied Gigs',
      value: appliedGigs.length,
      icon: Briefcase,
      color: 'text-industrial-accent',
    },
    {
      title: 'Pending',
      value: appliedGigs.filter((app) => app.status === 'pending').length,
      icon: Clock,
      color: 'text-industrial-secondary',
    },
    {
      title: 'Approved',
      value: appliedGigs.filter((app) => app.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-green-400',
    },
    {
      title: 'Available Gigs',
      value: recentGigs.length,
      icon: Factory,
      color: 'text-industrial-primary',
    },
  ];

  return (
    <IndustrialLayout>
      <IndustrialContainer>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Header */}
          <IndustrialHeader className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3">
                <IndustrialIcon
                  icon="hardhat"
                  size="lg"
                  className="text-industrial-accent"
                />
                <h1 className="text-3xl font-bold text-industrial-foreground">
                  Welcome back, {profile?.name || user?.email}!
                </h1>
              </div>
              <p className="text-industrial-muted-foreground">
                Manage your applications, explore opportunities, and track your
                progress in the industrial workforce.
              </p>
            </motion.div>
            <Button
              variant="industrial-outline"
              size="sm"
              onClick={fetchDashboardData}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </IndustrialHeader>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.title} variants={cardVariants}>
                  <IndustrialCard className="hover:shadow-lg transition-all duration-300 hover:shadow-industrial-accent/20">
                    <IndustrialCardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-industrial-muted-foreground">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-industrial-foreground">
                            {stat.value}
                          </p>
                        </div>
                        <IndustrialIcon
                          icon="wrench"
                          size="md"
                          className={stat.color}
                        />
                      </div>
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Available Gigs */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <IndustrialCard className="h-fit">
                <IndustrialCardHeader className="flex flex-row items-center justify-between">
                  <IndustrialCardTitle className="flex items-center gap-2">
                    <IndustrialIcon icon="wrench" size="sm" />
                    Recent Available Gigs
                  </IndustrialCardTitle>
                  <Button
                    variant="industrial-outline"
                    size="sm"
                    onClick={() => router.push('/gigs')}
                  >
                    View All
                  </Button>
                </IndustrialCardHeader>
                <IndustrialCardContent className="space-y-4">
                  {recentGigs.length === 0 ? (
                    <div className="text-center py-8">
                      <IndustrialIcon
                        icon="factory"
                        size="xl"
                        className="mx-auto mb-4 text-industrial-muted-foreground"
                      />
                      <p className="text-industrial-muted-foreground">
                        No gigs available at the moment.
                      </p>
                    </div>
                  ) : (
                    recentGigs.slice(0, 3).map((gig, index) => (
                      <motion.div
                        key={gig._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="border border-industrial-border rounded-lg p-4 hover:bg-industrial-muted/30 transition-colors group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-industrial-foreground line-clamp-1 group-hover:text-industrial-accent transition-colors">
                            {gig.title}
                          </h3>
                          <Badge variant="industrial-secondary">
                            {gig.jobType}
                          </Badge>
                        </div>
                        <p className="text-sm text-industrial-muted-foreground mb-3 line-clamp-2">
                          {gig.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-industrial-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {gig.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {gig.company}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </IndustrialCardContent>
              </IndustrialCard>
            </motion.div>

            {/* Applied Gigs */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <IndustrialCard className="h-fit">
                <IndustrialCardHeader className="flex flex-row items-center justify-between">
                  <IndustrialCardTitle className="flex items-center gap-2">
                    <IndustrialIcon icon="hardhat" size="sm" />
                    Your Applications
                  </IndustrialCardTitle>
                  <Button
                    variant="industrial-outline"
                    size="sm"
                    onClick={() => router.push('/worker/applied-gigs')}
                  >
                    View All
                  </Button>
                </IndustrialCardHeader>
                <IndustrialCardContent className="space-y-4">
                  {appliedGigs.length === 0 ? (
                    <div className="text-center py-8">
                      <IndustrialIcon
                        icon="hardhat"
                        size="xl"
                        className="mx-auto mb-4 text-industrial-muted-foreground"
                      />
                      <p className="text-industrial-muted-foreground">
                        You haven't applied to any gigs yet.
                      </p>
                    </div>
                  ) : (
                    appliedGigs.slice(0, 3).map((application, index) => (
                      <motion.div
                        key={application._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="border border-industrial-border rounded-lg p-4 hover:bg-industrial-muted/30 transition-colors group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-industrial-foreground line-clamp-1 group-hover:text-industrial-accent transition-colors">
                            {application.gig?.title || 'Gig Details'}
                          </h3>
                          <Badge
                            variant={
                              application.status === 'approved'
                                ? 'industrial-accent'
                                : application.status === 'rejected'
                                  ? 'destructive'
                                  : 'industrial-secondary'
                            }
                          >
                            {application.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-industrial-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Applied{' '}
                            {new Date(
                              application.appliedAt
                            ).toLocaleDateString()}
                          </div>
                          {application.gig && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {application.gig.location}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </IndustrialCardContent>
              </IndustrialCard>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <IndustrialCard>
              <IndustrialCardHeader>
                <IndustrialCardTitle className="flex items-center gap-2">
                  <IndustrialIcon icon="gear" size="sm" />
                  Quick Actions
                </IndustrialCardTitle>
              </IndustrialCardHeader>
              <IndustrialCardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="industrial-outline"
                    className="h-24 flex-col gap-2 hover:bg-industrial-muted/50 transition-colors"
                    onClick={() => router.push('/gigs')}
                  >
                    <IndustrialIcon icon="wrench" size="md" />
                    Browse Gigs
                  </Button>
                  <Button
                    variant="industrial-outline"
                    className="h-24 flex-col gap-2 hover:bg-industrial-muted/50 transition-colors"
                    onClick={() => router.push('/worker/machines')}
                  >
                    <IndustrialIcon icon="factory" size="md" />
                    View Machines
                  </Button>
                  <Button
                    variant="industrial-outline"
                    className="h-24 flex-col gap-2 hover:bg-industrial-muted/50 transition-colors"
                    onClick={() => router.push('/worker/profile')}
                  >
                    <IndustrialIcon icon="hardhat" size="md" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="industrial-outline"
                    className="h-24 flex-col gap-2 hover:bg-industrial-muted/50 transition-colors"
                    onClick={() => router.push('/worker/applied-gigs')}
                  >
                    <IndustrialIcon icon="gear" size="md" />
                    My Applications
                  </Button>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>
        </motion.div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
}

// Protect the component, allowing only WORKER user types
export default withAuth(WorkerDashboardPage, {
  allowedUserTypes: [UserType.WORKER],
});
