'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
import { IndustrialInput } from '@/components/ui/input';
import {
  Select,
  SelectGroup,
  SelectValue,
  IndustrialSelectTrigger,
  IndustrialSelectContent,
  IndustrialSelectItem,
  IndustrialSelectLabel,
} from '@/components/ui/industrial-select';
import {
  IndustrialLayout,
  IndustrialContainer,
  IndustrialHeader,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore, useMachinesStore } from '@/lib/store';
import { Machine, UserType } from '@/lib/types';
import withAuth from '@/components/auth/withAuth';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Wrench,
  Building2,
  DollarSign,
  Clock,
  Loader2,
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

const WorkerMachinesPage = () => {
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all-locations');
  const [typeFilter, setTypeFilter] = useState('all-types');
  const [availabilityFilter, setAvailabilityFilter] = useState('all-machines');

  const { toast } = useToast();
  const { user } = useAuthStore();

  // Store data with safe destructuring
  const machinesStore = useMachinesStore();
  const isLoading = machinesStore?.isLoading || false;
  const isApplying = machinesStore?.isApplying || false;

  // Use useMemo to prevent recreation on each render
  const machines = useMemo(() => {
    return machinesStore?.machines || [];
  }, [machinesStore?.machines]);

  const applyToMachine = useMemo(() => {
    return machinesStore?.applyToMachine || (() => Promise.resolve());
  }, [machinesStore?.applyToMachine]);

  const fetchMachines = useMemo(() => {
    return machinesStore?.fetchMachines || (() => Promise.resolve());
  }, [machinesStore?.fetchMachines]);

  // Fetch machines on component mount
  useEffect(() => {
    if (fetchMachines) {
      fetchMachines();
    }
  }, [fetchMachines]);
  // Filter machines based on search and filter criteria
  useEffect(() => {
    // Since machines is now memoized, we don't need the additional check
    // but we'll keep a defensive approach
    const safeMachines = Array.isArray(machines) ? machines : [];
    let filtered = [...safeMachines]; // Create a copy to avoid mutation

    if (searchTerm) {
      filtered = filtered.filter(
        (machine) =>
          machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          machine.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          machine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Only apply location filter if it's not the "all-locations" option
    if (locationFilter && locationFilter !== 'all-locations') {
      filtered = filtered.filter((machine) =>
        machine.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Only apply type filter if it's not the "all-types" option
    if (typeFilter && typeFilter !== 'all-types') {
      filtered = filtered.filter(
        (machine) => machine.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    // Only apply availability filter if it's not the "all-machines" option
    if (availabilityFilter && availabilityFilter !== 'all-machines') {
      if (availabilityFilter === 'available') {
        filtered = filtered.filter((machine) => machine.isAvailable);
      } else if (availabilityFilter === 'unavailable') {
        filtered = filtered.filter((machine) => !machine.isAvailable);
      }
    }

    setFilteredMachines(filtered);
  }, [machines, searchTerm, locationFilter, typeFilter, availabilityFilter]);
  // Create unique location and type lists with memoization
  const uniqueLocations = useMemo(() => {
    // Ensure machines is an array before using map
    const safeArray = Array.isArray(machines) ? machines : [];
    return [
      ...new Set(safeArray.map((machine) => machine?.location).filter(Boolean)),
    ];
  }, [machines]);

  const uniqueTypes = useMemo(() => {
    // Ensure machines is an array before using map
    const safeArray = Array.isArray(machines) ? machines : [];
    return [
      ...new Set(safeArray.map((machine) => machine?.type).filter(Boolean)),
    ];
  }, [machines]);
  // Handle apply to machine
  const handleApplyToMachine = async (
    machineId: string,
    userType: 'worker' | 'startup'
  ) => {
    if (!user?.id) {
      toast({
        title: 'Error',
        description: 'You must be logged in to apply to machines.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Pass user data as applicationData object
      await applyToMachine(machineId, {
        applicantId: user.id,
        userType: userType,
        message: `Application from ${user.name || user.email}`,
      });
      toast({
        title: 'Success',
        description: 'Successfully applied to machine!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to apply to machine. Please try again.',
        variant: 'destructive',
      });
    }
  };
  if (isLoading) {
    return (
      <IndustrialLayout>
        <IndustrialContainer className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-md" />
              <div>
                <Skeleton className="h-6 sm:h-7 md:h-8 w-32 sm:w-40 md:w-48 mb-1 sm:mb-2" />
                <Skeleton className="h-3 sm:h-3.5 md:h-4 w-40 sm:w-56 md:w-64" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 sm:h-9 md:h-10" />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <IndustrialCard key={i} variant="industrial">
                  <IndustrialCardHeader className="p-3 sm:p-4">
                    <Skeleton className="h-4 sm:h-5 w-24 sm:w-32" />
                    <Skeleton className="h-3 sm:h-4 w-32 sm:w-48" />
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="p-3 sm:p-4">
                    <div className="space-y-2 sm:space-y-4">
                      <Skeleton className="h-3 sm:h-4 w-full" />
                      <Skeleton className="h-3 sm:h-4 w-3/4" />
                      <Skeleton className="h-8 sm:h-10 w-full" />
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
      <IndustrialContainer className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
        <IndustrialHeader className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 aspect-square bg-gradient-to-br from-industrial-accent/20 to-industrial-accent/10 rounded-md border border-industrial-accent/30 flex items-center justify-center">
              <IndustrialIcon
                icon="wrench"
                size="sm"
                animated
                className="text-industrial-accent h-5 w-5 sm:h-6 sm:w-6"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                Available Machines
              </h1>
              <p className="text-xs sm:text-sm text-industrial-secondary">
                Browse and apply to use machines from manufacturers
              </p>
            </div>
          </div>
        </IndustrialHeader>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Filters */}
          <motion.div variants={itemVariants}>
            <IndustrialCard variant="industrial">
              <IndustrialCardHeader className="p-3 sm:p-4 md:p-6 pb-2 sm:pb-3">
                <IndustrialCardTitle className="flex items-center gap-2">
                  <div className="p-1.5 bg-industrial-gunmetal-200/50 rounded-md flex items-center justify-center">
                    <IndustrialIcon
                      icon="gear"
                      size="sm"
                      className="h-4 w-4 text-industrial-gunmetal-700"
                    />
                  </div>
                  <span className="text-base sm:text-lg">Filters</span>
                </IndustrialCardTitle>
              </IndustrialCardHeader>

              <IndustrialCardContent className="p-3 sm:p-4 md:p-6 pt-2 sm:pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-industrial-secondary" />
                      <IndustrialInput
                        placeholder="Search machines..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSearchTerm(e.target.value)
                        }
                        className="pl-10"
                        variant="industrial"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <Select
                        value={locationFilter}
                        onValueChange={setLocationFilter}
                      >
                        <IndustrialSelectTrigger variant="industrial">
                          <SelectValue placeholder="Filter by location" />
                        </IndustrialSelectTrigger>
                        <IndustrialSelectContent variant="industrial">
                          <IndustrialSelectItem
                            value="all-locations"
                            variant="industrial"
                          >
                            All Locations
                          </IndustrialSelectItem>
                          {uniqueLocations.map((location) => (
                            <IndustrialSelectItem
                              key={location}
                              value={location}
                              variant="industrial"
                            >
                              {location}
                            </IndustrialSelectItem>
                          ))}
                        </IndustrialSelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Machine Type</label>
                    <div className="relative">
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <IndustrialSelectTrigger variant="industrial">
                          <SelectValue placeholder="Filter by type" />
                        </IndustrialSelectTrigger>
                        <IndustrialSelectContent variant="industrial">
                          <IndustrialSelectItem
                            value="all-types"
                            variant="industrial"
                          >
                            All Types
                          </IndustrialSelectItem>
                          {uniqueTypes.map((type) => (
                            <IndustrialSelectItem
                              key={type}
                              value={type}
                              variant="industrial"
                            >
                              {type}
                            </IndustrialSelectItem>
                          ))}
                        </IndustrialSelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Availability</label>
                    <div className="relative">
                      <Select
                        value={availabilityFilter}
                        onValueChange={setAvailabilityFilter}
                      >
                        <IndustrialSelectTrigger variant="industrial">
                          <SelectValue placeholder="Filter by availability" />
                        </IndustrialSelectTrigger>
                        <IndustrialSelectContent variant="industrial">
                          <IndustrialSelectItem
                            value="all-machines"
                            variant="industrial"
                          >
                            All Machines
                          </IndustrialSelectItem>
                          <IndustrialSelectItem
                            value="available"
                            variant="industrial"
                          >
                            Available
                          </IndustrialSelectItem>
                          <IndustrialSelectItem
                            value="unavailable"
                            variant="industrial"
                          >
                            Unavailable
                          </IndustrialSelectItem>
                        </IndustrialSelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>

          {/* Results Count */}
          <motion.div variants={itemVariants}>
            <p className="text-xs sm:text-sm text-industrial-secondary font-industrial-body my-2 sm:my-3 md:my-4">
              Showing {filteredMachines?.length || 0} of {machines?.length || 0}{' '}
              machines
            </p>
          </motion.div>

          {/* Machines Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
            variants={containerVariants}
          >
            {!filteredMachines || filteredMachines.length === 0 ? (
              <motion.div className="col-span-full" variants={itemVariants}>
                <IndustrialCard variant="industrial">
                  <IndustrialCardContent className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16">
                    <IndustrialIcon
                      icon="wrench"
                      size="lg"
                      className="mb-3 sm:mb-4 text-industrial-secondary h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                    />
                    <h3 className="text-base sm:text-lg font-semibold font-industrial-body mb-2">
                      No Machines Found
                    </h3>
                    <p className="text-xs sm:text-sm text-industrial-secondary text-center max-w-xs">
                      {searchTerm ||
                      locationFilter ||
                      typeFilter ||
                      availabilityFilter
                        ? 'Try adjusting your filters to see more results.'
                        : 'No machines are currently available.'}
                    </p>
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>
            ) : (
              (filteredMachines || []).map((machine) => (
                <motion.div
                  key={machine.id}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <IndustrialCard
                    variant="industrial"
                    className="h-full flex flex-col"
                  >
                    <IndustrialCardHeader className="p-3 sm:p-4 md:p-6 pb-2 sm:pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <IndustrialCardTitle className="text-base sm:text-lg text-industrial-gunmetal-800">
                            {machine.name}
                          </IndustrialCardTitle>
                          <IndustrialCardDescription className="flex items-center gap-1 mt-1 text-xs sm:text-sm">
                            <Building2 className="h-3 w-3" />
                            {machine.manufacturer}
                          </IndustrialCardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-1 sm:gap-2">
                          {machine.isAvailable ? (
                            <Badge
                              variant="industrial-success"
                              className="flex items-center gap-1 text-xs py-0.5 px-1.5 sm:px-2"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Available
                            </Badge>
                          ) : (
                            <Badge
                              variant="industrial-danger"
                              className="flex items-center gap-1 text-xs py-0.5 px-1.5 sm:px-2"
                            >
                              <XCircle className="h-3 w-3" />
                              Unavailable
                            </Badge>
                          )}
                        </div>
                      </div>
                    </IndustrialCardHeader>

                    <IndustrialCardContent className="flex-1 flex flex-col p-3 sm:p-4 md:p-6 pt-2 sm:pt-3">
                      <div className="space-y-2 sm:space-y-3 flex-1">
                        <p className="text-xs sm:text-sm text-industrial-secondary line-clamp-2 sm:line-clamp-3">
                          {machine.description}
                        </p>

                        <div className="space-y-1.5 sm:space-y-2">
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                            <IndustrialIcon
                              icon="wrench"
                              size="sm"
                              className="text-industrial-secondary h-3.5 w-3.5"
                            />
                            <span className="font-medium">Type:</span>
                            <Badge
                              variant="industrial-outline"
                              className="text-xs py-0.5 px-1.5"
                            >
                              {machine.type}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-industrial-secondary">
                            <MapPin className="h-3.5 w-3.5" />
                            {machine.location}
                          </div>

                          {machine.pricePerHour && (
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-industrial-secondary">
                              <DollarSign className="h-3.5 w-3.5" />$
                              {machine.pricePerHour}/hour
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-industrial-secondary">
                            <Calendar className="h-3.5 w-3.5" />
                            Listed:{' '}
                            {new Date(machine.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-industrial-gunmetal-200">
                        {machine.hasApplied ? (
                          <Button
                            disabled
                            className="w-full bg-industrial-navy-100 text-industrial-navy-600 border border-industrial-navy-300 text-xs sm:text-sm h-8 sm:h-9"
                          >
                            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                            Application Pending
                          </Button>
                        ) : (
                          <Button
                            variant="industrial-accent"
                            onClick={() =>
                              handleApplyToMachine(machine.id, 'worker')
                            }
                            disabled={!machine.isAvailable || isApplying}
                            className="w-full text-xs sm:text-sm h-8 sm:h-9"
                          >
                            {isApplying ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 animate-spin" />
                                Applying...
                              </>
                            ) : (
                              <>
                                <Wrench className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                                Apply to Use
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
};

export default withAuth(WorkerMachinesPage, {
  allowedUserTypes: [UserType.WORKER],
});
