'use client';

import React, { useState } from 'react';
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
import { useAuthStore, useGigsStore } from '@/lib/store';
import withAuth from '@/components/auth/withAuth';
import { UserType } from '@/lib/types';
import {
  Plus,
  X,
  DollarSign,
  MapPin,
  Calendar,
  Building2,
  Users,
  Briefcase,
  Clock,
  Save,
  Factory,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

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

interface CreateGigForm {
  title: string;
  description: string;
  location: string;
  jobType: string;
  salary: number | '';
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
}

function CreateGigPage() {
  const [formData, setFormData] = useState<CreateGigForm>({
    title: '',
    description: '',
    location: '',
    jobType: '',
    salary: '',
    requirements: [],
    benefits: [],
    applicationDeadline: '',
  });
  const [newRequirement, setNewRequirement] = useState('');
  const [newBenefit, setNewBenefit] = useState('');

  const { toast } = useToast();
  const { user } = useAuthStore();
  const { createGig, isCreating } = useGigsStore();
  const router = useRouter();

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship',
    'Remote',
    'Hybrid',
  ];

  const handleInputChange = (field: keyof CreateGigForm, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addRequirement = () => {
    if (
      newRequirement.trim() &&
      !formData.requirements.includes(newRequirement.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (requirement: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((req) => req !== requirement),
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (benefit: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((ben) => ben !== benefit),
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.jobType
    ) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const gigData = {
        ...formData,
        salary: formData.salary ? Number(formData.salary) : null,
        company: user?.companyName || user?.name || 'Unknown Company',
      };

      await createGig(gigData);

      toast({
        title: 'Success',
        description: 'Gig created successfully!',
      });

      router.push('/startup/gigs');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create gig',
        variant: 'destructive',
      });
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
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
          {' '}
          {/* Enhanced Header with Industrial Styling */}
          <motion.div variants={headerVariants} className="relative">
            {/* Animated Metal Accent Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-industrial-accent via-industrial-safety-400 to-industrial-accent rounded-full"
            />

            <div className="flex items-center gap-4 pt-4">
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
                    rotateZ: [0, 1, -1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 2,
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

              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-industrial-foreground via-industrial-accent to-industrial-foreground bg-clip-text text-transparent mb-2">
                    Create New Gig
                  </h1>
                  <p className="text-industrial-muted-foreground text-lg">
                    Post a new job opportunity and find the perfect industrial
                    candidates
                  </p>
                </motion.div>
              </div>

              {/* Metal texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-industrial-gunmetal-50/5 to-transparent pointer-events-none" />
            </div>
          </motion.div>{' '}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enhanced Main Form with Industrial Styling */}
              {/* <motion.div
                className="lg:col-span-2 space-y-6"
                variants={itemVariants}
              > */}
              {/* Job Details Card - Enhanced */}
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
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <IndustrialIcon
                          icon="gear"
                          size="md"
                          className="text-industrial-accent"
                        />
                      </motion.div>
                      <span className="text-industrial-foreground font-bold">
                        Job Details
                      </span>
                    </IndustrialCardTitle>
                    <IndustrialCardDescription className="text-industrial-muted-foreground">
                      Essential information about the position
                    </IndustrialCardDescription>
                  </IndustrialCardHeader>

                  <IndustrialCardContent className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      {' '}
                      <Label
                        htmlFor="title"
                        className="text-industrial-foreground font-semibold flex items-center gap-2"
                      >
                        <IndustrialIcon
                          icon="factory"
                          size="sm"
                          className="text-industrial-accent"
                        />
                        Job Title *
                      </Label>
                      <IndustrialInput
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange('title', e.target.value)
                        }
                        placeholder="e.g. Senior Frontend Developer"
                        required
                        className="border-industrial-border bg-white/80 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className="text-industrial-foreground font-semibold flex items-center gap-2"
                        >
                          <MapPin className="h-4 w-4 text-industrial-accent" />
                          Location *
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-industrial-muted-foreground" />
                          <IndustrialInput
                            id="location"
                            value={formData.location}
                            onChange={(e) =>
                              handleInputChange('location', e.target.value)
                            }
                            placeholder="e.g. Detroit, MI"
                            className="pl-10 border-industrial-border bg-white/80 focus:bg-white transition-colors"
                            required
                          />
                        </div>
                      </div>{' '}
                      <div className="space-y-2">
                        <Label
                          htmlFor="jobType"
                          className="text-industrial-foreground font-semibold flex items-center gap-2"
                        >
                          <Briefcase className="h-4 w-4 text-industrial-accent" />
                          Job Type *
                        </Label>
                        <Select
                          value={formData.jobType}
                          onValueChange={(value) =>
                            handleInputChange('jobType', value)
                          }
                        >
                          <SelectTrigger className="border-industrial-border bg-white/80 focus:bg-white transition-colors">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200">
                            {jobTypes.map((type) => (
                              <SelectItem
                                key={type}
                                value={type}
                                className="text-gray-900 hover:bg-gray-50"
                              >
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>{' '}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="salary"
                          className="text-industrial-foreground font-semibold flex items-center gap-2"
                        >
                          <DollarSign className="h-4 w-4 text-industrial-accent" />
                          Salary (Annual)
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-industrial-muted-foreground" />
                          <IndustrialInput
                            id="salary"
                            type="number"
                            min="0"
                            value={formData.salary}
                            onChange={(e) =>
                              handleInputChange('salary', e.target.value)
                            }
                            placeholder="e.g. 80000"
                            className="pl-10 border-industrial-border bg-white/80 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="deadline"
                          className="text-industrial-foreground font-semibold flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4 text-industrial-accent" />
                          Application Deadline
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-industrial-muted-foreground" />
                          <IndustrialInput
                            id="deadline"
                            type="date"
                            min={getTomorrowDate()}
                            value={formData.applicationDeadline}
                            onChange={(e) =>
                              handleInputChange(
                                'applicationDeadline',
                                e.target.value
                              )
                            }
                            className="pl-10 border-industrial-border bg-white/80 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>
                    </div>{' '}
                    <div className="space-y-2">
                      <Label
                        htmlFor="description"
                        className="text-industrial-foreground font-semibold flex items-center gap-2"
                      >
                        <IndustrialIcon
                          icon="gear"
                          size="sm"
                          className="text-industrial-accent"
                        />
                        Job Description *
                      </Label>
                      <textarea
                        id="description"
                        className="flex min-h-[120px] w-full rounded-md border border-industrial-border bg-white/80 focus:bg-white px-3 py-2 text-sm text-industrial-foreground ring-offset-background placeholder:text-industrial-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange('description', e.target.value)
                        }
                        placeholder="Describe the role, responsibilities, and what you're looking for in an industrial setting..."
                        required
                      />
                    </div>
                  </IndustrialCardContent>
                </IndustrialCard>{' '}
                {/* Requirements Card - Enhanced */}
                <motion.div variants={metalCardVariants} whileHover="hover">
                  <IndustrialCard className="relative overflow-hidden border-l-4 border-l-industrial-safety-400 bg-gradient-to-br from-industrial-safety-50 to-industrial-safety-100">
                    {/* Metal grid pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03]">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `
                          radial-gradient(circle at 1px 1px, rgba(234, 179, 8, 0.3) 1px, transparent 0),
                          linear-gradient(45deg, transparent 24%, rgba(234, 179, 8, 0.1) 25%, rgba(234, 179, 8, 0.1) 26%, transparent 27%, transparent 74%, rgba(234, 179, 8, 0.1) 75%, rgba(234, 179, 8, 0.1) 76%, transparent 77%)
                        `,
                          backgroundSize: '20px 20px, 60px 60px',
                        }}
                      />
                    </div>

                    {/* Safety yellow gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-industrial-safety-400/5 to-transparent opacity-50" />

                    <IndustrialCardHeader className="relative z-10">
                      <IndustrialCardTitle className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <IndustrialIcon
                            icon="wrench"
                            size="md"
                            className="text-industrial-safety-400"
                          />
                        </motion.div>
                        <span className="text-industrial-foreground font-bold">
                          Requirements
                        </span>
                      </IndustrialCardTitle>
                      <IndustrialCardDescription className="text-industrial-muted-foreground">
                        Skills and qualifications needed for this position
                      </IndustrialCardDescription>
                    </IndustrialCardHeader>

                    <IndustrialCardContent className="space-y-4 relative z-10">
                      <div className="flex gap-2">
                        <IndustrialInput
                          value={newRequirement}
                          onChange={(e) => setNewRequirement(e.target.value)}
                          placeholder="Add a requirement..."
                          onKeyPress={(e) =>
                            e.key === 'Enter' &&
                            (e.preventDefault(), addRequirement())
                          }
                          className="border-industrial-border bg-white/80 focus:bg-white transition-colors"
                        />
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="button"
                            onClick={addRequirement}
                            size="sm"
                            variant="industrial-accent"
                            className="shrink-0 shadow-lg hover:shadow-xl transition-shadow"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>

                      {formData.requirements.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.requirements.map((requirement, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge
                                variant="industrial-secondary"
                                className="flex items-center gap-1 shadow-sm hover:shadow-md transition-shadow"
                              >
                                {requirement}
                                <X
                                  className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                                  onClick={() => removeRequirement(requirement)}
                                />
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>{' '}
                {/* Benefits Card - Enhanced */}
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
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <IndustrialIcon
                            icon="cog"
                            size="md"
                            className="text-industrial-navy-400"
                          />
                        </motion.div>
                        <span className="text-industrial-foreground font-bold">
                          Benefits
                        </span>
                      </IndustrialCardTitle>
                      <IndustrialCardDescription className="text-industrial-muted-foreground">
                        What you offer to employees
                      </IndustrialCardDescription>
                    </IndustrialCardHeader>

                    <IndustrialCardContent className="space-y-4 relative z-10">
                      <div className="flex gap-2">
                        <IndustrialInput
                          value={newBenefit}
                          onChange={(e) => setNewBenefit(e.target.value)}
                          placeholder="Add a benefit..."
                          onKeyPress={(e) =>
                            e.key === 'Enter' &&
                            (e.preventDefault(), addBenefit())
                          }
                          className="border-industrial-border bg-white/80 focus:bg-white transition-colors"
                        />
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="button"
                            onClick={addBenefit}
                            size="sm"
                            variant="industrial-accent"
                            className="shrink-0 shadow-lg hover:shadow-xl transition-shadow"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>

                      {formData.benefits.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.benefits.map((benefit, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge
                                variant="industrial-outline"
                                className="flex items-center gap-1 shadow-sm hover:shadow-md transition-shadow"
                              >
                                {benefit}
                                <X
                                  className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                                  onClick={() => removeBenefit(benefit)}
                                />
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>
              </motion.div>

              {/* Enhanced Preview/Summary Section */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <motion.div variants={metalCardVariants} whileHover="hover">
                  <IndustrialCard className="relative overflow-hidden border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100">
                    {/* Metal grid pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03]">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `
                          radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.3) 1px, transparent 0),
                          linear-gradient(45deg, transparent 24%, rgba(16, 185, 129, 0.1) 25%, rgba(16, 185, 129, 0.1) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1) 76%, transparent 77%)
                        `,
                          backgroundSize: '20px 20px, 60px 60px',
                        }}
                      />
                    </div>

                    {/* Emerald gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50" />

                    <IndustrialCardHeader className="relative z-10">
                      <IndustrialCardTitle className="flex items-center gap-3">
                        <motion.div
                          whileHover={{
                            rotateY: 360,
                            scale: 1.2,
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <IndustrialIcon
                            icon="factory"
                            size="md"
                            className="text-emerald-500"
                          />
                        </motion.div>
                        <span className="text-industrial-foreground font-bold">
                          Live Preview
                        </span>
                      </IndustrialCardTitle>
                      <IndustrialCardDescription className="text-industrial-muted-foreground">
                        How your gig will appear to industrial workers
                      </IndustrialCardDescription>
                    </IndustrialCardHeader>

                    <IndustrialCardContent className="space-y-6 relative z-10">
                      {/* Job Title and Company */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="font-bold text-xl text-industrial-foreground bg-gradient-to-r from-industrial-foreground to-industrial-accent bg-clip-text">
                          {formData.title || 'Job Title Preview'}
                        </h3>
                        <p className="text-sm text-industrial-muted-foreground flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-industrial-accent" />
                          {user?.companyName || user?.name || 'Your Company'}
                        </p>
                      </motion.div>

                      {/* Job Details Grid */}
                      <div className="grid grid-cols-1 gap-3">
                        {formData.location && (
                          <motion.div
                            className="flex items-center gap-3 p-2 rounded-lg bg-white/50 border border-industrial-border/50"
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <MapPin className="h-4 w-4 text-industrial-accent" />
                            <span className="text-sm font-medium text-industrial-foreground">
                              {formData.location}
                            </span>
                          </motion.div>
                        )}

                        {formData.jobType && (
                          <motion.div
                            className="flex items-center gap-3 p-2 rounded-lg bg-white/50 border border-industrial-border/50"
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Briefcase className="h-4 w-4 text-industrial-accent" />
                            <span className="text-sm font-medium text-industrial-foreground">
                              {formData.jobType}
                            </span>
                          </motion.div>
                        )}

                        {formData.salary && (
                          <motion.div
                            className="flex items-center gap-3 p-2 rounded-lg bg-white/50 border border-industrial-border/50"
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <DollarSign className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm font-bold text-emerald-600">
                              ${Number(formData.salary).toLocaleString()}/year
                            </span>
                          </motion.div>
                        )}

                        {formData.applicationDeadline && (
                          <motion.div
                            className="flex items-center gap-3 p-2 rounded-lg bg-white/50 border border-industrial-border/50"
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Clock className="h-4 w-4 text-industrial-safety-400" />
                            <span className="text-sm font-medium text-industrial-foreground">
                              Apply by{' '}
                              {new Date(
                                formData.applicationDeadline
                              ).toLocaleDateString()}
                            </span>
                          </motion.div>
                        )}
                      </div>

                      {/* Requirements and Benefits Preview */}
                      {formData.requirements.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-bold text-sm text-industrial-foreground flex items-center gap-2">
                            <IndustrialIcon
                              icon="wrench"
                              size="sm"
                              className="text-industrial-safety-400"
                            />
                            Requirements
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.requirements
                              .slice(0, 3)
                              .map((req, index) => (
                                <motion.div
                                  key={index}
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Badge
                                    variant="industrial-secondary"
                                    className="text-xs shadow-sm"
                                  >
                                    {req}
                                  </Badge>
                                </motion.div>
                              ))}
                            {formData.requirements.length > 3 && (
                              <Badge
                                variant="industrial-secondary"
                                className="text-xs bg-industrial-accent/20 text-industrial-accent border-industrial-accent/30"
                              >
                                +{formData.requirements.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {formData.benefits.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-bold text-sm text-industrial-foreground flex items-center gap-2">
                            <IndustrialIcon
                              icon="cog"
                              size="sm"
                              className="text-industrial-navy-400"
                            />
                            Benefits
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.benefits
                              .slice(0, 3)
                              .map((benefit, index) => (
                                <motion.div
                                  key={index}
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Badge
                                    variant="industrial-outline"
                                    className="text-xs shadow-sm"
                                  >
                                    {benefit}
                                  </Badge>
                                </motion.div>
                              ))}
                            {formData.benefits.length > 3 && (
                              <Badge
                                variant="industrial-outline"
                                className="text-xs bg-industrial-navy-400/20 text-industrial-navy-400 border-industrial-navy-400/30"
                              >
                                +{formData.benefits.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </IndustrialCardContent>
                  </IndustrialCard>
                </motion.div>

                {/* Enhanced Action Buttons */}
                <motion.div
                  className="flex flex-col gap-3"
                  variants={itemVariants}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isCreating}
                      className="w-full h-12 bg-gradient-to-r from-industrial-accent to-industrial-safety-400 hover:from-industrial-accent/90 hover:to-industrial-safety-400/90 text-industrial-dark font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                      variant="industrial-accent"
                    >
                      {isCreating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            className="mr-2"
                          >
                            <IndustrialIcon icon="gear" size="sm" />
                          </motion.div>
                          Creating Gig...
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5 mr-2" />
                          Create Industrial Gig
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="industrial-outline"
                      onClick={() => router.back()}
                      disabled={isCreating}
                      className="w-full h-10 border-industrial-border hover:bg-industrial-muted/50 text-industrial-foreground transition-all duration-300"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
}

export default withAuth(CreateGigPage, {
  allowedUserTypes: [UserType.STARTUP],
});
