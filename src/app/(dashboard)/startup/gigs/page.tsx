'use client';

import { useState } from 'react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  IndustrialLayout,
  IndustrialContainer,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/lib/store/authStore';
import {
  useGigsStore,
  useGigStats,
  useApplicationsStore,
  useGigApplicationStats,
} from '@/lib/store';
import { useGigOperations } from '@/hooks/useApiIntegration';
import withAuth from '@/components/auth/withAuth';
import { UserType } from '@/lib/types';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Advanced industrial animation system with precision easing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Industrial precision easing
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

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
    transition: { duration: 0.3 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const getStatusBadge = (isActive: boolean, applicationCount: number = 0) => {
  if (isActive) {
    return (
      <Badge
        variant="industrial-secondary"
        className="bg-industrial-safety-300/20 text-industrial-safety-300 border-industrial-safety-300/30 shadow-sm hover:shadow-md transition-shadow"
      >
        <CheckCircle className="h-3 w-3 mr-1" />
        Active
      </Badge>
    );
  } else {
    return (
      <Badge
        variant="industrial-outline"
        className="bg-industrial-muted/20 text-industrial-muted-foreground border-industrial-border shadow-sm"
      >
        <XCircle className="h-3 w-3 mr-1" />
        Inactive
      </Badge>
    );
  }
};

function StartupGigsPage() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();

  // Store data
  const { gigs, isLoading: loading } = useGigsStore();
  const gigStats = useGigStats();
  const { gigApplications } = useApplicationsStore();
  const applicationStats = useGigApplicationStats();
  const { handleDeleteGig } = useGigOperations();

  // Local state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter user's gigs (for startups) with array safety check
  const safeGigs = Array.isArray(gigs) ? gigs : [];
  const userGigs = safeGigs.filter((gig) => gig.postedBy === user?.id);

  const handleDeleteGigAction = async (gigId: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this gig? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      setDeletingId(gigId);
      await handleDeleteGig(gigId);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete gig',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const toggleGigStatus = async (gigId: string, currentStatus: boolean) => {
    try {
      // This would need to be implemented in the store/API
      // For now, we'll use the manual API call
      const api = (await import('@/lib/api')).default;
      await api.patch(`/gigs/${gigId}/toggle-status`);

      toast({
        title: 'Success',
        description: `Gig ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
      });

      // Refresh data - the auto-fetch system will handle this
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to update gig status',
        variant: 'destructive',
      });
    }
  };
  if (loading) {
    return (
      <IndustrialLayout>
        <IndustrialContainer>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-8 w-48 mb-2 bg-industrial-muted" />
                <Skeleton className="h-4 w-64 bg-industrial-muted" />
              </div>
              <Skeleton className="h-10 w-32 bg-industrial-muted" />
            </div>

            <IndustrialCard>
              <IndustrialCardHeader>
                <Skeleton className="h-6 w-32 bg-industrial-muted" />
                <Skeleton className="h-4 w-48 bg-industrial-muted" />
              </IndustrialCardHeader>
              <IndustrialCardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border border-industrial-border rounded"
                    >
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32 bg-industrial-muted" />
                        <Skeleton className="h-4 w-48 bg-industrial-muted" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-16 bg-industrial-muted" />
                        <Skeleton className="h-8 w-20 bg-industrial-muted" />
                        <Skeleton className="h-8 w-20 bg-industrial-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              </IndustrialCardContent>
            </IndustrialCard>
          </div>
        </IndustrialContainer>
      </IndustrialLayout>
    );
  }
  const stats = {
    total: userGigs.length,
    active: userGigs.filter((gig) => gig.isActive).length,
    totalApplications: userGigs.reduce(
      (sum, gig) => sum + (gig.applicationCount || 0),
      0
    ),
  };
  return (
    <IndustrialLayout>
      <IndustrialContainer>
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {' '}
          {/* Enhanced Header with Industrial Styling */}
          <motion.div variants={headerVariants} className="relative">
            {/* Animated Metal Accent Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-industrial-accent via-industrial-safety-400 to-industrial-accent rounded-full"
            />

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-4">
                {/* 3D Factory Icon with Hover Animation */}
                <motion.div
                  whileHover={{
                    rotateY: 15,
                    scale: 1.1,
                    rotateX: 5,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      rotateZ: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 3,
                    }}
                  >
                    <IndustrialIcon
                      icon="factory"
                      size="xl"
                      className="text-industrial-accent drop-shadow-lg"
                    />
                  </motion.div>

                  {/* Industrial glow effect */}
                  <div className="absolute inset-0 bg-gradient-radial from-industrial-accent/20 to-transparent rounded-full blur-xl" />
                </motion.div>

                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-industrial-foreground via-industrial-accent to-industrial-foreground bg-clip-text text-transparent mb-2">
                      Your Gigs
                    </h1>
                    <p className="text-industrial-muted-foreground text-lg">
                      Manage your industrial job postings and track applications
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Create Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="industrial-accent"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Link href="/startup/create-gig">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Gig
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Metal texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-industrial-gunmetal-50/5 to-transparent pointer-events-none" />
          </motion.div>{' '}
          {/* Enhanced Stats Cards with Industrial Styling */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={itemVariants}
          >
            {/* Total Gigs Card */}
            <motion.div variants={metalCardVariants} whileHover="hover">
              <IndustrialCard className="relative overflow-hidden border-l-4 border-l-industrial-accent bg-gradient-to-br from-industrial-gunmetal-50 to-industrial-gunmetal-100">
                {/* Metal grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                      radial-gradient(circle at 1px 1px, rgba(156, 163, 175, 0.3) 1px, transparent 0),
                      linear-gradient(45deg, transparent 24%, rgba(156, 163, 175, 0.1) 25%, rgba(156, 163, 175, 0.1) 26%, transparent 27%, transparent 74%, rgba(156, 163, 175, 0.1) 75%, rgba(156, 163, 175, 0.1) 76%, transparent 77%)
                    `,
                      backgroundSize: '20px 20px, 60px 60px',
                    }}
                  />
                </div>

                {/* Gradient overlay for industrial feel */}
                <div className="absolute inset-0 bg-gradient-to-br from-industrial-accent/5 to-transparent opacity-50" />

                <IndustrialCardContent className="p-6 relative z-10">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Eye className="h-6 w-6 text-industrial-accent" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-industrial-muted-foreground">
                        Total Gigs
                      </p>
                      <p className="text-3xl font-bold text-industrial-foreground">
                        {stats.total}
                      </p>
                    </div>
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>
            </motion.div>

            {/* Active Gigs Card */}
            <motion.div variants={metalCardVariants} whileHover="hover">
              <IndustrialCard className="relative overflow-hidden border-l-4 border-l-industrial-safety-400 bg-gradient-to-br from-industrial-safety-50 to-industrial-safety-100">
                {/* Metal grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                      radial-gradient(circle at 1px 1px, rgba(234, 179, 8, 0.3) 1px, transparent 0),
                      linear-gradient(45deg, transparent 24%, rgba(234, 179, 8, 0.1) 25%, rgba(234, 179, 8, 0.1) 26%, transparent 27%, transparent 74%, rgba(234, 179, 8, 0.1) 75%, rgba(234, 179, 8, 0.1) 76%, transparent 77%)
                    `,
                      backgroundSize: '20px 20px, 60px 60px',
                    }}
                  />
                </div>

                {/* Safety yellow gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-industrial-safety-400/5 to-transparent opacity-50" />

                <IndustrialCardContent className="p-6 relative z-10">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <CheckCircle className="h-6 w-6 text-industrial-safety-400" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-industrial-muted-foreground">
                        Active Gigs
                      </p>
                      <p className="text-3xl font-bold text-industrial-foreground">
                        {stats.active}
                      </p>
                    </div>
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>
            </motion.div>

            {/* Total Applications Card */}
            <motion.div variants={metalCardVariants} whileHover="hover">
              <IndustrialCard className="relative overflow-hidden border-l-4 border-l-industrial-navy-400 bg-gradient-to-br from-industrial-navy-50 to-industrial-navy-100">
                {/* Metal grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                      radial-gradient(circle at 1px 1px, rgba(30, 64, 175, 0.3) 1px, transparent 0),
                      linear-gradient(45deg, transparent 24%, rgba(30, 64, 175, 0.1) 25%, rgba(30, 64, 175, 0.1) 26%, transparent 27%, transparent 74%, rgba(30, 64, 175, 0.1) 75%, rgba(30, 64, 175, 0.1) 76%, transparent 77%)
                    `,
                      backgroundSize: '20px 20px, 60px 60px',
                    }}
                  />
                </div>

                {/* Navy blue gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-industrial-navy-400/5 to-transparent opacity-50" />

                <IndustrialCardContent className="p-6 relative z-10">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{
                        scale: [1, 1.2, 1],
                        rotateX: [0, 360, 0],
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Users className="h-6 w-6 text-industrial-navy-400" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-industrial-muted-foreground">
                        Total Applications
                      </p>
                      <p className="text-3xl font-bold text-industrial-foreground">
                        {stats.totalApplications}
                      </p>
                    </div>
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>
            </motion.div>
          </motion.div>{' '}
          {/* Enhanced Gigs List Section */}
          <motion.div variants={itemVariants}>
            {userGigs.length === 0 ? (
              <motion.div variants={metalCardVariants} whileHover="hover">
                <IndustrialCard className="relative overflow-hidden border-l-4 border-l-industrial-muted bg-gradient-to-br from-industrial-gunmetal-50 to-industrial-gunmetal-100">
                  {/* Metal grid pattern overlay */}
                  <div className="absolute inset-0 opacity-[0.03]">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                        radial-gradient(circle at 1px 1px, rgba(156, 163, 175, 0.3) 1px, transparent 0),
                        linear-gradient(45deg, transparent 24%, rgba(156, 163, 175, 0.1) 25%, rgba(156, 163, 175, 0.1) 26%, transparent 27%, transparent 74%, rgba(156, 163, 175, 0.1) 75%, rgba(156, 163, 175, 0.1) 76%, transparent 77%)
                      `,
                        backgroundSize: '20px 20px, 60px 60px',
                      }}
                    />
                  </div>

                  {/* Empty state gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-industrial-muted/5 to-transparent opacity-50" />

                  <IndustrialCardContent className="flex flex-col items-center justify-center py-16 relative z-10">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <IndustrialIcon
                        icon="factory"
                        className="h-16 w-16 text-industrial-muted-foreground mb-4"
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-industrial-foreground">
                      No Industrial Gigs Created
                    </h3>
                    <p className="text-industrial-muted-foreground text-center mb-6 max-w-md">
                      You haven't created any gigs yet. Start by posting your
                      first industrial job opportunity and connect with skilled
                      workers.
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        asChild
                        variant="industrial-accent"
                        className="shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        <Link href="/startup/create-gig">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Gig
                        </Link>
                      </Button>
                    </motion.div>
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>
            ) : (
              <motion.div variants={metalCardVariants} whileHover="hover">
                <IndustrialCard className="relative overflow-hidden border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100">
                  {/* Metal grid pattern overlay */}
                  <div className="absolute inset-0 opacity-[0.03]">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                        radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.3) 1px, transparent 0),
                        linear-gradient(45deg, transparent 24%, rgba(16, 185, 129, 0.1) 25%, rgba(16, 185, 129, 0.1) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1) 76%, transparent 77%)
                      `,
                        backgroundSize: '20px 20px, 60px 60px',
                      }}
                    />
                  </div>

                  {/* Emerald gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50" />

                  <IndustrialCardHeader className="relative z-10">
                    <IndustrialCardTitle className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <IndustrialIcon
                          icon="gear"
                          size="md"
                          className="text-emerald-500"
                        />
                      </motion.div>
                      <span className="text-industrial-foreground font-bold">
                        All Industrial Gigs
                      </span>
                    </IndustrialCardTitle>
                    <IndustrialCardDescription className="text-industrial-muted-foreground">
                      Manage your industrial job postings and monitor
                      applications
                    </IndustrialCardDescription>
                  </IndustrialCardHeader>

                  <IndustrialCardContent className="relative z-10">
                    <div className="hidden md:block">
                      <Table className="border-industrial-border">
                        {' '}
                        <TableHeader>
                          <TableRow className="border-industrial-border bg-industrial-muted/20">
                            <TableHead className="text-industrial-foreground font-semibold">
                              Title
                            </TableHead>
                            <TableHead className="text-industrial-foreground">
                              Location
                            </TableHead>
                            <TableHead className="text-industrial-foreground">
                              Salary
                            </TableHead>
                            <TableHead className="text-industrial-foreground">
                              Applications
                            </TableHead>
                            <TableHead className="text-industrial-foreground">
                              Status
                            </TableHead>
                            <TableHead className="text-industrial-foreground">
                              Created
                            </TableHead>
                            <TableHead className="text-right text-industrial-foreground">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userGigs.map((gig) => (
                            <TableRow
                              key={gig.id}
                              className="border-industrial-border"
                            >
                              <TableCell className="font-medium text-industrial-foreground">
                                {gig.title}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-industrial-muted-foreground" />
                                  <span className="text-industrial-foreground">
                                    {gig.location}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <DollarSign className="h-4 w-4 text-industrial-muted-foreground" />
                                  <span className="text-industrial-foreground">
                                    {gig.salary
                                      ? `$${gig.salary.toLocaleString()}`
                                      : 'Not specified'}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Users className="h-4 w-4 text-industrial-muted-foreground" />
                                  <span className="text-industrial-foreground">
                                    {gig.applicationCount || 0}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(
                                  gig.isActive,
                                  gig.applicationCount
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-industrial-muted-foreground" />
                                  <span className="text-industrial-foreground">
                                    {new Date(
                                      gig.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <Button
                                    variant="industrial-outline"
                                    size="sm"
                                    onClick={() =>
                                      toggleGigStatus(gig.id, gig.isActive)
                                    }
                                  >
                                    {gig.isActive ? 'Deactivate' : 'Activate'}
                                  </Button>
                                  <Button
                                    variant="industrial-outline"
                                    size="sm"
                                    onClick={() =>
                                      router.push(
                                        `/startup/gigs/${gig.id}/edit`
                                      )
                                    }
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>{' '}
                                  <Button
                                    variant="industrial-outline"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteGigAction(gig.id)
                                    }
                                    disabled={deletingId === gig.id}
                                  >
                                    {deletingId === gig.id ? (
                                      <Clock className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>{' '}
                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
                      {userGigs.map((gig) => (
                        <motion.div
                          key={gig.id}
                          className="border border-industrial-border rounded-lg p-4 space-y-3 bg-industrial-muted/10"
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-industrial-foreground">
                                {gig.title}
                              </h3>
                              <div className="flex items-center gap-4 mt-1 text-sm text-industrial-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {gig.location}
                                </div>
                                {gig.salary && (
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />$
                                    {gig.salary.toLocaleString()}
                                  </div>
                                )}
                              </div>
                            </div>
                            {getStatusBadge(gig.isActive, gig.applicationCount)}
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-industrial-muted-foreground">
                                <Users className="h-3 w-3" />
                                {gig.applicationCount || 0} applications
                              </div>
                              <div className="flex items-center gap-1 text-industrial-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(gig.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-industrial-border">
                            <Button
                              variant="industrial-outline"
                              size="sm"
                              onClick={() =>
                                toggleGigStatus(gig.id, gig.isActive)
                              }
                              className="flex-1"
                            >
                              {gig.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button
                              variant="industrial-outline"
                              size="sm"
                              onClick={() =>
                                router.push(`/startup/gigs/${gig.id}/edit`)
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="industrial-outline"
                              size="sm"
                              onClick={() => handleDeleteGigAction(gig.id)}
                              disabled={deletingId === gig.id}
                            >
                              {deletingId === gig.id ? (
                                <Clock className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      ))}{' '}
                    </div>
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
}

export default withAuth(StartupGigsPage, {
  allowedUserTypes: [UserType.STARTUP],
});
