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
import { Button } from '@/components/ui/button';
import { IndustrialInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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
import { Machine, UserType } from '@/lib/types';
import {
  Settings,
  MapPin,
  DollarSign,
  Building2,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
  Wrench,
  Calendar,
  Send,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const StartupMachinesPage = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [applyingTo, setApplyingTo] = useState<string | null>(null);

  const { toast } = useToast();
  const { user } = useAuthStore();

  const fetchMachines = async () => {
    try {
      setLoading(true);
      const response = await api.get('/machines');
      const machinesData = response.data.map((machine: any) => ({
        ...machine,
        id: machine._id || machine.id,
        isAvailable: machine.availability !== false,
      }));
      setMachines(machinesData);
      setFilteredMachines(machinesData);
    } catch (error) {
      console.error('Failed to fetch machines:', error);
      toast({
        title: 'Error',
        description: 'Failed to load machines. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToMachine = async (machineId: string) => {
    try {
      setApplyingTo(machineId);
      await api.post(`/machines/${machineId}/apply`, {
        applicantType: 'startup',
        message: 'Interested in using this machine for our projects.',
      });

      // Update the machine state to reflect application
      setMachines((prev) =>
        prev.map((machine) =>
          machine.id === machineId ? { ...machine, hasApplied: true } : machine
        )
      );
      setFilteredMachines((prev) =>
        prev.map((machine) =>
          machine.id === machineId ? { ...machine, hasApplied: true } : machine
        )
      );

      toast({
        title: 'Application Submitted',
        description: 'Your application has been sent to the manufacturer.',
      });
    } catch (error) {
      console.error('Failed to apply for machine:', error);
      toast({
        title: 'Application Failed',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setApplyingTo(null);
    }
  };

  // Filter machines based on search and filter criteria
  useEffect(() => {
    let filtered = machines;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (machine) =>
          machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          machine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          machine.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter((machine) =>
        machine.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter) {
      filtered = filtered.filter((machine) =>
        machine.type.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    // Availability filter
    if (availabilityFilter) {
      if (availabilityFilter === 'available') {
        filtered = filtered.filter((machine) => machine.isAvailable);
      } else if (availabilityFilter === 'unavailable') {
        filtered = filtered.filter((machine) => !machine.isAvailable);
      }
    }

    setFilteredMachines(filtered);
  }, [machines, searchTerm, locationFilter, typeFilter, availabilityFilter]);

  useEffect(() => {
    if (user?.userType === UserType.STARTUP) {
      fetchMachines();
    }
  }, [user]);

  const getAvailabilityBadge = (isAvailable: boolean) => {
    return isAvailable ? (
      <Badge
        variant="outline"
        className="text-green-600 border-green-200 bg-green-50"
      >
        <CheckCircle className="h-3 w-3 mr-1" />
        Available
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="text-red-600 border-red-200 bg-red-50"
      >
        <XCircle className="h-3 w-3 mr-1" />
        Unavailable
      </Badge>
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setTypeFilter('');
    setAvailabilityFilter('');
  };

  const uniqueLocations = [
    ...new Set(machines.map((machine) => machine.location)),
  ];
  const uniqueTypes = [...new Set(machines.map((machine) => machine.type))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>{' '}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <IndustrialCard key={i} variant="industrial">
                <IndustrialCardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-24" />
                </IndustrialCardHeader>
                <IndustrialCardContent>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <IndustrialLayout>
      <IndustrialContainer className="py-8">
        <IndustrialHeader className="mb-8">
          <div className="flex items-center gap-3">
            <IndustrialIcon
              icon="factory"
              size="lg"
              animated
              className="text-industrial-accent"
            />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Available Machines
              </h1>
              <p className="text-industrial-secondary">
                Browse and apply to use manufacturing machines from verified
                manufacturers.
              </p>
            </div>
          </div>
        </IndustrialHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Filters */}
          <IndustrialCard variant="industrial">
            <IndustrialCardHeader>
              <IndustrialCardTitle className="flex items-center gap-2">
                <IndustrialIcon icon="gear" size="sm" />
                Filters
              </IndustrialCardTitle>
            </IndustrialCardHeader>
            <IndustrialCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <IndustrialInput
                      id="search"
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
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All locations</SelectItem>
                      {uniqueLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Machine Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      {uniqueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={availabilityFilter}
                    onValueChange={setAvailabilityFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>{' '}
              {(searchTerm ||
                locationFilter ||
                typeFilter ||
                availabilityFilter) && (
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </IndustrialCardContent>
          </IndustrialCard>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {filteredMachines.length} machine
                {filteredMachines.length !== 1 ? 's' : ''} found
              </h2>
            </div>{' '}
            {filteredMachines.length === 0 ? (
              <IndustrialCard variant="industrial">
                <IndustrialCardContent className="flex flex-col items-center justify-center py-16">
                  <IndustrialIcon
                    icon="wrench"
                    size="xl"
                    className="text-industrial-secondary mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    No machines found
                  </h3>
                  <p className="text-industrial-secondary text-center max-w-md">
                    No machines match your current filters. Try adjusting your
                    search criteria.
                  </p>
                </IndustrialCardContent>
              </IndustrialCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMachines.map((machine, index) => (
                  <motion.div
                    key={machine.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <IndustrialCard className="h-full" variant="industrial">
                      <IndustrialCardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <IndustrialCardTitle className="text-lg">
                              {machine.name}
                            </IndustrialCardTitle>{' '}
                            <IndustrialCardDescription className="flex items-center gap-1">
                              <IndustrialIcon icon="cog" size="sm" />
                              {machine.type}
                            </IndustrialCardDescription>
                          </div>
                          {getAvailabilityBadge(machine.isAvailable || false)}
                        </div>
                      </IndustrialCardHeader>
                      <IndustrialCardContent className="space-y-4">
                        <p className="text-sm text-industrial-secondary line-clamp-3">
                          {machine.description}
                        </p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-industrial-secondary">
                            <Building2 className="h-4 w-4" />
                            <span>Manufacturer ID: {machine.manufacturer}</span>
                          </div>

                          <div className="flex items-center gap-2 text-industrial-secondary">
                            <MapPin className="h-4 w-4" />
                            <span>{machine.location}</span>
                          </div>

                          {machine.pricePerHour && (
                            <div className="flex items-center gap-2 text-industrial-secondary">
                              <DollarSign className="h-4 w-4" />
                              <span>${machine.pricePerHour}/hour</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-industrial-secondary">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Listed{' '}
                              {new Date(machine.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {machine.specifications &&
                          Object.keys(machine.specifications).length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">
                                Specifications:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(machine.specifications)
                                  .slice(0, 3)
                                  .map(([key, value]) => (
                                    <Badge
                                      key={key}
                                      variant="industrial-secondary"
                                      className="text-xs"
                                    >
                                      {key}: {String(value)}
                                    </Badge>
                                  ))}
                                {Object.keys(machine.specifications).length >
                                  3 && (
                                  <Badge
                                    variant="industrial-secondary"
                                    className="text-xs"
                                  >
                                    +
                                    {Object.keys(machine.specifications)
                                      .length - 3}{' '}
                                    more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                        {machine.hasApplied ? (
                          <Button
                            className="w-full"
                            variant="industrial-secondary"
                            disabled
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Application Submitted
                          </Button>
                        ) : (
                          <Button
                            className="w-full"
                            variant="industrial-primary"
                            onClick={() => handleApplyToMachine(machine.id)}
                            disabled={
                              !machine.isAvailable || applyingTo === machine.id
                            }
                          >
                            {applyingTo === machine.id ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Applying...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Apply to Use
                              </>
                            )}
                          </Button>
                        )}
                      </IndustrialCardContent>
                    </IndustrialCard>
                  </motion.div>
                ))}
              </div>
            )}{' '}
          </div>
        </motion.div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
};

export default withAuth(StartupMachinesPage, {
  allowedUserTypes: [UserType.STARTUP],
});
