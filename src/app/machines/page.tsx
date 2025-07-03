'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  IndustrialLayout,
  IndustrialContainer,
  IndustrialHeader,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/lib/store/authStore';
import { useMachinesStore } from '@/lib/store';
import { Machine, UserType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Loader2,
  Building2,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
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
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export default function MachinesPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  const {
    machines: rawMachines,
    isLoading: loading,
    isApplying,
    fetchMachines,
    applyToMachine,
  } = useMachinesStore();

  // Defensive array check with useMemo
  const machines = useMemo(
    () => (Array.isArray(rawMachines) ? rawMachines : []),
    [rawMachines]
  );

  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [applyingToMachine, setApplyingToMachine] = useState<string | null>(
    null
  );
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);

  useEffect(() => {
    fetchMachines();
  }, [fetchMachines]);

  useEffect(() => {
    let filtered = Array.isArray(machines) ? [...machines] : [];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (machine) =>
          machine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          machine.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          machine.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter((machine) =>
        machine.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((machine) =>
        machine.type?.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    // Availability filter
    if (availabilityFilter === 'available') {
      filtered = filtered.filter(
        (machine) => machine.availability || machine.isAvailable
      );
    } else if (availabilityFilter === 'unavailable') {
      filtered = filtered.filter(
        (machine) => !(machine.availability || machine.isAvailable)
      );
    }

    setFilteredMachines(filtered);
  }, [machines, searchTerm, locationFilter, typeFilter, availabilityFilter]);

  const handleApplyToMachine = async (machine: Machine) => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to apply for machines.',
        variant: 'destructive',
      });
      router.push('/signin');
      return;
    }

    setApplyingToMachine(machine._id || machine.id);
    try {
      await applyToMachine(machine._id || machine.id);
      toast({
        title: 'Application Submitted',
        description: `Your application for "${machine.name}" has been submitted successfully!`,
      });
    } catch (error: any) {
      toast({
        title: 'Application Failed',
        description:
          error.response?.data?.message || 'Failed to apply for machine',
        variant: 'destructive',
      });
    } finally {
      setApplyingToMachine(null);
    }
  };

  const openApplicationDialog = (machine: Machine) => {
    setSelectedMachine(machine);
    setApplicationDialogOpen(true);
  };

  const confirmApplication = () => {
    if (selectedMachine) {
      handleApplyToMachine(selectedMachine);
    }
    setApplicationDialogOpen(false);
    setSelectedMachine(null);
  };

  // Get unique values for filters
  const locations = Array.isArray(machines)
    ? Array.from(
        new Set(
          machines
            .map((m) => m.location)
            .filter(
              (location) =>
                location && typeof location === 'string' && location.trim()
            )
        )
      )
    : [];

  const types = Array.isArray(machines)
    ? Array.from(
        new Set(
          machines
            .map((m) => m.type)
            .filter((type) => type && typeof type === 'string' && type.trim())
        )
      )
    : [];

  if (loading) {
    return (
      <IndustrialLayout>
        <IndustrialContainer>
          <div className="space-y-6 mt-16">
            {/* Header Skeleton */}
            <div className="flex items-center space-x-4 mb-8">
              <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
              <div>
                <Skeleton className="h-8 w-48 bg-gray-200 mb-2" />
                <Skeleton className="h-4 w-80 bg-gray-200" />
              </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <IndustrialCard key={i} className="border-gray-200">
                  <IndustrialCardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-4 w-24 bg-gray-200 mb-2" />
                        <Skeleton className="h-6 w-8 bg-gray-200" />
                      </div>
                      <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
                    </div>
                  </IndustrialCardContent>
                </IndustrialCard>
              ))}
            </div>

            {/* Search and Filters Skeleton */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Skeleton className="h-10 flex-1 bg-gray-200" />
              <Skeleton className="h-10 w-[140px] bg-gray-200" />
              <Skeleton className="h-10 w-[140px] bg-gray-200" />
              <Skeleton className="h-10 w-[140px] bg-gray-200" />
            </div>

            {/* Machines Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, index) => (
                <IndustrialCard
                  key={index}
                  className="h-full flex flex-col border-gray-200"
                >
                  <IndustrialCardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <Skeleton className="h-6 w-3/4 bg-gray-200 mb-2" />
                        <div className="flex items-center gap-1">
                          <Skeleton className="h-4 w-4 bg-gray-200 rounded" />
                          <Skeleton className="h-4 w-1/2 bg-gray-200" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-16 bg-gray-200 rounded-full" />
                    </div>
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="space-y-4 flex-1 flex flex-col">
                    <Skeleton className="h-12 w-full bg-gray-200" />

                    <div className="grid grid-cols-1 gap-3 flex-1">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 bg-gray-200 rounded" />
                        <Skeleton className="h-4 w-3/4 bg-gray-200" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 bg-gray-200 rounded" />
                        <Skeleton className="h-4 w-1/2 bg-gray-200" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 bg-gray-200 rounded" />
                        <Skeleton className="h-4 w-2/3 bg-gray-200" />
                      </div>
                    </div>

                    <div className="pt-4 mt-auto">
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 mt-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-4 mb-8">
              <IndustrialIcon icon="gear" size="lg" />
              <div>
                <IndustrialHeader level={1}>Browse Machines</IndustrialHeader>
                <p className="text-industrial-gunmetal-600 mt-2">
                  Discover and apply for industrial equipment
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <IndustrialCard className="border-industrial-primary/20">
              <IndustrialCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-industrial-muted-foreground">
                      Total Machines
                    </p>
                    <p className="text-2xl font-bold text-industrial-foreground">
                      {machines.length}
                    </p>
                  </div>
                  <IndustrialIcon
                    icon="gear"
                    className="text-industrial-primary"
                  />
                </div>
              </IndustrialCardContent>
            </IndustrialCard>

            <IndustrialCard className="border-industrial-accent/20">
              <IndustrialCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-industrial-muted-foreground">
                      Available
                    </p>
                    <p className="text-2xl font-bold text-industrial-accent">
                      {Array.isArray(machines)
                        ? machines.filter(
                            (m) => m.availability || m.isAvailable
                          ).length
                        : 0}
                    </p>
                  </div>
                  <IndustrialIcon
                    icon="gear"
                    className="text-industrial-accent"
                  />
                </div>
              </IndustrialCardContent>
            </IndustrialCard>

            <IndustrialCard className="border-red-500/20">
              <IndustrialCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-industrial-muted-foreground">
                      In Use
                    </p>
                    <p className="text-2xl font-bold text-red-500">
                      {Array.isArray(machines)
                        ? machines.filter(
                            (m) => !(m.availability || m.isAvailable)
                          ).length
                        : 0}
                    </p>
                  </div>
                  <IndustrialIcon icon="gear" className="text-red-500" />
                </div>
              </IndustrialCardContent>
            </IndustrialCard>

            <IndustrialCard className="border-industrial-secondary/20">
              <IndustrialCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-industrial-muted-foreground">
                      Machine Types
                    </p>
                    <p className="text-2xl font-bold text-industrial-secondary">
                      {types.length}
                    </p>
                  </div>
                  <IndustrialIcon
                    icon="gear"
                    className="text-industrial-secondary"
                  />
                </div>
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
          >
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-industrial-muted-foreground" />
                <IndustrialInput
                  placeholder="Search machines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Select
                  value={locationFilter}
                  onValueChange={setLocationFilter}
                >
                  <SelectTrigger className="w-[140px] bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg">
                    <SelectItem
                      value="all"
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      All Locations
                    </SelectItem>
                    {Array.isArray(locations) &&
                      locations
                        .filter((location) => location && location.trim())
                        .map((location) => (
                          <SelectItem
                            key={location}
                            value={location.toLowerCase().trim()}
                            className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                          >
                            {location}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px] bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg">
                    <SelectItem
                      value="all"
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      All Types
                    </SelectItem>
                    {Array.isArray(types) &&
                      types
                        .filter((type) => type && type.trim())
                        .map((type) => (
                          <SelectItem
                            key={type}
                            value={type.toLowerCase().trim()}
                            className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                          >
                            {type}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>

                <Select
                  value={availabilityFilter}
                  onValueChange={setAvailabilityFilter}
                >
                  <SelectTrigger className="w-[140px] bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg">
                    <SelectItem
                      value="all"
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      All Status
                    </SelectItem>
                    <SelectItem
                      value="available"
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      Available
                    </SelectItem>
                    <SelectItem
                      value="unavailable"
                      className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      In Use
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Machines Grid */}
          <motion.div variants={itemVariants}>
            {filteredMachines.length === 0 ? (
              <IndustrialCard className="text-center py-12">
                <IndustrialCardContent>
                  <div className="flex flex-col items-center space-y-4">
                    <IndustrialIcon
                      icon="gear"
                      size="lg"
                      className="text-industrial-muted-foreground"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-industrial-foreground mb-2">
                        {machines.length === 0
                          ? 'No machines available'
                          : 'No matches found'}
                      </h3>
                      <p className="text-industrial-muted-foreground">
                        {machines.length === 0
                          ? 'Check back later for available industrial equipment'
                          : 'Try adjusting your search or filter criteria'}
                      </p>
                    </div>
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.isArray(filteredMachines) &&
                    filteredMachines.map((machine) => (
                      <motion.div
                        key={machine._id || machine.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                      >
                        <IndustrialCard className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 bg-gradient-to-br from-industrial-background to-industrial-muted/5 opacity-50" />
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-industrial-primary/10 to-transparent" />

                          <div className="relative flex-1 flex flex-col">
                            <IndustrialCardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <IndustrialCardTitle className="text-lg group-hover:text-industrial-primary transition-colors">
                                    {machine.name}
                                  </IndustrialCardTitle>
                                  <IndustrialCardDescription className="flex items-center gap-1 mt-1">
                                    <IndustrialIcon icon="gear" size="sm" />
                                    {machine.type}
                                  </IndustrialCardDescription>
                                </div>
                                <Badge
                                  variant={
                                    machine.availability || machine.isAvailable
                                      ? 'default'
                                      : 'secondary'
                                  }
                                  className={
                                    machine.availability || machine.isAvailable
                                      ? 'bg-industrial-accent text-industrial-background'
                                      : 'bg-industrial-muted text-industrial-muted-foreground'
                                  }
                                >
                                  {machine.availability || machine.isAvailable
                                    ? 'Available'
                                    : 'In Use'}
                                </Badge>
                              </div>
                            </IndustrialCardHeader>

                            <IndustrialCardContent className="space-y-4 flex-1 flex flex-col">
                              <p className="text-sm text-industrial-muted-foreground line-clamp-3">
                                {machine.description}
                              </p>

                              <div className="grid grid-cols-1 gap-3 text-sm flex-1">
                                <div className="flex items-center gap-2">
                                  <IndustrialIcon
                                    icon="factory"
                                    size="sm"
                                    className="text-industrial-muted-foreground"
                                  />
                                  <span className="text-industrial-muted-foreground truncate">
                                    {machine.location}
                                  </span>
                                </div>

                                {machine.pricePerHour && (
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-industrial-accent" />
                                    <span className="text-industrial-accent font-medium">
                                      ${machine.pricePerHour}/hr
                                    </span>
                                  </div>
                                )}

                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-industrial-muted-foreground" />
                                  <span className="text-xs text-industrial-muted-foreground">
                                    Listed{' '}
                                    {new Date(
                                      machine.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              <div className="pt-4 mt-auto">
                                {machine.availability || machine.isAvailable ? (
                                  <Button
                                    onClick={() =>
                                      openApplicationDialog(machine)
                                    }
                                    disabled={
                                      applyingToMachine ===
                                      (machine._id || machine.id)
                                    }
                                    className="w-full bg-industrial-accent hover:bg-industrial-accent/90 text-industrial-background"
                                  >
                                    {applyingToMachine ===
                                    (machine._id || machine.id) ? (
                                      <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Applying...
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Apply to Use
                                      </>
                                    )}
                                  </Button>
                                ) : (
                                  <Button
                                    disabled
                                    variant="secondary"
                                    className="w-full"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Currently In Use
                                  </Button>
                                )}
                              </div>
                            </IndustrialCardContent>
                          </div>
                        </IndustrialCard>
                      </motion.div>
                    ))}
                </div>
              </AnimatePresence>
            )}
          </motion.div>
        </motion.div>
      </IndustrialContainer>

      {/* Application Confirmation Dialog */}
      <Dialog
        open={applicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
      >
        <DialogContent className="bg-white border-gray-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-industrial-foreground">
              <IndustrialIcon icon="gear" className="text-industrial-accent" />
              Apply for Machine
            </DialogTitle>
            <DialogDescription className="text-industrial-muted-foreground">
              Are you sure you want to apply to use "{selectedMachine?.name}"?
              The manufacturer will review your application and respond
              accordingly.
            </DialogDescription>
          </DialogHeader>

          {selectedMachine && (
            <div className="space-y-3 py-4">
              <div className="flex items-center gap-2 text-sm">
                <IndustrialIcon
                  icon="gear"
                  size="sm"
                  className="text-industrial-muted-foreground"
                />
                <span className="text-industrial-muted-foreground">Type:</span>
                <span className="text-industrial-foreground">
                  {selectedMachine.type}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <IndustrialIcon
                  icon="factory"
                  size="sm"
                  className="text-industrial-muted-foreground"
                />
                <span className="text-industrial-muted-foreground">
                  Location:
                </span>
                <span className="text-industrial-foreground">
                  {selectedMachine.location}
                </span>
              </div>

              {selectedMachine.pricePerHour && (
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-industrial-muted-foreground" />
                  <span className="text-industrial-muted-foreground">
                    Rate:
                  </span>
                  <span className="text-industrial-accent font-medium">
                    ${selectedMachine.pricePerHour}/hour
                  </span>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setApplicationDialogOpen(false)}
              className="border-industrial-border hover:bg-industrial-muted"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmApplication}
              className="bg-industrial-accent hover:bg-industrial-accent/90 text-industrial-background"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </IndustrialLayout>
  );
}
