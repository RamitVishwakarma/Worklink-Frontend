'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
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

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

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

  const fetchProfile = async () => {
    try {
      await fetchCurrentUserProfile(UserType.MANUFACTURER);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch profile data',
        variant: 'destructive',
      });
    }
  };
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto p-6 space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Company Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your company information and preferences
          </p>
        </div>
        <div className="flex gap-3">
          {editing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isUpdating}>
                <Save className="h-4 w-4 mr-2" />
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Statistics */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Profile Statistics
              </CardTitle>
            </CardHeader>{' '}
            <CardContent className="space-y-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Factory className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Total Machines
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          {(currentProfile as ManufacturerProfile)
                            ?.totalMachines || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Active Machines
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {(currentProfile as ManufacturerProfile)
                            ?.activeMachines || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Member Since
                        </p>{' '}
                        <p className="text-lg font-semibold text-purple-600">
                          {(currentProfile as ManufacturerProfile)?.memberSince
                            ? new Date(
                                (
                                  currentProfile as ManufacturerProfile
                                ).memberSince
                              ).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Information */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Company Information
              </CardTitle>
            </CardHeader>{' '}
            <CardContent>
              {isLoading ? (
                <div className="space-y-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="md:col-span-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    {editing ? (
                      <Input
                        id="companyName"
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
                        <span className="text-gray-900 dark:text-white">
                          {(currentProfile as ManufacturerProfile)
                            ?.companyName || 'Not specified'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Industry */}
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    {editing ? (
                      <Input
                        id="industry"
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e.target.value })
                        }
                        className="mt-2"
                      />
                    ) : (
                      <div className="mt-2 flex items-center space-x-2">
                        <Factory className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900 dark:text-white">
                          {(currentProfile as ManufacturerProfile)?.industry ||
                            'Not specified'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Contact Person */}
                  <div>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    {editing ? (
                      <Input
                        id="contactPerson"
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
                        <span className="text-gray-900 dark:text-white">
                          {(currentProfile as ManufacturerProfile)
                            ?.contactPerson || 'Not specified'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Contact Email */}
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    {editing ? (
                      <Input
                        id="contactEmail"
                        type="email"
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
                        <span className="text-gray-900 dark:text-white">
                          {(currentProfile as ManufacturerProfile)
                            ?.contactEmail || 'Not specified'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    {editing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="mt-2"
                      />
                    ) : (
                      <div className="mt-2 flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900 dark:text-white">
                          {(currentProfile as ManufacturerProfile)?.phone ||
                            'Not specified'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <Label htmlFor="website">Website</Label>
                    {editing ? (
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        className="mt-2"
                      />
                    ) : (
                      <div className="mt-2 flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900 dark:text-white">
                          {(currentProfile as ManufacturerProfile)?.website ||
                            'Not specified'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    {editing ? (
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="mt-2"
                      />
                    ) : (
                      <div className="mt-2 flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900 dark:text-white">
                          {(currentProfile as ManufacturerProfile)?.address ||
                            'Not specified'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <Label htmlFor="city">City</Label>
                    {editing ? (
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="mt-2"
                      />
                    ) : (
                      <div className="mt-2 text-gray-900 dark:text-white">
                        {(currentProfile as ManufacturerProfile)?.city ||
                          'Not specified'}
                      </div>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <Label htmlFor="state">State</Label>
                    {editing ? (
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className="mt-2"
                      />
                    ) : (
                      <div className="mt-2 text-gray-900 dark:text-white">
                        {(currentProfile as ManufacturerProfile)?.state ||
                          'Not specified'}
                      </div>
                    )}
                  </div>

                  {/* Zip Code */}
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    {editing ? (
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) =>
                          setFormData({ ...formData, zipCode: e.target.value })
                        }
                        className="mt-2"
                      />
                    ) : (
                      <div className="mt-2 text-gray-900 dark:text-white">
                        {(currentProfile as ManufacturerProfile)?.zipCode ||
                          'Not specified'}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Company Description</Label>
                    {editing ? (
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="mt-2"
                        rows={4}
                        placeholder="Tell us about your company..."
                      />
                    ) : (
                      <div className="mt-2 text-gray-900 dark:text-white">
                        {(currentProfile as ManufacturerProfile)?.description ||
                          'No description provided'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default withAuth(ManufacturerProfilePage, {
  allowedUserTypes: [UserType.MANUFACTURER],
});
