'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  IndustrialCard,
  IndustrialCardContent,
  IndustrialCardHeader,
  IndustrialCardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IndustrialInput } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  IndustrialLayout,
  IndustrialContainer,
  IndustrialHeader,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { useAuthStore } from '@/lib/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { useGigsStore } from '@/lib/store';
import { useGigOperations } from '@/hooks/useApiIntegration';
import { Gig } from '@/lib/types';
import {
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Search,
  Filter,
  Building,
  Clock,
  Loader2,
  Wrench,
  Cog,
  Factory,
  HardHat,
} from 'lucide-react';

export default function GigsPage() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();

  // Store data
  const { gigs, isLoading: loading, fetchGigs } = useGigsStore();
  const { handleApplyToGig } = useGigOperations();

  // Local state for filters and UI
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [applyingTo, setApplyingTo] = useState<string | null>(null);

  // Fetch gigs on component mount
  useEffect(() => {
    fetchGigs();
  }, [fetchGigs]);

  const handleGigApplication = async (gigId: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to apply for gigs.',
        variant: 'destructive',
      });
      router.push('/signin');
      return;
    }

    if (user.userType !== 'worker') {
      toast({
        title: 'Access Denied',
        description: 'Only workers can apply for gigs.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setApplyingTo(gigId);
      await handleApplyToGig(gigId, 'Interested in this position!');
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error.response?.data?.message ||
          'Failed to apply for the gig. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setApplyingTo(null);
    }
  };

  // Ensure gigs is an array before filtering
  const safeGigs = Array.isArray(gigs) ? gigs : [];
  const filteredGigs = safeGigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === 'all' ||
      gig.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesJobType =
      jobTypeFilter === 'all' || gig.jobType === jobTypeFilter;

    return matchesSearch && matchesLocation && matchesJobType;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <IndustrialLayout>
        <IndustrialContainer>
          <div className="space-y-6 mt-20">
            {/* Header Skeleton */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
                <Skeleton className="h-8 w-64 bg-gray-200" />
              </div>
              <Skeleton className="h-4 w-96 bg-gray-200" />
            </div>

            {/* Filters Skeleton */}
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 flex-1 bg-gray-200" />
              <Skeleton className="h-10 w-48 bg-gray-200" />
              <Skeleton className="h-10 w-48 bg-gray-200" />
            </div>

            {/* Results Count Skeleton */}
            <Skeleton className="h-4 w-32 bg-gray-200" />

            {/* Gigs Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <IndustrialCard
                  key={i}
                  className="h-full flex flex-col border-gray-200"
                >
                  <IndustrialCardHeader>
                    <div className="flex justify-between items-start gap-2">
                      <Skeleton className="h-6 w-3/4 bg-gray-200" />
                      <Skeleton className="h-6 w-16 bg-gray-200 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Skeleton className="h-4 w-4 bg-gray-200 rounded" />
                      <Skeleton className="h-4 w-1/2 bg-gray-200" />
                    </div>
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="space-y-4 flex-1 flex flex-col">
                    <Skeleton className="h-12 w-full bg-gray-200" />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 bg-gray-200 rounded" />
                        <Skeleton className="h-4 w-2/3 bg-gray-200" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 bg-gray-200 rounded" />
                        <Skeleton className="h-4 w-1/2 bg-gray-200" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 bg-gray-200 rounded" />
                        <Skeleton className="h-4 w-3/4 bg-gray-200" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 bg-gray-200" />
                      <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-5 w-16 bg-gray-200 rounded-full" />
                        <Skeleton className="h-5 w-20 bg-gray-200 rounded-full" />
                        <Skeleton className="h-5 w-14 bg-gray-200 rounded-full" />
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Skeleton className="h-10 w-full bg-gray-200" />
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

  return (
    <IndustrialLayout>
      <IndustrialContainer>
        <div className="space-y-6 mt-16">
          {/* Header */}
          <IndustrialHeader>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3">
                <IndustrialIcon icon="wrench" size="lg" />
                <h1 className="text-3xl font-bold text-industrial-gunmetal-800">
                  Available Gigs
                </h1>
              </div>
              <p className="text-industrial-gunmetal-600">
                Discover and apply for exciting job opportunities that match
                your industrial skills and expertise.
              </p>
            </motion.div>
          </IndustrialHeader>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-industrial-muted-foreground h-4 w-4" />
              <IndustrialInput
                placeholder="Search gigs by title, description, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48 border-industrial-border bg-white text-industrial-gunmetal-800">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-industrial-gunmetal-500" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-industrial-border shadow-lg">
                <SelectItem
                  value="all"
                  className="text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50"
                >
                  All Locations
                </SelectItem>
                <SelectItem
                  value="remote"
                  className="text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50"
                >
                  Remote
                </SelectItem>
                <SelectItem
                  value="new york"
                  className="text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50"
                >
                  New York
                </SelectItem>
                <SelectItem
                  value="san francisco"
                  className="text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50"
                >
                  San Francisco
                </SelectItem>
                <SelectItem
                  value="london"
                  className="text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50"
                >
                  London
                </SelectItem>
                <SelectItem
                  value="berlin"
                  className="text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50"
                >
                  Berlin
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger className="w-full md:w-48 border-industrial-border bg-white text-industrial-gunmetal-800">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-industrial-gunmetal-500" />
                  <SelectValue placeholder="Job Type" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-industrial-border shadow-lg">
                <SelectItem
                  value="all"
                  className="text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50"
                >
                  All Types
                </SelectItem>
                <SelectItem
                  value="full-time"
                  className="text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50"
                >
                  Full Time
                </SelectItem>
                <SelectItem
                  value="part-time"
                  className="text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50"
                >
                  Part Time
                </SelectItem>
                <SelectItem
                  value="contract"
                  className="text-industrial-gunmetal-800 hover:bg-industrial-gunmetal-50 focus:bg-industrial-gunmetal-50"
                >
                  Contract
                </SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-industrial-muted-foreground">
              Showing {filteredGigs.length} of {safeGigs.length} gigs
            </p>
          </motion.div>

          {/* Gigs Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredGigs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <IndustrialIcon
                  icon="factory"
                  size="xl"
                  className="mx-auto mb-4 text-industrial-gunmetal-400"
                />
                <h3 className="text-lg font-semibold text-industrial-gunmetal-800 mb-2">
                  No gigs found
                </h3>
                <p className="text-industrial-gunmetal-600">
                  Try adjusting your search criteria or check back later for new
                  opportunities.
                </p>
              </div>
            ) : (
              filteredGigs.map((gig, index) => (
                <motion.div key={gig._id} variants={cardVariants}>
                  <IndustrialCard className="h-full hover:shadow-industrial-lg transition-all duration-200 hover:border-industrial-accent/50">
                    <IndustrialCardHeader>
                      <div className="flex justify-between items-start gap-2">
                        <IndustrialCardTitle className="text-lg line-clamp-2">
                          {gig.title}
                        </IndustrialCardTitle>
                        <Badge variant="industrial-secondary">
                          {gig.jobType}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-industrial-muted-foreground">
                        <Building className="h-4 w-4" />
                        {gig.company}
                      </div>
                    </IndustrialCardHeader>

                    <IndustrialCardContent className="space-y-4">
                      <p className="text-sm text-industrial-muted-foreground line-clamp-3">
                        {gig.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-industrial-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {gig.location}
                        </div>

                        {gig.salary && (
                          <div className="flex items-center gap-2 text-sm text-industrial-muted-foreground">
                            <DollarSign className="h-4 w-4" />$
                            {gig.salary.toLocaleString()}/year
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm text-industrial-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Posted {new Date(gig.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      {gig.requiredSkills && gig.requiredSkills.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-industrial-foreground">
                            Required Skills:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {gig.requiredSkills.slice(0, 3).map((skill) => (
                              <Badge
                                key={skill}
                                variant="industrial-outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {gig.requiredSkills.length > 3 && (
                              <Badge
                                variant="industrial-outline"
                                className="text-xs"
                              >
                                +{gig.requiredSkills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <Button
                        variant="industrial-accent"
                        className="w-full"
                        onClick={() => handleGigApplication(gig._id)}
                        disabled={
                          applyingTo === gig._id || user?.userType !== 'worker'
                        }
                      >
                        {applyingTo === gig._id ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Applying...
                          </>
                        ) : (
                          <>
                            <HardHat className="mr-2 h-4 w-4" />
                            Apply Now
                          </>
                        )}
                      </Button>
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
}
