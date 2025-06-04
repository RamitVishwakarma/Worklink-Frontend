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
import { getWorkerProfile, updateWorkerProfile } from '@/lib/api';
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

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  location: z.string().min(2, 'Location is required'),
  bio: z.string().max(500, 'Bio must not exceed 500 characters'),
  skills: z.string(),
  experience: z.string(),
  availability: z.enum(['available', 'busy', 'unavailable']),
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
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { toast } = useToast();

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      skills: '',
      experience: '',
      availability: 'available',
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await getWorkerProfile(user.id);
      const data = response.data;

      setProfileData(data);
      form.reset({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        bio: data.bio || '',
        skills: Array.isArray(data.skills)
          ? data.skills.join(', ')
          : data.skills || '',
        experience: data.experience || '',
        availability: data.availability || 'available',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ProfileData) => {
    setIsUpdating(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const updateData = {
        ...data,
        skills: data.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      await updateWorkerProfile(user.id, updateData);

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });

      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
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
        </motion.div>

        {/* Profile Stats */}
        {profileData && (
          <motion.div variants={itemVariants}>
            <IndustrialCard variant="industrial">
              <IndustrialCardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="flex items-center space-x-3">
                    <User className="h-6 w-6 text-industrial-safety-500" />
                    <div>
                      <p className="text-sm text-industrial-gray-300">Status</p>
                      <IndustrialBadge
                        variant={
                          profileData.availability === 'available'
                            ? 'success'
                            : profileData.availability === 'busy'
                              ? 'warning'
                              : 'secondary'
                        }
                      >
                        {profileData.availability}
                      </IndustrialBadge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-industrial-safety-500" />
                    <div>
                      <p className="text-sm text-industrial-gray-300">
                        Location
                      </p>
                      <p className="font-medium text-industrial-gray-100">
                        {profileData.location || 'Not specified'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-6 w-6 text-industrial-safety-500" />
                    <div>
                      <p className="text-sm text-industrial-gray-300">
                        Experience
                      </p>
                      <p className="font-medium text-industrial-gray-100">
                        {profileData.experience || 'Not specified'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-industrial-safety-500" />
                    <div>
                      <p className="text-sm text-industrial-gray-300">
                        Member Since
                      </p>
                      <p className="font-medium text-industrial-gray-100">
                        {new Date(
                          profileData.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <IndustrialInput
                              {...field}
                              placeholder="Enter your first name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <IndustrialInput
                              {...field}
                              placeholder="Enter your last name"
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

                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full px-4 py-3 bg-industrial-gray-600 border border-industrial-gray-500 rounded-lg text-industrial-gray-100 focus:border-industrial-accent focus:ring-1 focus:ring-industrial-accent"
                            >
                              <option value="available">Available</option>
                              <option value="busy">Busy</option>
                              <option value="unavailable">Unavailable</option>
                            </select>
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
                  </div>

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
