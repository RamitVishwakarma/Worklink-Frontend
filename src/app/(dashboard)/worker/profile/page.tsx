'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  User,
  Settings,
  Save,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { useProfilesStore } from '@/lib/store';
import { IndustrialLayout } from '@/components/ui/industrial-layout';
import {
  IndustrialCard,
  IndustrialCardContent,
  IndustrialCardDescription,
  IndustrialCardHeader,
  IndustrialCardTitle,
} from '@/components/ui/card';
import { IndustrialInput } from '@/components/ui/industrial-input';
import { IndustrialTextarea } from '@/components/ui/industrial-textarea';
import { IndustrialBadge } from '@/components/ui/industrial-badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { UserType } from '@/lib/types';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  location: z.string().min(2, 'Location is required'),
  bio: z.string().max(500, 'Bio must not exceed 500 characters'),
  skills: z.string(),
  experience: z.string(),
  portfolio: z.string().optional(),
});

type ProfileData = z.infer<typeof profileSchema> & {
  createdAt?: string;
};

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

export default function WorkerProfilePage() {
  const { user } = useAuthStore();
  const { currentProfile, isLoading, isUpdating, fetchProfile, updateProfile } =
    useProfilesStore();
  const { toast } = useToast();
  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      skills: '',
      experience: '',
      portfolio: '',
    },
  });

  useEffect(() => {
    if (user?.id) {
      handleFetchProfile();
    }
  }, [user]);

  useEffect(() => {
    if (currentProfile) {
      const profile = currentProfile as any; // Type assertion for now
      form.reset({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        bio: profile.bio || '',
        skills: Array.isArray(profile.skills)
          ? profile.skills.join(', ')
          : profile.skills || '',
        experience: profile.experience || '',
        portfolio: profile.portfolio || '',
      });
    }
  }, [currentProfile, form]);

  const handleFetchProfile = async () => {
    if (!user?.id) return;

    try {
      await fetchProfile(user.id, UserType.WORKER);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: ProfileData) => {
    if (!user?.id) return;

    try {
      const updateData = {
        ...data,
        skills: data.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      await updateProfile(user.id, UserType.WORKER, updateData);

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <IndustrialLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Settings className="h-8 w-8 text-industrial-gunmetal-800" />
          </motion.div>
        </div>
      </IndustrialLayout>
    );
  }

  return (
    <IndustrialLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-4"
        >
          <User className="h-8 w-8 text-industrial-gunmetal-800" />
          <div>
            <h1 className="text-3xl font-bold text-industrial-gray-100">
              Worker Profile
            </h1>
            <p className="text-lg text-industrial-gray-300">
              Manage your personal information and professional details
            </p>
          </div>
        </motion.div>{' '}
        {/* Profile Overview */}
        {currentProfile && (
          <motion.div variants={itemVariants}>
            <IndustrialCard variant="industrial">
              <IndustrialCardHeader>
                <IndustrialCardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Overview
                </IndustrialCardTitle>
              </IndustrialCardHeader>
              <IndustrialCardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-2">
                      {' '}
                      <IndustrialBadge variant="success">
                        Active
                      </IndustrialBadge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-industrial-gray-300">
                        <MapPin className="h-4 w-4" />
                        {(currentProfile as any).location || 'Not specified'}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-industrial-gray-300">
                        <Briefcase className="h-4 w-4" />
                        {(currentProfile as any).experience || 'Not specified'}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-industrial-gray-300">
                        <Calendar className="h-4 w-4" />
                        Member since{' '}
                        {new Date(
                          (currentProfile as any).createdAt || Date.now()
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </IndustrialCardContent>
            </IndustrialCard>
          </motion.div>
        )}
        {/* Profile Form */}
        <motion.div variants={itemVariants}>
          <IndustrialCard variant="industrial">
            <IndustrialCardHeader>
              <IndustrialCardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Profile Information
              </IndustrialCardTitle>
            </IndustrialCardHeader>
            <IndustrialCardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {' '}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <IndustrialInput
                              {...field}
                              placeholder="Enter your full name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <IndustrialInput
                              {...field}
                              type="email"
                              placeholder="your.email@example.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <IndustrialInput
                              {...field}
                              placeholder="Your phone number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <IndustrialInput
                              {...field}
                              placeholder="City, State/Country"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills (comma-separated)</FormLabel>
                          <FormControl>
                            <IndustrialTextarea
                              {...field}
                              placeholder="e.g., Welding, CNC Operation, Quality Control"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level</FormLabel>
                          <FormControl>
                            <IndustrialTextarea
                              {...field}
                              placeholder="Describe your experience and background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>{' '}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <IndustrialTextarea
                            {...field}
                            placeholder="Tell us about yourself and your professional background"
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="portfolio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio URL (Optional)</FormLabel>
                        <FormControl>
                          <IndustrialInput
                            {...field}
                            placeholder="https://your-portfolio.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <motion.div
                    className="flex justify-end"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-industrial-accent hover:bg-industrial-accent-dark text-industrial-gray-900 font-semibold px-8 py-3"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Update Profile
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </IndustrialCardContent>
          </IndustrialCard>
        </motion.div>
      </motion.div>
    </IndustrialLayout>
  );
}
