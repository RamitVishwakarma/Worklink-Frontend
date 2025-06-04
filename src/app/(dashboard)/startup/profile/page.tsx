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
import { UserType, StartupProfile } from '@/lib/types';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar,
  Edit3,
  Save,
  X,
  Globe,
  Briefcase,
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

function StartupProfilePage() {
  const [profile, setProfile] = useState<StartupProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<StartupProfile>>({});

  const { toast } = useToast();
  const { user, updateUser } = useAuthStore();

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile/startup');
      const profileData = response.data;
      setProfile(profileData);
      setFormData(profileData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.put('/profile/startup', formData);
      const updatedProfile = response.data;

      setProfile(updatedProfile);
      setEditing(false);

      // Update auth store with new profile data
      updateUser({
        ...user,
        companyName: updatedProfile.companyName,
        email: updatedProfile.email,
      });

      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile || {});
    setEditing(false);
  };

  const handleInputChange = (
    field: keyof StartupProfile,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    fetchProfile();
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
              <Skeleton className="h-10 w-24 bg-industrial-muted" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <IndustrialCard>
                  <IndustrialCardHeader>
                    <Skeleton className="h-6 w-32 bg-industrial-muted" />
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24 bg-industrial-muted" />
                        <Skeleton className="h-10 w-full bg-industrial-muted" />
                      </div>
                    ))}
                  </IndustrialCardContent>
                </IndustrialCard>
              </div>

              <div className="space-y-6">
                <IndustrialCard>
                  <IndustrialCardHeader>
                    <Skeleton className="h-6 w-32 bg-industrial-muted" />
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24 bg-industrial-muted" />
                        <Skeleton className="h-6 w-16 bg-industrial-muted" />
                      </div>
                    ))}
                  </IndustrialCardContent>
                </IndustrialCard>
              </div>
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
              <IndustrialIcon
                icon="factory"
                className="text-industrial-accent"
              />
              <div>
                <IndustrialHeader
                  level={1}
                  className="text-industrial-foreground"
                >
                  Company Profile
                </IndustrialHeader>
                <p className="text-industrial-muted-foreground mt-1">
                  Manage your company information and settings
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={saving}
                    className="border-industrial-border hover:bg-industrial-muted text-industrial-foreground"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-industrial-accent hover:bg-industrial-accent/90 text-industrial-dark"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setEditing(true)}
                  className="bg-industrial-accent hover:bg-industrial-accent/90 text-industrial-dark"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Information */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              variants={itemVariants}
            >
              <IndustrialCard>
                <IndustrialCardHeader>
                  <IndustrialCardTitle className="flex items-center gap-2">
                    <IndustrialIcon
                      icon="factory"
                      className="text-industrial-accent"
                    />
                    Company Information
                  </IndustrialCardTitle>
                  <IndustrialCardDescription>
                    Basic information about your company
                  </IndustrialCardDescription>
                </IndustrialCardHeader>
                <IndustrialCardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="companyName"
                        className="text-industrial-foreground"
                      >
                        Company Name
                      </Label>
                      {editing ? (
                        <IndustrialInput
                          id="companyName"
                          value={formData.companyName || ''}
                          onChange={(e) =>
                            handleInputChange('companyName', e.target.value)
                          }
                        />
                      ) : (
                        <p className="p-2 border border-industrial-border rounded-md bg-industrial-muted/50 text-industrial-foreground">
                          {profile?.companyName || 'Not specified'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="industry"
                        className="text-industrial-foreground"
                      >
                        Industry
                      </Label>
                      {editing ? (
                        <IndustrialInput
                          id="industry"
                          value={formData.industry || ''}
                          onChange={(e) =>
                            handleInputChange('industry', e.target.value)
                          }
                        />
                      ) : (
                        <p className="p-2 border border-industrial-border rounded-md bg-industrial-muted/50 text-industrial-foreground">
                          {profile?.industry || 'Not specified'}
                        </p>
                      )}{' '}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-industrial-foreground"
                      >
                        Email
                      </Label>
                      {editing ? (
                        <IndustrialInput
                          id="email"
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) =>
                            handleInputChange('email', e.target.value)
                          }
                        />
                      ) : (
                        <p className="p-2 border border-industrial-border rounded-md bg-industrial-muted/50 text-industrial-foreground">
                          {profile?.email || 'Not specified'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-industrial-foreground"
                      >
                        Phone
                      </Label>
                      {editing ? (
                        <IndustrialInput
                          id="phone"
                          value={formData.phone || ''}
                          onChange={(e) =>
                            handleInputChange('phone', e.target.value)
                          }
                        />
                      ) : (
                        <p className="p-2 border border-industrial-border rounded-md bg-industrial-muted/50 text-industrial-foreground">
                          {profile?.phone || 'Not specified'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label
                        htmlFor="address"
                        className="text-industrial-foreground"
                      >
                        Address
                      </Label>
                      {editing ? (
                        <IndustrialInput
                          id="address"
                          value={formData.address || ''}
                          onChange={(e) =>
                            handleInputChange('address', e.target.value)
                          }
                        />
                      ) : (
                        <p className="p-2 border border-industrial-border rounded-md bg-industrial-muted/50 text-industrial-foreground">
                          {profile?.address || 'Not specified'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="website"
                        className="text-industrial-foreground"
                      >
                        Website
                      </Label>
                      {editing ? (
                        <IndustrialInput
                          id="website"
                          type="url"
                          value={formData.website || ''}
                          onChange={(e) =>
                            handleInputChange('website', e.target.value)
                          }
                        />
                      ) : (
                        <p className="p-2 border border-industrial-border rounded-md bg-industrial-muted/50 text-industrial-foreground">
                          {profile?.website ? (
                            <a
                              href={profile.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-industrial-accent hover:underline"
                            >
                              {profile.website}
                            </a>
                          ) : (
                            'Not specified'
                          )}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="foundedYear"
                        className="text-industrial-foreground"
                      >
                        Founded Year
                      </Label>
                      {editing ? (
                        <IndustrialInput
                          id="foundedYear"
                          type="number"
                          min="1800"
                          max={new Date().getFullYear()}
                          value={formData.foundedYear || ''}
                          onChange={(e) =>
                            handleInputChange(
                              'foundedYear',
                              parseInt(e.target.value)
                            )
                          }
                        />
                      ) : (
                        <p className="p-2 border border-industrial-border rounded-md bg-industrial-muted/50 text-industrial-foreground">
                          {profile?.foundedYear || 'Not specified'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-industrial-foreground"
                    >
                      Company Description
                    </Label>
                    {editing ? (
                      <textarea
                        id="description"
                        className="flex min-h-[80px] w-full rounded-md border border-industrial-border bg-industrial-background px-3 py-2 text-sm text-industrial-foreground ring-offset-background placeholder:text-industrial-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.description || ''}
                        onChange={(e) =>
                          handleInputChange('description', e.target.value)
                        }
                        placeholder="Tell us about your company..."
                      />
                    ) : (
                      <p className="p-3 border border-industrial-border rounded-md bg-industrial-muted/50 min-h-[80px] text-industrial-foreground">
                        {profile?.description || 'No description available'}
                      </p>
                    )}
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>
            </motion.div>

            {/* Profile Statistics */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <IndustrialCard>
                <IndustrialCardHeader>
                  <IndustrialCardTitle className="flex items-center gap-2">
                    <IndustrialIcon
                      icon="gear"
                      className="text-industrial-accent"
                    />
                    Profile Statistics
                  </IndustrialCardTitle>
                  <IndustrialCardDescription>
                    Your company metrics
                  </IndustrialCardDescription>
                </IndustrialCardHeader>
                <IndustrialCardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {' '}
                      <IndustrialIcon
                        icon="factory"
                        className="h-4 w-4 text-industrial-muted-foreground"
                      />
                      <span className="text-sm text-industrial-foreground">
                        Total Gigs Posted
                      </span>
                    </div>
                    <span className="font-semibold text-industrial-foreground">
                      {profile?.totalGigsPosted || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IndustrialIcon
                        icon="gear"
                        className="h-4 w-4 text-industrial-muted-foreground"
                      />
                      <span className="text-sm text-industrial-foreground">
                        Active Gigs
                      </span>
                    </div>
                    <span className="font-semibold text-industrial-foreground">
                      {profile?.activeGigs || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IndustrialIcon
                        icon="wrench"
                        className="h-4 w-4 text-industrial-muted-foreground"
                      />
                      <span className="text-sm text-industrial-foreground">
                        Applications Received
                      </span>
                    </div>
                    <span className="font-semibold text-industrial-foreground">
                      {profile?.totalApplications || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IndustrialIcon
                        icon="cog"
                        className="h-4 w-4 text-industrial-muted-foreground"
                      />
                      <span className="text-sm text-industrial-foreground">
                        Member Since
                      </span>
                    </div>
                    <span className="text-sm text-industrial-muted-foreground">
                      {profile?.memberSince
                        ? new Date(profile.memberSince).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                </IndustrialCardContent>
              </IndustrialCard>

              <IndustrialCard>
                <IndustrialCardHeader>
                  <IndustrialCardTitle className="flex items-center gap-2">
                    <IndustrialIcon
                      icon="cog"
                      className="text-industrial-accent"
                    />
                    Quick Info
                  </IndustrialCardTitle>
                </IndustrialCardHeader>
                <IndustrialCardContent className="space-y-3">
                  {profile?.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-industrial-muted-foreground" />
                      <span className="break-all text-industrial-foreground">
                        {profile.email}
                      </span>
                    </div>
                  )}

                  {profile?.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-industrial-muted-foreground" />
                      <span className="text-industrial-foreground">
                        {profile.phone}
                      </span>
                    </div>
                  )}

                  {profile?.address && (
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-industrial-muted-foreground" />
                      <span className="text-industrial-foreground">
                        {profile.address}
                      </span>
                    </div>
                  )}

                  {profile?.website && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="h-4 w-4 text-industrial-muted-foreground" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-industrial-accent hover:underline break-all"
                      >
                        {profile.website}
                      </a>
                    </div>
                  )}

                  {profile?.industry && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Building2 className="h-4 w-4 text-industrial-muted-foreground" />
                      <span className="text-industrial-foreground">
                        {profile.industry}
                      </span>
                    </div>
                  )}
                </IndustrialCardContent>
              </IndustrialCard>
            </motion.div>
          </div>
        </motion.div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
}

export default withAuth(StartupProfilePage, {
  allowedUserTypes: [UserType.STARTUP],
});
