'use client';

import { useState, useEffect } from 'react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  IndustrialLayout,
  IndustrialContainer,
  IndustrialHeader,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/lib/store/authStore';
import api, {
  getMachinesByManufacturer,
  deleteMachine,
  toggleMachineAvailability,
} from '@/lib/api';
import { Machine, UserType } from '@/lib/types';
import withAuth from '@/components/auth/withAuth';
import { useRouter } from 'next/navigation';
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
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Settings,
  Eye,
  Users,
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

function YourMachinesPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [deletingMachine, setDeletingMachine] = useState<string | null>(null);
  const [togglingMachine, setTogglingMachine] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [machineToDelete, setMachineToDelete] = useState<Machine | null>(null);
  const fetchMachines = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const response = await getMachinesByManufacturer(user.id);
      const machinesData = response.data?.machines || response.data || [];
      setMachines(machinesData);
      setFilteredMachines(machinesData);
    } catch (error: any) {
      console.error('Error fetching machines:', error);
      toast({
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to fetch your machines',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMachine = async (machine: Machine) => {
    setMachineToDelete(machine);
    setDeleteDialogOpen(true);
  };
  const confirmDeleteMachine = async () => {
    if (!machineToDelete) return;

    setDeletingMachine(machineToDelete.id);
    try {
      await deleteMachine(machineToDelete.id);
      toast({
        title: 'Success',
        description: `Machine "${machineToDelete.name}" deleted successfully!`,
      });

      // Remove machine from local state
      setMachines((prev) => prev.filter((m) => m.id !== machineToDelete.id));
      setFilteredMachines((prev) =>
        prev.filter((m) => m.id !== machineToDelete.id)
      );
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to delete machine',
        variant: 'destructive',
      });
    } finally {
      setDeletingMachine(null);
      setDeleteDialogOpen(false);
      setMachineToDelete(null);
    }
  };

  const handleToggleAvailability = async (
    machineId: string,
    currentAvailability: boolean
  ) => {
    setTogglingMachine(machineId);
    try {
      await toggleMachineAvailability(machineId, !currentAvailability);
      const newStatus = !currentAvailability;

      toast({
        title: 'Success',
        description: `Machine ${newStatus ? 'activated' : 'deactivated'} successfully!`,
      });

      // Update machine status locally
      setMachines((prev) =>
        prev.map((machine) =>
          machine.id === machineId
            ? { ...machine, availability: newStatus, isAvailable: newStatus }
            : machine
        )
      );
      setFilteredMachines((prev) =>
        prev.map((machine) =>
          machine.id === machineId
            ? { ...machine, availability: newStatus, isAvailable: newStatus }
            : machine
        )
      );
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error.response?.data?.message ||
          'Failed to toggle machine availability',
        variant: 'destructive',
      });
    } finally {
      setTogglingMachine(null);
    }
  };

  useEffect(() => {
    if (user?.userType === UserType.MANUFACTURER) {
      fetchMachines();
    }
  }, [user]);

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

    // Status filter
    if (statusFilter === 'available') {
      filtered = filtered.filter(
        (machine) => machine.availability || machine.isAvailable
      );
    } else if (statusFilter === 'unavailable') {
      filtered = filtered.filter(
        (machine) => !(machine.availability || machine.isAvailable)
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((machine) =>
        machine.type.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    setFilteredMachines(filtered);
  }, [machines, searchTerm, statusFilter, typeFilter]);

  const machineTypes = Array.from(new Set(machines.map((m) => m.type))).filter(
    Boolean
  );

  if (loading) {
    return (
      <IndustrialLayout>
        {' '}
        <IndustrialContainer>
          <div className="flex items-center space-x-4 mb-8">
            <IndustrialIcon icon="wrench" size="lg" />
            <div>
              <IndustrialHeader level={1}>Your Machines</IndustrialHeader>
              <p className="text-industrial-gunmetal-600 mt-2">
                Manage and monitor your industrial equipment
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <IndustrialCard key={index}>
                <IndustrialCardHeader>
                  <Skeleton className="h-6 w-3/4 bg-industrial-muted" />
                  <Skeleton className="h-4 w-1/2 bg-industrial-muted" />
                </IndustrialCardHeader>
                <IndustrialCardContent>
                  <Skeleton className="h-20 w-full bg-industrial-muted" />
                  <div className="flex gap-2 mt-4">
                    <Skeleton className="h-8 w-20 bg-industrial-muted" />
                    <Skeleton className="h-8 w-20 bg-industrial-muted" />
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>
            ))}
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
          className="space-y-6"
        >
          {/* Header */}{' '}
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-4 mb-8">
              <IndustrialIcon icon="wrench" size="lg" />
              <div>
                <IndustrialHeader level={1}>Your Machines</IndustrialHeader>
                <p className="text-industrial-gunmetal-600 mt-2">
                  Manage and monitor your industrial equipment
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
                  </div>{' '}
                  <IndustrialIcon
                    icon="wrench"
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
                      {
                        machines.filter((m) => m.availability || m.isAvailable)
                          .length
                      }
                    </p>
                  </div>{' '}
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
                      Unavailable
                    </p>
                    <p className="text-2xl font-bold text-red-500">
                      {
                        machines.filter(
                          (m) => !(m.availability || m.isAvailable)
                        ).length
                      }
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
                      {machineTypes.length}
                    </p>
                  </div>{' '}
                  <IndustrialIcon
                    icon="gear"
                    className="text-industrial-secondary"
                  />
                </div>
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>
          {/* Actions & Filters */}
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] bg-industrial-background border-industrial-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px] bg-industrial-background border-industrial-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {machineTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={() => router.push('/manufacturer/add-machine')}
              className="bg-industrial-accent hover:bg-industrial-accent/90 text-industrial-background"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Machine
            </Button>
          </motion.div>
          {/* Machines Grid */}
          <motion.div variants={itemVariants}>
            {filteredMachines.length === 0 ? (
              <IndustrialCard className="text-center py-12">
                <IndustrialCardContent>
                  <div className="flex flex-col items-center space-y-4">
                    {' '}
                    <IndustrialIcon
                      icon="wrench"
                      size="lg"
                      className="text-industrial-muted-foreground"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-industrial-foreground mb-2">
                        {machines.length === 0
                          ? 'No machines yet'
                          : 'No matches found'}
                      </h3>
                      <p className="text-industrial-muted-foreground mb-4">
                        {machines.length === 0
                          ? 'Start by adding your first industrial machine'
                          : 'Try adjusting your search or filter criteria'}
                      </p>
                      {machines.length === 0 && (
                        <Button
                          onClick={() =>
                            router.push('/manufacturer/add-machine')
                          }
                          className="bg-industrial-accent hover:bg-industrial-accent/90 text-industrial-background"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Machine
                        </Button>
                      )}
                    </div>
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMachines.map((machine) => (
                    <motion.div
                      key={machine.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <IndustrialCard className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-industrial-background to-industrial-muted/5 opacity-50" />
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-industrial-primary/10 to-transparent" />

                        <div className="relative">
                          <IndustrialCardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <IndustrialCardTitle className="text-lg group-hover:text-industrial-primary transition-colors">
                                  {machine.name}
                                </IndustrialCardTitle>
                                <IndustrialCardDescription className="flex items-center gap-1 mt-1">
                                  <IndustrialIcon icon="wrench" size="sm" />
                                  {machine.type}
                                </IndustrialCardDescription>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-industrial-muted"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-48"
                                >
                                  <DropdownMenuItem
                                    onClick={() =>
                                      router.push(
                                        `/manufacturer/machines/${machine.id}`
                                      )
                                    }
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      router.push(
                                        `/manufacturer/machines/${machine.id}/applications`
                                      )
                                    }
                                  >
                                    <Users className="h-4 w-4 mr-2" />
                                    View Applications
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleToggleAvailability(
                                        machine.id,
                                        machine.availability ||
                                          machine.isAvailable ||
                                          false
                                      )
                                    }
                                    disabled={togglingMachine === machine.id}
                                  >
                                    {togglingMachine === machine.id ? (
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : machine.availability ||
                                      machine.isAvailable ? (
                                      <ToggleLeft className="h-4 w-4 mr-2" />
                                    ) : (
                                      <ToggleRight className="h-4 w-4 mr-2" />
                                    )}
                                    {machine.availability || machine.isAvailable
                                      ? 'Deactivate'
                                      : 'Activate'}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteMachine(machine)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    disabled={deletingMachine === machine.id}
                                  >
                                    {deletingMachine === machine.id ? (
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4 mr-2" />
                                    )}
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </IndustrialCardHeader>

                          <IndustrialCardContent className="space-y-4">
                            <p className="text-sm text-industrial-muted-foreground line-clamp-2">
                              {machine.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                {' '}
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
                                  {' '}
                                  <IndustrialIcon
                                    icon="bolt"
                                    size="sm"
                                    className="text-industrial-accent"
                                  />
                                  <span className="text-industrial-accent font-medium">
                                    ${machine.pricePerHour}/hr
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-2">
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
                                {' '}
                                <IndustrialIcon
                                  icon={
                                    machine.availability || machine.isAvailable
                                      ? 'gear'
                                      : 'gear'
                                  }
                                  size="sm"
                                  className="mr-1"
                                />
                                {machine.availability || machine.isAvailable
                                  ? 'Available'
                                  : 'Unavailable'}
                              </Badge>

                              <span className="text-xs text-industrial-muted-foreground">
                                {new Date(
                                  machine.createdAt
                                ).toLocaleDateString()}
                              </span>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-industrial-background border-industrial-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-industrial-foreground">
              <IndustrialIcon icon="gear" className="text-red-500" />
              Delete Machine
            </DialogTitle>
            <DialogDescription className="text-industrial-muted-foreground">
              Are you sure you want to delete "{machineToDelete?.name}"? This
              action cannot be undone. All associated applications will also be
              removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deletingMachine !== null}
              className="border-industrial-border hover:bg-industrial-muted"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteMachine}
              disabled={deletingMachine !== null}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletingMachine ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Machine
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </IndustrialLayout>
  );
}

export default withAuth(YourMachinesPage, {
  allowedUserTypes: [UserType.MANUFACTURER],
});
