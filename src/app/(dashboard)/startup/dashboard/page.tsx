'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  IndustrialCard,
  IndustrialCardContent,
  IndustrialCardDescription,
  IndustrialCardHeader,
  IndustrialCardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  IndustrialLayout,
  IndustrialContainer,
  IndustrialHeader,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/lib/store/authStore';
import api from '@/lib/api';
import withAuth from '@/components/auth/withAuth';
import { UserType, Gig, GigApplication } from '@/lib/types';
import {
  Briefcase,
  Users,
  Eye,
  Plus,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Factory,
  Cog,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function StartupDashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    gigs: [] as Gig[],
    applications: [] as GigApplication[],
    stats: {
      totalGigs: 0,
      activeGigs: 0,
      totalApplications: 0,
      pendingApplications: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuthStore();
  const router = useRouter();

  const fetchDashboardData = async () => {
    try {
      const [gigsResponse, applicationsResponse] = await Promise.all([
        api.get('/gigs/my-gigs'),
        api.get('/applications/received'),
      ]);

      const gigs = gigsResponse.data;
      const applications = applicationsResponse.data;

      setDashboardData({
        gigs,
        applications,
        stats: {
          totalGigs: gigs.length,
          activeGigs: gigs.filter((gig: Gig) => gig.isActive).length,
          totalApplications: applications.length,
          pendingApplications: applications.filter(
            (app: GigApplication) => app.status.toLowerCase() === 'pending'
          ).length,
        },
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <IndustrialLayout>
        <IndustrialContainer>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-8 w-64 mb-2 bg-industrial-muted" />
                <Skeleton className="h-4 w-96 bg-industrial-muted" />
              </div>
              <Skeleton className="h-10 w-32 bg-industrial-muted" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <IndustrialCard key={i}>
                  <IndustrialCardContent className="p-6">
                    <Skeleton className="h-12 w-12 mb-4 bg-industrial-muted" />
                    <Skeleton className="h-4 w-24 mb-2 bg-industrial-muted" />
                    <Skeleton className="h-8 w-16 bg-industrial-muted" />
                  </IndustrialCardContent>
                </IndustrialCard>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IndustrialCard>
                <IndustrialCardHeader>
                  <Skeleton className="h-6 w-32 bg-industrial-muted" />
                </IndustrialCardHeader>
                <IndustrialCardContent className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-48 bg-industrial-muted" />
                      <Skeleton className="h-4 w-32 bg-industrial-muted" />
                    </div>
                  ))}
                </IndustrialCardContent>
              </IndustrialCard>
              <IndustrialCard>
                <IndustrialCardHeader>
                  <Skeleton className="h-6 w-40 bg-industrial-muted" />
                </IndustrialCardHeader>
                <IndustrialCardContent className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-48 bg-industrial-muted" />
                      <Skeleton className="h-4 w-32 bg-industrial-muted" />
                    </div>
                  ))}
                </IndustrialCardContent>
              </IndustrialCard>
            </div>
          </div>
        </IndustrialContainer>
      </IndustrialLayout>
    );
  }

  const recentApplications = dashboardData.applications.slice(0, 5);
  const recentGigs = dashboardData.gigs.slice(0, 5);

  return (
    <IndustrialLayout>
      <IndustrialContainer>
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3">
              <IndustrialIcon
                icon="factory"
                className="text-industrial-accent"
              />
              <div>
                <IndustrialHeader
                  level={1}
                  className="text-industrial-foreground"
                >
                  Welcome back, {user?.companyName || user?.name}!
                </IndustrialHeader>
                <p className="text-industrial-muted-foreground mt-1">
                  Manage your gigs, review applications, and grow your team
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push('/startup/create-gig')}
              className="shrink-0 bg-industrial-accent hover:bg-industrial-accent/90 text-industrial-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Gig
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={itemVariants}
          >
            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-industrial-accent/20 rounded-lg border border-industrial-accent/30">
                    <IndustrialIcon
                      icon="factory"
                      className="h-6 w-6 text-industrial-accent"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Total Gigs
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {dashboardData.stats.totalGigs}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>

            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-industrial-safety-300/20 rounded-lg border border-industrial-safety-300/30">
                    <IndustrialIcon
                      icon="gear"
                      className="h-6 w-6 text-industrial-safety-300"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Active Gigs
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {dashboardData.stats.activeGigs}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>

            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-industrial-navy-500/20 rounded-lg border border-industrial-navy-500/30">
                    <IndustrialIcon
                      icon="wrench"
                      className="h-6 w-6 text-industrial-navy-500"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Total Applications
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {dashboardData.stats.totalApplications}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>

            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-industrial-gunmetal-400/20 rounded-lg border border-industrial-gunmetal-400/30">
                    <IndustrialIcon
                      icon="cog"
                      className="h-6 w-6 text-industrial-gunmetal-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Pending Reviews
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {dashboardData.stats.pendingApplications}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Gigs */}
            <motion.div variants={itemVariants}>
              <IndustrialCard>
                <IndustrialCardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <IndustrialCardTitle className="flex items-center gap-2">
                        <IndustrialIcon
                          icon="factory"
                          className="text-industrial-accent"
                        />
                        Recent Gigs
                      </IndustrialCardTitle>
                      <IndustrialCardDescription>
                        Your latest job postings
                      </IndustrialCardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-industrial-border hover:bg-industrial-muted text-industrial-foreground"
                      asChild
                    >
                      <Link href="/startup/gigs">
                        <Eye className="h-4 w-4 mr-2" />
                        View All
                      </Link>
                    </Button>
                  </div>
                </IndustrialCardHeader>
                <IndustrialCardContent>
                  {recentGigs.length === 0 ? (
                    <div className="text-center py-8">
                      <IndustrialIcon
                        icon="factory"
                        className="h-12 w-12 text-industrial-muted-foreground mx-auto mb-4"
                      />
                      <p className="text-sm text-industrial-muted-foreground">
                        No gigs created yet
                      </p>
                      <Button
                        className="mt-2 bg-industrial-accent hover:bg-industrial-accent/90 text-industrial-dark"
                        size="sm"
                        asChild
                      >
                        <Link href="/startup/create-gig">
                          Create Your First Gig
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentGigs.map((gig) => (
                        <div
                          key={gig.id}
                          className="flex items-start space-x-3 p-3 border border-industrial-border rounded-lg hover:bg-industrial-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-industrial-foreground">
                              {gig.title}
                            </h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-industrial-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {gig.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />$
                                {gig.salary?.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {gig.isActive ? (
                              <Badge
                                variant="industrial-secondary"
                                className="bg-industrial-safety-300/20 text-industrial-safety-300 border-industrial-safety-300/30"
                              >
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="industrial-outline">
                                Inactive
                              </Badge>
                            )}
                            <span className="text-xs text-industrial-muted-foreground">
                              {new Date(gig.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </IndustrialCardContent>
              </IndustrialCard>
            </motion.div>

            {/* Recent Applications */}
            <motion.div variants={itemVariants}>
              <IndustrialCard>
                <IndustrialCardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <IndustrialCardTitle className="flex items-center gap-2">
                        <IndustrialIcon
                          icon="wrench"
                          className="text-industrial-accent"
                        />
                        Recent Applications
                      </IndustrialCardTitle>
                      <IndustrialCardDescription>
                        Latest applications received
                      </IndustrialCardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-industrial-border hover:bg-industrial-muted text-industrial-foreground"
                      asChild
                    >
                      <Link href="/startup/applications">
                        <Users className="h-4 w-4 mr-2" />
                        View All
                      </Link>
                    </Button>
                  </div>
                </IndustrialCardHeader>
                <IndustrialCardContent>
                  {recentApplications.length === 0 ? (
                    <div className="text-center py-8">
                      <IndustrialIcon
                        icon="gear"
                        className="h-12 w-12 text-industrial-muted-foreground mx-auto mb-4"
                      />
                      <p className="text-sm text-industrial-muted-foreground">
                        No applications received yet
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div
                          key={application.id}
                          className="flex items-start space-x-3 p-3 border border-industrial-border rounded-lg hover:bg-industrial-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-industrial-foreground">
                              {application.workerName}
                            </h4>
                            <p className="text-sm text-industrial-muted-foreground">
                              Applied for:{' '}
                              {application.gig?.title || 'Unknown Gig'}
                            </p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-industrial-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {new Date(
                                application.appliedAt
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {application.status.toLowerCase() === 'pending' && (
                              <Badge
                                variant="industrial-secondary"
                                className="bg-industrial-gunmetal-400/20 text-industrial-gunmetal-400 border-industrial-gunmetal-400/30"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                            {application.status.toLowerCase() ===
                              'approved' && (
                              <Badge
                                variant="industrial-secondary"
                                className="bg-industrial-safety-300/20 text-industrial-safety-300 border-industrial-safety-300/30"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Approved
                              </Badge>
                            )}
                            {application.status.toLowerCase() ===
                              'rejected' && (
                              <Badge
                                variant="industrial-outline"
                                className="bg-red-100/20 text-red-600 border-red-300/30"
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Rejected
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </IndustrialCardContent>
              </IndustrialCard>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <IndustrialCard>
              <IndustrialCardHeader>
                <IndustrialCardTitle className="flex items-center gap-2">
                  <IndustrialIcon
                    icon="cog"
                    className="text-industrial-accent"
                  />
                  Quick Actions
                </IndustrialCardTitle>
                <IndustrialCardDescription>
                  Common tasks to manage your startup
                </IndustrialCardDescription>
              </IndustrialCardHeader>
              <IndustrialCardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 border-industrial-border hover:bg-industrial-muted text-industrial-foreground"
                    asChild
                  >
                    <Link href="/startup/create-gig">
                      <Plus className="h-6 w-6" />
                      <span>Create New Gig</span>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 border-industrial-border hover:bg-industrial-muted text-industrial-foreground"
                    asChild
                  >
                    <Link href="/startup/gigs">
                      <Briefcase className="h-6 w-6" />
                      <span>Manage Gigs</span>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 border-industrial-border hover:bg-industrial-muted text-industrial-foreground"
                    asChild
                  >
                    <Link href="/startup/applications">
                      <Users className="h-6 w-6" />
                      <span>Review Applications</span>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 border-industrial-border hover:bg-industrial-muted text-industrial-foreground"
                    asChild
                  >
                    <Link href="/startup/profile">
                      <Building2 className="h-6 w-6" />
                      <span>Company Profile</span>
                    </Link>
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

export default withAuth(StartupDashboardPage, {
  allowedUserTypes: [UserType.STARTUP],
});
