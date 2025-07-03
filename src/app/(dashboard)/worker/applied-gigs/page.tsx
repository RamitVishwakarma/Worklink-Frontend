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
  IndustrialHeader,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/lib/store/authStore';
import { useApplicationsStore, useGigApplicationStats } from '@/lib/store';
import { GigApplication } from '@/lib/types';
import {
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  DollarSign,
  Building2,
  Eye,
  RefreshCw,
  Wrench,
  Cog,
  Factory,
  HardHat,
  Settings,
} from 'lucide-react';

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

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'rejected':
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-yellow-600" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return (
        <Badge className="bg-industrial-safety-300 text-industrial-gunmetal-800 hover:bg-industrial-safety-300 border-industrial-safety-400">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      );
    case 'rejected':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="bg-industrial-muted text-industrial-muted-foreground hover:bg-industrial-muted border-industrial-border">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
  }
};

export default function AppliedGigsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthStore();

  // Store data
  const { gigApplications: applications, gigApplicationsLoading: loading } =
    useApplicationsStore();
  const applicationStats = useGigApplicationStats();
  const refreshApplications = async () => {
    setRefreshing(true);
    try {
      // Since applications are auto-fetched by AppProvider,
      // we'll provide user feedback without actual refresh
      toast({
        title: 'Info',
        description: 'Applications are automatically kept up to date',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to refresh applications',
        variant: 'destructive',
      });
    } finally {
      setRefreshing(false);
    }
  };
  if (loading) {
    return (
      <IndustrialLayout>
        <IndustrialContainer>
          <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-8 w-48 mb-2 bg-gray-200" />
                <Skeleton className="h-4 w-64 bg-gray-200" />
              </div>
              <Skeleton className="h-10 w-24 bg-gray-200" />
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <IndustrialCard key={i} className="border-gray-200">
                  <IndustrialCardContent className="p-6">
                    <Skeleton className="h-4 w-16 mb-2 bg-gray-200" />
                    <Skeleton className="h-8 w-12 bg-gray-200" />
                  </IndustrialCardContent>
                </IndustrialCard>
              ))}
            </div>

            {/* Applications Skeleton */}
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <IndustrialCard key={i} className="border-gray-200">
                  <IndustrialCardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32 bg-gray-200" />
                        <Skeleton className="h-4 w-48 bg-gray-200" />
                      </div>
                      <Skeleton className="h-6 w-20 bg-gray-200" />
                    </div>
                  </IndustrialCardHeader>
                  <IndustrialCardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Skeleton className="h-4 w-24 bg-gray-200" />
                      <Skeleton className="h-4 w-32 bg-gray-200" />
                      <Skeleton className="h-4 w-28 bg-gray-200" />
                    </div>
                  </IndustrialCardContent>
                </IndustrialCard>
              ))}
            </div>
          </div>
        </IndustrialContainer>
      </IndustrialLayout>
    );
  }
  const stats = applicationStats;
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
          <IndustrialHeader>
            <motion.div
              className="flex items-center justify-between"
              variants={itemVariants}
            >
              <div>
                <div className="flex items-center gap-3">
                  <IndustrialIcon icon="wrench" size="lg" />
                  <h1 className="text-3xl font-bold tracking-tight text-industrial-foreground">
                    Applied Gigs
                  </h1>
                </div>
                <p className="text-industrial-muted-foreground">
                  Track your gig applications and their status
                </p>
              </div>
              <Button
                variant="industrial-outline"
                onClick={refreshApplications}
                disabled={refreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
                />
                Refresh
              </Button>
            </motion.div>
          </IndustrialHeader>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            variants={itemVariants}
          >
            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <IndustrialIcon
                    icon="factory"
                    size="sm"
                    className="text-industrial-muted-foreground"
                  />
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Total Applied
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {stats.total}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>

            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-industrial-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Pending
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {stats.pending}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>

            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-industrial-safety-500" />
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Approved
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {stats.approved}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>

            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Rejected
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {stats.rejected}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>

          {/* Applications List */}
          <motion.div variants={itemVariants}>
            {applications.length === 0 ? (
              <IndustrialCard>
                <IndustrialCardContent className="flex flex-col items-center justify-center py-16">
                  <IndustrialIcon
                    icon="factory"
                    size="xl"
                    className="mb-4 text-industrial-muted-foreground"
                  />
                  <h3 className="text-lg font-semibold mb-2 text-industrial-foreground">
                    No Applications Found
                  </h3>
                  <p className="text-industrial-muted-foreground text-center">
                    You haven't applied to any gigs yet. Start browsing
                    available gigs to apply.
                  </p>
                  <Button
                    variant="industrial-accent"
                    className="mt-4"
                    onClick={() => (window.location.href = '/gigs')}
                  >
                    <HardHat className="mr-2 h-4 w-4" />
                    Browse Gigs
                  </Button>
                </IndustrialCardContent>
              </IndustrialCard>
            ) : (
              <IndustrialCard>
                <IndustrialCardHeader>
                  <IndustrialCardTitle className="flex items-center gap-2">
                    <IndustrialIcon icon="cog" size="sm" />
                    Your Applications
                  </IndustrialCardTitle>
                  <IndustrialCardDescription>
                    A detailed view of all your gig applications
                  </IndustrialCardDescription>
                </IndustrialCardHeader>
                <IndustrialCardContent>
                  {' '}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-industrial-border">
                          <TableHead className="text-industrial-foreground">
                            Gig Title
                          </TableHead>
                          <TableHead className="text-industrial-foreground">
                            Company
                          </TableHead>
                          <TableHead className="text-industrial-foreground">
                            Location
                          </TableHead>
                          <TableHead className="text-industrial-foreground">
                            Salary
                          </TableHead>
                          <TableHead className="text-industrial-foreground">
                            Applied On
                          </TableHead>
                          <TableHead className="text-industrial-foreground">
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((application: GigApplication) => (
                          <TableRow
                            key={application.id}
                            className="border-industrial-border hover:bg-industrial-muted/50"
                          >
                            <TableCell className="font-medium text-industrial-foreground">
                              {application.gig?.title || 'Unknown'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Building2 className="h-4 w-4 text-industrial-muted-foreground" />
                                <span className="text-industrial-foreground">
                                  {application.gig?.company || 'Unknown'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-industrial-muted-foreground" />
                                <span className="text-industrial-foreground">
                                  {application.gig?.location || 'Unknown'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-industrial-muted-foreground" />
                                <span className="text-industrial-foreground">
                                  $
                                  {application.gig?.salary?.toLocaleString() ||
                                    'N/A'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-industrial-muted-foreground" />
                                <span className="text-industrial-foreground">
                                  {new Date(
                                    application.appliedAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {getStatusBadge(application.status)}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {/* Mobile View */}
                  <div className="md:hidden space-y-4">
                    {applications.map((application: GigApplication) => (
                      <motion.div
                        key={application.id}
                        className="border border-industrial-border rounded-lg p-4 space-y-3 bg-industrial-background"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-industrial-foreground">
                              {application.gig?.title || 'Unknown'}
                            </h3>
                            <p className="text-sm text-industrial-muted-foreground flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {application.gig?.company || 'Unknown'}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(application.status)}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-industrial-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {application.gig?.location || 'Unknown'}
                          </div>
                          <div className="flex items-center gap-1 text-industrial-muted-foreground">
                            <DollarSign className="h-3 w-3" />$
                            {application.gig?.salary?.toLocaleString() || 'N/A'}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-industrial-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Applied:{' '}
                          {new Date(application.appliedAt).toLocaleDateString()}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>
            )}
          </motion.div>
        </motion.div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
}
