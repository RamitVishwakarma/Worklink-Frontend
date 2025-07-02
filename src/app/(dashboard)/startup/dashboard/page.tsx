'use client';

import React from 'react';
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
import {
  IndustrialGrid,
  IndustrialDashboardGrid,
} from '@/components/ui/industrial-grid-system';
import { IndustrialAccessibilityProvider } from '@/components/ui/industrial-accessibility-enhanced';
import designTokens from '@/components/ui/industrial-design-tokens';
import { useAuthStore } from '@/lib/store/authStore';
import {
  useGigsStore,
  useGigStats,
  useApplicationsStore,
  useGigApplicationStats,
  useProfilesStore,
} from '@/lib/store';
import withAuth from '@/components/auth/withAuth';
import { UserType, GigApplication } from '@/lib/types';
import {
  Briefcase,
  Users,
  Eye,
  Plus,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Factory,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Industrial easing
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Enhanced metal card variants
const metalCardVariants = {
  hidden: { opacity: 0, y: 20, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

function StartupDashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  // Store data
  const { gigs: rawGigs, isLoading: gigsLoading } = useGigsStore();
  const { gigApplications: rawGigApplications, gigApplicationsLoading } =
    useApplicationsStore();
  const { currentProfile } = useProfilesStore();
  const gigStats = useGigStats();
  const applicationStats = useGigApplicationStats();

  // Defensive array checks
  const gigs = Array.isArray(rawGigs) ? rawGigs : [];
  const gigApplications = Array.isArray(rawGigApplications)
    ? rawGigApplications
    : [];

  const loading = gigsLoading || gigApplicationsLoading;

  // Get recent data - filter user's gigs for startup
  const userGigs = gigs.filter((gig) => gig.postedBy === user?.id);
  const recentGigs = userGigs.slice(0, 5);
  const recentApplications = gigApplications.slice(0, 5);

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

  return (
    <IndustrialAccessibilityProvider>
      <IndustrialLayout>
        <IndustrialContainer>
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Enhanced Header with industrial accent bar */}
            <motion.div className="relative" variants={itemVariants}>
              {/* Animated metal accent bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-industrial-accent via-industrial-safety-400 to-industrial-accent rounded-full"
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{
                      rotateY: 180,
                      scale: 1.1,
                      transition: { duration: 0.6 },
                    }}
                    className="p-3 bg-gradient-to-br from-industrial-accent/20 to-industrial-accent/10 rounded-xl border border-industrial-accent/30"
                  >
                    <IndustrialIcon
                      icon="factory"
                      size="xl"
                      className="text-industrial-accent"
                    />
                  </motion.div>
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <IndustrialHeader
                        level={1}
                        className="bg-gradient-to-r from-industrial-foreground to-industrial-gunmetal-800 bg-clip-text text-transparent"
                      >
                        Welcome back,{' '}
                        {(currentProfile as any)?.companyName ||
                          user?.companyName ||
                          user?.name}
                        !
                      </IndustrialHeader>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-industrial-muted-foreground mt-1"
                    >
                      Manage your gigs, review applications, and grow your team
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  <Link href="/startup/profile">
                    <Button
                      variant="industrial-secondary"
                      size="sm"
                      className="hover:scale-105 transition-transform"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/startup/create-gig">
                    <Button
                      variant="industrial-accent"
                      size="sm"
                      className="hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Gig
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Stats Cards with Industrial Design System */}
            <motion.div variants={itemVariants}>
              <IndustrialDashboardGrid
                layout="default"
                gap={designTokens.spacing['6']}
                className="w-full"
              >
                {/* Total Gigs Card */}
                <motion.div variants={metalCardVariants} whileHover="hover">
                  <IndustrialCard
                    variant="industrial"
                    className="relative overflow-hidden border-l-4 border-l-industrial-accent bg-gradient-to-br from-industrial-gunmetal-50 to-industrial-gunmetal-100"
                  >
                    <IndustrialCardContent className="p-6">
                      {/* Metal texture overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-industrial-accent/5 to-transparent opacity-50" />

                      <div className="relative flex items-center justify-between">
                        <div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm font-medium text-industrial-secondary uppercase tracking-wide"
                          >
                            Total Gigs
                          </motion.p>
                          <motion.p
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: 0.4,
                              type: 'spring',
                              stiffness: 100,
                            }}
                            className="text-3xl font-bold text-industrial-primary mt-1"
                          >
                            {gigStats.total}
                          </motion.p>
                        </div>
                        <motion.div
                          whileHover={{ rotateY: 180, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="p-3 bg-industrial-accent/20 rounded-xl border border-industrial-accent/30"
                        >
                          <IndustrialIcon
                            icon="factory"
                            size="lg"
                            className="text-industrial-accent"
                          />
                        </motion.div>
                      </div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-xs text-industrial-muted mt-3 font-medium"
                      >
                        Posted opportunities
                      </motion.p>
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>

                {/* Active Gigs Card */}
                <motion.div variants={metalCardVariants} whileHover="hover">
                  <IndustrialCard
                    variant="industrial"
                    className="relative overflow-hidden border-l-4 border-l-industrial-safety-500 bg-gradient-to-br from-amber-50 to-amber-100"
                  >
                    <IndustrialCardContent className="p-6">
                      {/* Metal texture overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-industrial-safety-500/5 to-transparent opacity-50" />

                      <div className="relative flex items-center justify-between">
                        <div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm font-medium text-amber-700 uppercase tracking-wide"
                          >
                            Active Gigs
                          </motion.p>
                          <motion.p
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: 0.5,
                              type: 'spring',
                              stiffness: 100,
                            }}
                            className="text-3xl font-bold text-industrial-safety-600 mt-1"
                          >
                            {gigStats.active}
                          </motion.p>
                        </div>
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className="p-3 bg-industrial-safety-500/20 rounded-xl border border-industrial-safety-500/30"
                        >
                          <IndustrialIcon
                            icon="gear"
                            size="lg"
                            className="text-industrial-safety-600"
                          />
                        </motion.div>
                      </div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-xs text-amber-600 mt-3 font-medium"
                      >
                        Currently accepting
                      </motion.p>
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>

                {/* Total Applications Card */}
                <motion.div variants={metalCardVariants} whileHover="hover">
                  <IndustrialCard
                    variant="industrial"
                    className="relative overflow-hidden border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-blue-100"
                  >
                    <IndustrialCardContent className="p-6">
                      {/* Metal texture overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-50" />

                      <div className="relative flex items-center justify-between">
                        <div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm font-medium text-blue-700 uppercase tracking-wide"
                          >
                            Total Applications
                          </motion.p>
                          <motion.p
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: 0.6,
                              type: 'spring',
                              stiffness: 100,
                            }}
                            className="text-3xl font-bold text-blue-600 mt-1"
                          >
                            {applicationStats.total}
                          </motion.p>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          animate={{
                            rotateX: [0, 180, 360],
                          }}
                          transition={{
                            rotateX: {
                              duration: 6,
                              repeat: Infinity,
                              ease: 'linear',
                            },
                            scale: { duration: 0.3 },
                          }}
                          className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30"
                        >
                          <IndustrialIcon
                            icon="wrench"
                            size="lg"
                            className="text-blue-600"
                          />
                        </motion.div>
                      </div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-xs text-blue-600 mt-3 font-medium"
                      >
                        Received applications
                      </motion.p>
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>

                {/* Pending Reviews Card */}
                <motion.div variants={metalCardVariants} whileHover="hover">
                  <IndustrialCard
                    variant="industrial"
                    className="relative overflow-hidden border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-purple-100"
                  >
                    <IndustrialCardContent className="p-6">
                      {/* Metal texture overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-50" />

                      <div className="relative flex items-center justify-between">
                        <div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-sm font-medium text-purple-700 uppercase tracking-wide"
                          >
                            Pending Reviews
                          </motion.p>
                          <motion.p
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: 0.7,
                              type: 'spring',
                              stiffness: 100,
                            }}
                            className="text-3xl font-bold text-purple-600 mt-1"
                          >
                            {applicationStats.pending}
                          </motion.p>
                        </div>
                        <motion.div
                          animate={{
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30"
                        >
                          <IndustrialIcon
                            icon="cog"
                            size="lg"
                            className="text-purple-600"
                          />
                        </motion.div>
                      </div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-xs text-purple-600 mt-3 font-medium"
                      >
                        Awaiting decision
                      </motion.p>
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>
              </IndustrialDashboardGrid>
            </motion.div>

            {/* Enhanced Main Content Grid with Industrial Design */}
            <IndustrialGrid
              columns={{ default: 1, lg: 2 }}
              gap={designTokens.spacing['6']}
              variant="industrial"
              pattern="grid"
              equalHeight
            >
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
                        {recentApplications.map(
                          (application: GigApplication) => (
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
                                {application.status.toLowerCase() ===
                                  'pending' && (
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
                          )
                        )}
                      </div>
                    )}
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>
            </IndustrialGrid>

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
    </IndustrialAccessibilityProvider>
  );
}

export default withAuth(StartupDashboardPage, {
  allowedUserTypes: [UserType.STARTUP],
});
