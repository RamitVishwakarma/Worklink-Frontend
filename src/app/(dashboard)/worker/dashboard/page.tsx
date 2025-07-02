'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
import {
  IndustrialGrid,
  IndustrialDashboardGrid,
} from '@/components/ui/industrial-grid-system';
import {
  IndustrialAccessibilityProvider,
  IndustrialAnnouncement,
} from '@/components/ui/industrial-accessibility-enhanced';
import designTokens from '@/components/ui/industrial-design-tokens';
import { useAuthStore } from '@/lib/store/authStore';
import {
  useGigsStore,
  useGigStats,
  useApplicationsStore,
  useGigApplicationStats,
  useProfilesStore,
} from '@/lib/store';
import {
  Briefcase,
  MapPin,
  Calendar,
  Settings,
  Building,
  HardHat,
  Factory,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
} from 'lucide-react';
import withAuth from '@/components/auth/withAuth';
import { UserType, GigApplication, WorkerProfile } from '@/lib/types';
import Link from 'next/link';

function WorkerDashboardPage() {
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

  // Get recent data
  const recentGigs = gigs.slice(0, 6);
  const recentApplications = gigApplications.slice(0, 3);

  // Enhanced loading announcement for accessibility
  React.useEffect(() => {
    if (!loading) {
      // Announce when dashboard data has loaded for screen readers
      const message = `Dashboard loaded. You have ${applicationStats.total} total applications, ${applicationStats.pending} pending, and ${gigStats.active} active gigs available.`;
      // This would typically be handled by the accessibility provider
      console.log('Accessibility:', message);
    }
  }, [loading, applicationStats, gigStats]);

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
  return (
    <IndustrialAccessibilityProvider>
      <IndustrialLayout>
        <IndustrialContainer>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {' '}
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
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="p-3 bg-gradient-to-br from-industrial-accent/20 to-industrial-accent/10 rounded-xl border border-industrial-accent/30"
                  >
                    <IndustrialIcon
                      icon="hardhat"
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
                        {(currentProfile as WorkerProfile)?.name || user?.email}
                        !
                      </IndustrialHeader>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-industrial-muted-foreground mt-1"
                    >
                      Track your applications, explore new opportunities, and
                      manage your profile
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  <Link href="/worker/profile">
                    <Button
                      variant="industrial-secondary"
                      size="sm"
                      className="hover:scale-105 transition-transform"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/gigs">
                    <Button
                      variant="industrial-accent"
                      size="sm"
                      className="hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      Browse Gigs
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>{' '}
            {/* Enhanced Stats Cards with Industrial Design System */}
            <motion.div variants={itemVariants}>
              <IndustrialDashboardGrid
                layout="default"
                gap={designTokens.spacing['6']}
                className="w-full"
              >
                {/* Applied Gigs Card */}
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
                            Applied Gigs
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
                            {applicationStats.total}
                          </motion.p>
                        </div>
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className="p-3 bg-industrial-accent/20 rounded-xl border border-industrial-accent/30"
                        >
                          <IndustrialIcon
                            icon="wrench"
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
                        Total applications submitted
                      </motion.p>
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>

                {/* Pending Applications Card */}
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
                            Pending
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
                            {applicationStats.pending}
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
                            icon="cog"
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
                        Awaiting review
                      </motion.p>
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>

                {/* Approved Applications Card */}
                <motion.div variants={metalCardVariants} whileHover="hover">
                  <IndustrialCard
                    variant="industrial"
                    className="relative overflow-hidden border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100"
                  >
                    <IndustrialCardContent className="p-6">
                      {/* Metal texture overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50" />

                      <div className="relative flex items-center justify-between">
                        <div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm font-medium text-emerald-700 uppercase tracking-wide"
                          >
                            Approved
                          </motion.p>
                          <motion.p
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: 0.6,
                              type: 'spring',
                              stiffness: 100,
                            }}
                            className="text-3xl font-bold text-emerald-600 mt-1"
                          >
                            {applicationStats.approved}
                          </motion.p>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.8,
                            type: 'spring',
                            stiffness: 200,
                          }}
                          className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30"
                        >
                          <IndustrialIcon
                            icon="bolt"
                            size="lg"
                            className="text-emerald-600"
                          />
                        </motion.div>
                      </div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-xs text-emerald-600 mt-3 font-medium"
                      >
                        Successfully approved
                      </motion.p>
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>

                {/* Available Gigs Card */}
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
                            transition={{ delay: 0.5 }}
                            className="text-sm font-medium text-blue-700 uppercase tracking-wide"
                          >
                            Available Gigs
                          </motion.p>
                          <motion.p
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: 0.7,
                              type: 'spring',
                              stiffness: 100,
                            }}
                            className="text-3xl font-bold text-blue-600 mt-1"
                          >
                            {gigStats.active}
                          </motion.p>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          animate={{
                            rotateY: [0, 180, 360],
                          }}
                          transition={{
                            rotateY: {
                              duration: 6,
                              repeat: Infinity,
                              ease: 'linear',
                            },
                            scale: { duration: 0.3 },
                          }}
                          className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30"
                        >
                          <IndustrialIcon
                            icon="factory"
                            size="lg"
                            className="text-blue-600"
                          />
                        </motion.div>
                      </div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-xs text-blue-600 mt-3 font-medium"
                      >
                        Ready to apply
                      </motion.p>{' '}
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>
              </IndustrialDashboardGrid>
            </motion.div>{' '}
            {/* Enhanced Main Content with Industrial Grid */}
            <IndustrialGrid
              columns={{ default: 1, lg: 2 }}
              gap={designTokens.spacing['6']}
              variant="industrial"
              pattern="grid"
              equalHeight
            >
              {/* Recent Available Gigs */}
              <motion.div variants={itemVariants}>
                <IndustrialCard
                  variant="industrial"
                  className="relative overflow-hidden bg-gradient-to-br from-industrial-gunmetal-50 to-white"
                >
                  {/* Industrial grid pattern overlay */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,_#2C3E50_1px,_transparent_0)] bg-[length:24px_24px]" />
                  </div>

                  <IndustrialCardHeader className="relative flex flex-row items-center justify-between border-b border-industrial-accent/20 pb-4">
                    <IndustrialCardTitle className="text-lg font-semibold flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="p-2 bg-industrial-accent/10 rounded-lg border border-industrial-accent/20"
                      >
                        <IndustrialIcon
                          icon="wrench"
                          size="sm"
                          className="text-industrial-accent"
                        />
                      </motion.div>
                      <span className="bg-gradient-to-r from-industrial-foreground to-industrial-gunmetal-700 bg-clip-text text-transparent">
                        Recent Available Gigs
                      </span>
                    </IndustrialCardTitle>
                    <Link href="/gigs">
                      <Button
                        variant="industrial-secondary"
                        size="sm"
                        className="hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        View All
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="ml-1"
                        >
                          →
                        </motion.div>
                      </Button>
                    </Link>
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="relative">
                    {recentGigs.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          animate={{
                            rotateY: [0, 180, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="mb-6"
                        >
                          <IndustrialIcon
                            icon="factory"
                            size="xl"
                            className="mx-auto text-industrial-muted"
                          />
                        </motion.div>
                        <p className="text-industrial-secondary font-medium">
                          No gigs available at the moment.
                        </p>
                        <p className="text-sm text-industrial-muted mt-2">
                          Check back later for new opportunities
                        </p>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        {recentGigs.slice(0, 3).map((gig, index) => (
                          <motion.div
                            key={gig.id}
                            initial={{ opacity: 0, x: -30, rotateY: -15 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{
                              delay: 0.15 * index,
                              duration: 0.6,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            whileHover={{
                              scale: 1.02,
                              x: 8,
                              transition: { duration: 0.2 },
                            }}
                            className="relative border border-industrial-border rounded-lg p-5 hover:bg-gradient-to-r hover:from-industrial-accent/5 hover:to-industrial-gunmetal-50/50 transition-all duration-300 group cursor-pointer"
                          >
                            {/* Metal accent line */}
                            <motion.div
                              initial={{ width: 0 }}
                              whileHover={{ width: '100%' }}
                              transition={{ duration: 0.3 }}
                              className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-industrial-accent to-industrial-safety-500 rounded-full"
                            />

                            <div className="flex justify-between items-start mb-3">
                              <motion.h3
                                className="font-semibold text-industrial-primary line-clamp-1 group-hover:text-industrial-accent transition-colors duration-300"
                                whileHover={{ scale: 1.02 }}
                              >
                                {gig.title}
                              </motion.h3>
                              <Badge
                                variant="industrial-secondary"
                                className="ml-2 shrink-0"
                              >
                                {gig.jobType}
                              </Badge>
                            </div>
                            <p className="text-sm text-industrial-secondary mb-4 line-clamp-2 leading-relaxed">
                              {gig.description}
                            </p>
                            <div className="flex items-center justify-between text-xs text-industrial-muted">
                              <motion.div
                                className="flex items-center gap-1 hover:text-industrial-accent transition-colors"
                                whileHover={{ scale: 1.05 }}
                              >
                                <MapPin className="h-3 w-3" />
                                {gig.location}
                              </motion.div>
                              <motion.div
                                className="flex items-center gap-1 hover:text-industrial-accent transition-colors"
                                whileHover={{ scale: 1.05 }}
                              >
                                <Building className="h-3 w-3" />
                                {gig.company}
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>{' '}
              {/* Your Applications - Enhanced */}
              <motion.div variants={itemVariants}>
                <IndustrialCard
                  variant="industrial"
                  className="relative overflow-hidden bg-gradient-to-br from-industrial-gunmetal-50 to-white"
                >
                  {/* Industrial grid pattern overlay */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,_#34495E_1px,_transparent_0)] bg-[length:24px_24px]" />
                  </div>

                  <IndustrialCardHeader className="relative flex flex-row items-center justify-between border-b border-industrial-accent/20 pb-4">
                    <IndustrialCardTitle className="text-lg font-semibold flex items-center gap-3">
                      <motion.div
                        animate={{
                          rotateY: [0, 180, 360],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="p-2 bg-industrial-accent/10 rounded-lg border border-industrial-accent/20"
                      >
                        <IndustrialIcon
                          icon="hardhat"
                          size="sm"
                          className="text-industrial-accent"
                        />
                      </motion.div>
                      <span className="bg-gradient-to-r from-industrial-foreground to-industrial-gunmetal-700 bg-clip-text text-transparent">
                        Your Applications
                      </span>
                    </IndustrialCardTitle>
                    <Link href="/worker/applied-gigs">
                      <Button
                        variant="industrial-secondary"
                        size="sm"
                        className="hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        View All
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="ml-1"
                        >
                          →
                        </motion.div>
                      </Button>
                    </Link>
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="relative">
                    {recentApplications.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="mb-6"
                        >
                          <IndustrialIcon
                            icon="hardhat"
                            size="xl"
                            className="mx-auto text-industrial-muted"
                          />
                        </motion.div>
                        <p className="text-industrial-secondary font-medium">
                          You haven't applied to any gigs yet.
                        </p>
                        <p className="text-sm text-industrial-muted mt-2">
                          Start exploring opportunities and build your career
                        </p>
                        <Link href="/gigs" className="inline-block mt-4">
                          <Button
                            variant="industrial-accent"
                            size="sm"
                            className="hover:scale-105 transition-transform"
                          >
                            <IndustrialIcon
                              icon="wrench"
                              size="sm"
                              className="mr-2"
                            />
                            Browse Gigs
                          </Button>
                        </Link>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        {recentApplications.map(
                          (application: GigApplication, index: number) => (
                            <motion.div
                              key={application.id}
                              initial={{ opacity: 0, x: 30, rotateY: 15 }}
                              animate={{ opacity: 1, x: 0, rotateY: 0 }}
                              transition={{
                                delay: 0.15 * index,
                                duration: 0.6,
                                ease: [0.25, 0.46, 0.45, 0.94],
                              }}
                              whileHover={{
                                scale: 1.02,
                                x: -8,
                                transition: { duration: 0.2 },
                              }}
                              className="relative border border-industrial-border rounded-lg p-5 hover:bg-gradient-to-l hover:from-industrial-accent/5 hover:to-industrial-gunmetal-50/50 transition-all duration-300 group cursor-pointer"
                            >
                              {/* Status indicator line */}
                              <motion.div
                                initial={{ width: 0 }}
                                whileHover={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                                className={`absolute top-0 right-0 h-0.5 rounded-full ${
                                  application.status === 'approved'
                                    ? 'bg-gradient-to-l from-emerald-500 to-emerald-400'
                                    : application.status === 'rejected'
                                      ? 'bg-gradient-to-l from-red-500 to-red-400'
                                      : 'bg-gradient-to-l from-industrial-safety-500 to-industrial-accent'
                                }`}
                              />

                              <div className="flex justify-between items-start mb-3">
                                <motion.h3
                                  className="font-semibold text-industrial-primary line-clamp-1 group-hover:text-industrial-accent transition-colors duration-300"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  {application.gig?.title || 'Gig Details'}
                                </motion.h3>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="ml-2 shrink-0"
                                >
                                  <Badge
                                    variant={
                                      application.status === 'approved'
                                        ? 'industrial-success'
                                        : application.status === 'rejected'
                                          ? 'industrial-danger'
                                          : 'industrial-accent'
                                    }
                                    className="shadow-sm"
                                  >
                                    {application.status}
                                  </Badge>
                                </motion.div>
                              </div>

                              <div className="flex items-center justify-between text-xs text-industrial-muted">
                                <motion.div
                                  className="flex items-center gap-1 hover:text-industrial-accent transition-colors"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <Calendar className="h-3 w-3" />
                                  Applied{' '}
                                  {new Date(
                                    application.appliedAt
                                  ).toLocaleDateString()}
                                </motion.div>
                                {application.gig && (
                                  <motion.div
                                    className="flex items-center gap-1 hover:text-industrial-accent transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <MapPin className="h-3 w-3" />
                                    {application.gig.location}
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>
                    )}{' '}
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>
            </IndustrialGrid>{' '}
            {/* Enhanced Quick Actions */}
            <motion.div variants={itemVariants}>
              <IndustrialCard
                variant="industrial-accent"
                className="relative overflow-hidden bg-gradient-to-br from-industrial-accent/10 to-industrial-gunmetal-50"
              >
                {/* Metal texture pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="h-full w-full bg-[linear-gradient(45deg,_#2C3E50_25%,_transparent_25%,_transparent_75%,_#2C3E50_75%,_#2C3E50),_linear-gradient(45deg,_#2C3E50_25%,_transparent_25%,_transparent_75%,_#2C3E50_75%,_#2C3E50)] bg-[length:8px_8px] bg-[position:0_0,_4px_4px]" />
                </div>

                <IndustrialCardHeader className="relative border-b border-industrial-accent/30">
                  <IndustrialCardTitle className="text-lg font-semibold flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="p-2 bg-industrial-accent/20 rounded-lg border border-industrial-accent/40"
                    >
                      <IndustrialIcon
                        icon="gear"
                        size="sm"
                        animated
                        className="text-industrial-accent"
                      />
                    </motion.div>
                    <span className="bg-gradient-to-r from-industrial-accent to-industrial-gunmetal-700 bg-clip-text text-transparent">
                      Quick Actions
                    </span>
                  </IndustrialCardTitle>
                </IndustrialCardHeader>
                <IndustrialCardContent className="relative">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                    {/* Browse Gigs Action */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href="/gigs" className="block">
                        <Button
                          variant="industrial-outline"
                          className="w-full h-28 flex-col gap-3 hover:bg-gradient-to-t hover:from-industrial-accent/10 hover:to-industrial-gunmetal-50 border-2 hover:border-industrial-accent/50 transition-all duration-300 group relative overflow-hidden"
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          />

                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            className="relative"
                          >
                            <IndustrialIcon
                              icon="wrench"
                              size="md"
                              className="group-hover:text-industrial-accent transition-colors"
                            />
                          </motion.div>
                          <span className="text-sm font-medium group-hover:text-industrial-accent transition-colors">
                            Browse Gigs
                          </span>
                        </Button>
                      </Link>
                    </motion.div>

                    {/* View Machines Action */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href="/worker/machines" className="block">
                        <Button
                          variant="industrial-outline"
                          className="w-full h-28 flex-col gap-3 hover:bg-gradient-to-t hover:from-industrial-accent/10 hover:to-industrial-gunmetal-50 border-2 hover:border-industrial-accent/50 transition-all duration-300 group relative overflow-hidden"
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          />

                          <motion.div
                            animate={{
                              rotateY: [0, 180, 360],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            className="relative"
                          >
                            <IndustrialIcon
                              icon="factory"
                              size="md"
                              className="group-hover:text-industrial-accent transition-colors"
                            />
                          </motion.div>
                          <span className="text-sm font-medium group-hover:text-industrial-accent transition-colors">
                            View Machines
                          </span>
                        </Button>
                      </Link>
                    </motion.div>

                    {/* Edit Profile Action */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href="/worker/profile" className="block">
                        <Button
                          variant="industrial-outline"
                          className="w-full h-28 flex-col gap-3 hover:bg-gradient-to-t hover:from-industrial-accent/10 hover:to-industrial-gunmetal-50 border-2 hover:border-industrial-accent/50 transition-all duration-300 group relative overflow-hidden"
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          />

                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                            className="relative"
                          >
                            <IndustrialIcon
                              icon="hardhat"
                              size="md"
                              className="group-hover:text-industrial-accent transition-colors"
                            />
                          </motion.div>
                          <span className="text-sm font-medium group-hover:text-industrial-accent transition-colors">
                            Edit Profile
                          </span>
                        </Button>
                      </Link>
                    </motion.div>

                    {/* My Applications Action */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href="/worker/applied-gigs" className="block">
                        <Button
                          variant="industrial-outline"
                          className="w-full h-28 flex-col gap-3 hover:bg-gradient-to-t hover:from-industrial-accent/10 hover:to-industrial-gunmetal-50 border-2 hover:border-industrial-accent/50 transition-all duration-300 group relative overflow-hidden"
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          />

                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            className="relative"
                          >
                            <IndustrialIcon
                              icon="gear"
                              size="md"
                              className="group-hover:text-industrial-accent transition-colors"
                            />
                          </motion.div>
                          <span className="text-sm font-medium group-hover:text-industrial-accent transition-colors">
                            My Applications
                          </span>
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>
            </motion.div>{' '}
          </motion.div>
        </IndustrialContainer>
      </IndustrialLayout>
    </IndustrialAccessibilityProvider>
  );
}

export default withAuth(WorkerDashboardPage, {
  allowedUserTypes: [UserType.WORKER],
});
