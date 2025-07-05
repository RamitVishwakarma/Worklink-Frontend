'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import {
  IndustrialCard,
  IndustrialCardContent,
  IndustrialCardHeader,
  IndustrialCardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IndustrialInput } from '@/components/ui/industrial-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  IndustrialLayout,
  IndustrialContainer,
  IndustrialHeader,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { useAuthStore, useProfilesStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import withAuth from '@/components/auth/withAuth';
import { UserType, ManufacturerProfile } from '@/lib/types';
import {
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit3,
  Save,
  X,
  Factory,
  Calendar,
  TrendingUp,
  Settings,
  Loader2,
} from 'lucide-react';

function ManufacturerProfilePage() {
  const { user, updateUser } = useAuthStore();
  const {
    currentProfile,
    isLoading,
    isUpdating,
    fetchCurrentUserProfile,
    updateCurrentUserProfile,
  } = useProfilesStore();
  const { toast } = useToast();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    website: '',
    contactPerson: '',
    contactEmail: '',
  });

  // Memoize the fetchProfile function
  const memoizedFetchProfile = useCallback(async () => {
    try {
      await fetchCurrentUserProfile(UserType.MANUFACTURER);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch profile',
        variant: 'destructive',
      });
    }
  }, [fetchCurrentUserProfile, toast]);

  useEffect(() => {
    if (user) {
      memoizedFetchProfile();
    }
  }, [user, memoizedFetchProfile]);

  // Update form data when profile loads
  useEffect(() => {
    if (currentProfile) {
      const manufacturerProfile = currentProfile as ManufacturerProfile;
      setFormData({
        companyName: manufacturerProfile.companyName || '',
        industry: manufacturerProfile.industry || '',
        description: manufacturerProfile.description || '',
        address: manufacturerProfile.address || '',
        city: manufacturerProfile.city || '',
        state: manufacturerProfile.state || '',
        zipCode: manufacturerProfile.zipCode || '',
        phone: manufacturerProfile.phone || '',
        website: manufacturerProfile.website || '',
        contactPerson: manufacturerProfile.contactPerson || '',
        contactEmail: manufacturerProfile.contactEmail || '',
      });
    }
  }, [currentProfile]);

  // Removed the incomplete function as it's now handled by memoizedFetchProfile
  const handleSave = async () => {
    try {
      const updatedProfile = await updateCurrentUserProfile(
        UserType.MANUFACTURER,
        formData
      );

      // Update user in auth store if company name changed
      if (formData.companyName !== user?.companyName) {
        updateUser({ ...user!, companyName: formData.companyName });
      }

      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
      setEditing(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    if (currentProfile) {
      const manufacturerProfile = currentProfile as ManufacturerProfile;
      setFormData({
        companyName: manufacturerProfile.companyName || '',
        industry: manufacturerProfile.industry || '',
        description: manufacturerProfile.description || '',
        address: manufacturerProfile.address || '',
        city: manufacturerProfile.city || '',
        state: manufacturerProfile.state || '',
        zipCode: manufacturerProfile.zipCode || '',
        phone: manufacturerProfile.phone || '',
        website: manufacturerProfile.website || '',
        contactPerson: manufacturerProfile.contactPerson || '',
        contactEmail: manufacturerProfile.contactEmail || '',
      });
    }
    setEditing(false);
  };
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
  return (
    <IndustrialLayout>
      <IndustrialContainer>
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-industrial-accent to-gray-800 bg-clip-text text-transparent mb-2">
                      Company Profile
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Manage your manufacturing company information and
                      industrial operations
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex gap-3">
                {editing ? (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="industrial-outline"
                        size="sm"
                        onClick={handleCancel}
                        disabled={isUpdating}
                        className="shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="industrial-accent"
                        size="sm"
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        {isUpdating ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="industrial-accent"
                      size="sm"
                      onClick={() => setEditing(true)}
                      className="shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Metal texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-industrial-gunmetal-50/5 to-transparent pointer-events-none" />
          </motion.div>{' '}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Enhanced Profile Statistics */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
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
                          className="text-industrial-accent"
                        />
                      </motion.div>
                      <span className="text-gray-800 font-bold">
                        Manufacturing Statistics
                      </span>
                    </IndustrialCardTitle>
                  </IndustrialCardHeader>

                  <IndustrialCardContent className="space-y-4 relative z-10">
                    {isLoading ? (
                      <>
                        <Skeleton className="h-16 w-full bg-industrial-muted" />
                        <Skeleton className="h-16 w-full bg-industrial-muted" />
                        <Skeleton className="h-16 w-full bg-industrial-muted" />
                      </>
                    ) : (
                      <>
                        {/* Total Machines */}
                        <div className="flex items-center justify-between p-4 bg-industrial-navy-50 border border-industrial-navy-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              whileHover={{ scale: 1.1, rotateY: 180 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Factory className="h-8 w-8 text-industrial-navy-500" />
                            </motion.div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Total Machines
                              </p>
                              <p className="text-2xl font-bold text-industrial-navy-600">
                                {(currentProfile as ManufacturerProfile)
                                  ?.totalMachines || 0}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Active Machines */}
                        <div className="flex items-center justify-between p-4 bg-industrial-safety-50 border border-industrial-safety-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <motion.div>
                              <TrendingUp className="h-8 w-8 text-industrial-safety-500" />
                            </motion.div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Active Machines
                              </p>
                              <p className="text-2xl font-bold text-industrial-safety-600">
                                {(currentProfile as ManufacturerProfile)
                                  ?.activeMachines || 0}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Member Since */}
                        <div className="flex items-center justify-between p-4 bg-industrial-accent-50 border border-industrial-accent-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              whileHover={{
                                scale: [1, 1.2, 1],
                                rotateX: [0, 360, 0],
                              }}
                              transition={{ duration: 0.6 }}
                            >
                              <Calendar className="h-8 w-8 text-industrial-accent" />
                            </motion.div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Member Since
                              </p>{' '}
                              <p className="text-2xl font-bold text-industrial-accent">
                                {currentProfile?.createdAt
                                  ? new Date(
                                      currentProfile.createdAt
                                    ).getFullYear()
                                  : new Date().getFullYear()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>
            </motion.div>{' '}
            {/* Enhanced Profile Information */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
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

                  <IndustrialCardHeader className="relative z-10">
                    <IndustrialCardTitle className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotateY: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Building className="h-6 w-6 text-industrial-navy-400" />
                      </motion.div>
                      <span className="text-gray-800 font-bold">
                        Company Information
                      </span>
                    </IndustrialCardTitle>
                  </IndustrialCardHeader>

                  <IndustrialCardContent className="relative z-10">
                    {isLoading ? (
                      <div className="space-y-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-24 bg-industrial-muted" />
                            <Skeleton className="h-10 w-full bg-industrial-muted" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div className="md:col-span-2">
                          <Label
                            htmlFor="companyName"
                            className="text-gray-700 font-medium"
                          >
                            Company Name
                          </Label>
                          {editing ? (
                            <IndustrialInput
                              id="companyName"
                              leftIcon="factory"
                              placeholder="Enter company name"
                              value={formData.companyName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  companyName: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          ) : (
                            <div className="mt-2 flex items-center space-x-2">
                              <Building className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.companyName || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>{' '}
                        {/* Contact Person */}
                        <div>
                          <Label
                            htmlFor="contactPerson"
                            className="text-gray-700 font-medium"
                          >
                            Contact Person
                          </Label>
                          {editing ? (
                            <IndustrialInput
                              id="contactPerson"
                              leftIcon="hardhat"
                              placeholder="Enter contact person name"
                              value={formData.contactPerson}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  contactPerson: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          ) : (
                            <div className="mt-2 flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.contactPerson || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Contact Email */}
                        <div>
                          <Label
                            htmlFor="contactEmail"
                            className="text-gray-700 font-medium"
                          >
                            Contact Email
                          </Label>
                          {editing ? (
                            <IndustrialInput
                              id="contactEmail"
                              leftIcon="circuit"
                              placeholder="Enter contact email"
                              value={formData.contactEmail}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  contactEmail: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          ) : (
                            <div className="mt-2 flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.contactEmail || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Industry */}
                        <div>
                          <Label
                            htmlFor="industry"
                            className="text-gray-700 font-medium"
                          >
                            Industry
                          </Label>
                          {editing ? (
                            <IndustrialInput
                              id="industry"
                              leftIcon="factory"
                              placeholder="e.g., Manufacturing, Automotive"
                              value={formData.industry}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  industry: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          ) : (
                            <div className="mt-2 flex items-center space-x-2">
                              <Factory className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.industry || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Phone */}
                        <div>
                          <Label
                            htmlFor="phone"
                            className="text-gray-700 font-medium"
                          >
                            Phone Number
                          </Label>
                          {editing ? (
                            <IndustrialInput
                              id="phone"
                              leftIcon="bolt"
                              placeholder="Enter phone number"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          ) : (
                            <div className="mt-2 flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.phone || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Website */}
                        <div>
                          <Label
                            htmlFor="website"
                            className="text-gray-700 font-medium"
                          >
                            Website
                          </Label>
                          {editing ? (
                            <IndustrialInput
                              id="website"
                              leftIcon="circuit"
                              placeholder="https://yourcompany.com"
                              value={formData.website}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  website: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          ) : (
                            <div className="mt-2 flex items-center space-x-2">
                              <Globe className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.website || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Address */}
                        <div className="md:col-span-2">
                          <Label
                            htmlFor="address"
                            className="text-gray-700 font-medium"
                          >
                            Street Address
                          </Label>
                          {editing ? (
                            <IndustrialInput
                              id="address"
                              leftIcon="wrench"
                              placeholder="Enter street address"
                              value={formData.address}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  address: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          ) : (
                            <div className="mt-2 flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.address || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* City */}
                        <div>
                          <Label
                            htmlFor="city"
                            className="text-gray-700 font-medium"
                          >
                            City
                          </Label>
                          {editing ? (
                            <IndustrialInput
                              id="city"
                              placeholder="Enter city"
                              value={formData.city}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  city: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          ) : (
                            <div className="mt-2">
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.city || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* State */}
                        <div>
                          <Label
                            htmlFor="state"
                            className="text-gray-700 font-medium"
                          >
                            State
                          </Label>
                          {editing ? (
                            <IndustrialInput
                              id="state"
                              placeholder="Enter state"
                              value={formData.state}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  state: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          ) : (
                            <div className="mt-2">
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.state || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Zip Code */}
                        <div>
                          <Label
                            htmlFor="zipCode"
                            className="text-gray-700 font-medium"
                          >
                            Zip Code
                          </Label>
                          {editing ? (
                            <IndustrialInput
                              id="zipCode"
                              placeholder="Enter zip code"
                              value={formData.zipCode}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  zipCode: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          ) : (
                            <div className="mt-2">
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.zipCode || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Description */}
                        <div className="md:col-span-2">
                          <Label
                            htmlFor="description"
                            className="text-gray-700 font-medium"
                          >
                            Company Description
                          </Label>
                          {editing ? (
                            <Textarea
                              id="description"
                              placeholder="Describe your manufacturing company, capabilities, and services..."
                              value={formData.description}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                })
                              }
                              className="mt-2 min-h-[100px] bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-500 focus:border-industrial-accent focus:ring-industrial-accent"
                            />
                          ) : (
                            <div className="mt-2">
                              <span className="text-gray-800">
                                {(currentProfile as ManufacturerProfile)
                                  ?.description || 'No description provided'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
}

export default withAuth(ManufacturerProfilePage, {
  allowedUserTypes: [UserType.MANUFACTURER],
});
