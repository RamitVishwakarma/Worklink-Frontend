'use client';

import { useState } from 'react';
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
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <IndustrialIcon icon="factory" size="lg" color="accent" />
              <div>
                <IndustrialHeader level={1} className="mb-2">
                  Create New Gig
                </IndustrialHeader>
                <p className="text-industrial-muted-foreground">
                  Post a new job opportunity and find the perfect candidates
                </p>
              </div>
            </div>
          </motion.div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <motion.div
                className="lg:col-span-2 space-y-6"
                variants={itemVariants}
              >
                <IndustrialCard>
                  {' '}
                  <IndustrialCardHeader>
                    <IndustrialCardTitle className="flex items-center gap-2">
                      <IndustrialIcon icon="gear" size="md" color="primary" />
                      Job Details
                    </IndustrialCardTitle>
                    <IndustrialCardDescription>
                      Basic information about the position
                    </IndustrialCardDescription>
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="title"
                        className="text-industrial-foreground"
                      >
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
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className="text-industrial-foreground"
                        >
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
                            placeholder="e.g. New York, NY"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="jobType"
                          className="text-industrial-foreground"
                        >
                          Job Type *
                        </Label>
                        <Select
                          value={formData.jobType}
                          onValueChange={(value) =>
                            handleInputChange('jobType', value)
                          }
                        >
                          <SelectTrigger className="border-industrial-border bg-industrial-muted/20">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            {jobTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="salary"
                          className="text-industrial-foreground"
                        >
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
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="deadline"
                          className="text-industrial-foreground"
                        >
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
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="description"
                        className="text-industrial-foreground"
                      >
                        Job Description *
                      </Label>
                      <textarea
                        id="description"
                        className="flex min-h-[120px] w-full rounded-md border border-industrial-border bg-industrial-muted/20 px-3 py-2 text-sm text-industrial-foreground ring-offset-background placeholder:text-industrial-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange('description', e.target.value)
                        }
                        placeholder="Describe the role, responsibilities, and what you're looking for..."
                        required
                      />
                    </div>
                  </IndustrialCardContent>
                </IndustrialCard>{' '}
                <IndustrialCard>
                  <IndustrialCardHeader>
                    <IndustrialCardTitle className="flex items-center gap-2">
                      <IndustrialIcon icon="wrench" size="md" color="primary" />
                      Requirements
                    </IndustrialCardTitle>
                    <IndustrialCardDescription>
                      Skills and qualifications needed for this position
                    </IndustrialCardDescription>
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="space-y-4">
                    <div className="flex gap-2">
                      <IndustrialInput
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        placeholder="Add a requirement..."
                        onKeyPress={(e) =>
                          e.key === 'Enter' &&
                          (e.preventDefault(), addRequirement())
                        }
                      />
                      <Button
                        type="button"
                        onClick={addRequirement}
                        size="sm"
                        variant="industrial-accent"
                        className="shrink-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {formData.requirements.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.requirements.map((requirement, index) => (
                          <Badge
                            key={index}
                            variant="industrial-secondary"
                            className="flex items-center gap-1"
                          >
                            {requirement}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-destructive"
                              onClick={() => removeRequirement(requirement)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </IndustrialCardContent>
                </IndustrialCard>{' '}
                <IndustrialCard>
                  <IndustrialCardHeader>
                    <IndustrialCardTitle className="flex items-center gap-2">
                      <IndustrialIcon icon="cog" size="md" color="primary" />
                      Benefits
                    </IndustrialCardTitle>
                    <IndustrialCardDescription>
                      What you offer to employees
                    </IndustrialCardDescription>
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="space-y-4">
                    <div className="flex gap-2">
                      <IndustrialInput
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        placeholder="Add a benefit..."
                        onKeyPress={(e) =>
                          e.key === 'Enter' &&
                          (e.preventDefault(), addBenefit())
                        }
                      />
                      <Button
                        type="button"
                        onClick={addBenefit}
                        size="sm"
                        variant="industrial-accent"
                        className="shrink-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {formData.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.benefits.map((benefit, index) => (
                          <Badge
                            key={index}
                            variant="industrial-outline"
                            className="flex items-center gap-1"
                          >
                            {benefit}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-destructive"
                              onClick={() => removeBenefit(benefit)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </IndustrialCardContent>
                </IndustrialCard>
              </motion.div>

              {/* Preview/Summary */}
              <motion.div className="space-y-6" variants={itemVariants}>
                {' '}
                <IndustrialCard>
                  <IndustrialCardHeader>
                    <IndustrialCardTitle className="flex items-center gap-2">
                      <IndustrialIcon
                        icon="factory"
                        size="md"
                        color="primary"
                      />
                      Preview
                    </IndustrialCardTitle>
                    <IndustrialCardDescription>
                      How your gig will appear to workers
                    </IndustrialCardDescription>
                  </IndustrialCardHeader>
                  <IndustrialCardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-industrial-foreground">
                        {formData.title || 'Job Title'}
                      </h3>
                      <p className="text-sm text-industrial-muted-foreground flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {user?.companyName || user?.name || 'Your Company'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {formData.location && (
                        <div className="flex items-center gap-2 text-sm text-industrial-foreground">
                          <MapPin className="h-4 w-4 text-industrial-muted-foreground" />
                          {formData.location}
                        </div>
                      )}

                      {formData.jobType && (
                        <div className="flex items-center gap-2 text-sm text-industrial-foreground">
                          <Briefcase className="h-4 w-4 text-industrial-muted-foreground" />
                          {formData.jobType}
                        </div>
                      )}

                      {formData.salary && (
                        <div className="flex items-center gap-2 text-sm text-industrial-foreground">
                          <DollarSign className="h-4 w-4 text-industrial-muted-foreground" />
                          ${Number(formData.salary).toLocaleString()}/year
                        </div>
                      )}

                      {formData.applicationDeadline && (
                        <div className="flex items-center gap-2 text-sm text-industrial-foreground">
                          <Clock className="h-4 w-4 text-industrial-muted-foreground" />
                          Apply by{' '}
                          {new Date(
                            formData.applicationDeadline
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {formData.requirements.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-industrial-foreground">
                          Requirements
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {formData.requirements
                            .slice(0, 3)
                            .map((req, index) => (
                              <Badge
                                key={index}
                                variant="industrial-secondary"
                                className="text-xs"
                              >
                                {req}
                              </Badge>
                            ))}
                          {formData.requirements.length > 3 && (
                            <Badge
                              variant="industrial-secondary"
                              className="text-xs"
                            >
                              +{formData.requirements.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </IndustrialCardContent>
                </IndustrialCard>
                <div className="flex flex-col gap-2">
                  {' '}
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="w-full"
                    variant="industrial-accent"
                  >
                    {isCreating ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Gig
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="industrial-outline"
                    onClick={() => router.back()}
                    disabled={isCreating}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
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
