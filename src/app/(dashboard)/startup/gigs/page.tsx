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
import api from '@/lib/api';
import withAuth from '@/components/auth/withAuth';
import { UserType, Gig } from '@/lib/types';
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
  AlertTriangle,
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

const getStatusBadge = (isActive: boolean, applicationCount: number = 0) => {
  if (isActive) {
    return (
      <Badge
        variant="industrial-secondary"
        className="bg-green-100 text-green-800 hover:bg-green-100"
      >
        <CheckCircle className="h-3 w-3 mr-1" />
        Active
      </Badge>
    );
  } else {
    return (
      <Badge
        variant="industrial-outline"
        className="bg-gray-100 text-gray-800 hover:bg-gray-100"
      >
        <XCircle className="h-3 w-3 mr-1" />
        Inactive
      </Badge>
    );
  }
};

function StartupGigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { toast } = useToast();
  const { user } = useAuthStore();
  const router = useRouter();

  const fetchGigs = async () => {
    try {
      const response = await api.get('/gigs/my-gigs');
      setGigs(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch your gigs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGig = async (gigId: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this gig? This action cannot be undone.'
      )
    ) {
      return;
    }

    setDeletingId(gigId);
    try {
      await api.delete(`/gigs/${gigId}`);
      setGigs((prev) => prev.filter((gig) => gig.id !== gigId));
      toast({
        title: 'Success',
        description: 'Gig deleted successfully',
      });
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
      await api.patch(`/gigs/${gigId}/toggle-status`);
      setGigs((prev) =>
        prev.map((gig) =>
          gig.id === gigId ? { ...gig, isActive: !currentStatus } : gig
        )
      );
      toast({
        title: 'Success',
        description: `Gig ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to update gig status',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);
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
    total: gigs.length,
    active: gigs.filter((gig) => gig.isActive).length,
    totalApplications: gigs.reduce(
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
          {/* Header */}
          <motion.div
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3">
              <IndustrialIcon icon="factory" size="lg" color="accent" />
              <div>
                <IndustrialHeader level={1}>Your Gigs</IndustrialHeader>
                <p className="text-industrial-muted-foreground">
                  Manage your job postings and track applications
                </p>
              </div>
            </div>
            <Button asChild variant="industrial-accent">
              <Link href="/startup/create-gig">
                <Plus className="h-4 w-4 mr-2" />
                Create New Gig
              </Link>
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={itemVariants}
          >
            {' '}
            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-industrial-accent" />
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Total Gigs
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {stats.total}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>{' '}
            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Active Gigs
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {stats.active}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>{' '}
            <IndustrialCard>
              <IndustrialCardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-industrial-muted-foreground">
                      Total Applications
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {stats.totalApplications}
                    </p>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>

          {/* Gigs List */}
          <motion.div variants={itemVariants}>
            {gigs.length === 0 ? (
              <IndustrialCard>
                <IndustrialCardContent className="flex flex-col items-center justify-center py-16">
                  <Eye className="h-12 w-12 text-industrial-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-industrial-foreground">
                    No Gigs Created
                  </h3>
                  <p className="text-industrial-muted-foreground text-center mb-4">
                    You haven't created any gigs yet. Start by posting your
                    first job opportunity.
                  </p>
                  <Button asChild variant="industrial-accent">
                    <Link href="/startup/create-gig">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Gig
                    </Link>
                  </Button>
                </IndustrialCardContent>
              </IndustrialCard>
            ) : (
              <IndustrialCard>
                <IndustrialCardHeader>
                  <IndustrialCardTitle className="flex items-center gap-2">
                    <IndustrialIcon icon="gear" size="md" color="primary" />
                    All Gigs
                  </IndustrialCardTitle>
                  <IndustrialCardDescription>
                    Manage your job postings
                  </IndustrialCardDescription>
                </IndustrialCardHeader>
                <IndustrialCardContent>
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-industrial-border">
                          <TableHead className="text-industrial-foreground">
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
                        {gigs.map((gig) => (
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
                                  {new Date(gig.createdAt).toLocaleDateString()}
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
                                    router.push(`/startup/gigs/${gig.id}/edit`)
                                  }
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="industrial-outline"
                                  size="sm"
                                  onClick={() => handleDeleteGig(gig.id)}
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
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden space-y-4">
                    {gigs.map((gig) => (
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
                            onClick={() => handleDeleteGig(gig.id)}
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

export default withAuth(StartupGigsPage, {
  allowedUserTypes: [UserType.STARTUP],
});
