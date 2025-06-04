import React from 'react';
import { Hero } from '@/components/homepage/hero';
import { ValueProposition } from '@/components/homepage/value-proposition';
import { HowItWorks } from '@/components/homepage/how-it-works';
import { FeaturesGrid } from '@/components/homepage/features-grid';
import { TrustIndicators } from '@/components/homepage/trust-indicators';

const Page = () => {
  return (
    <>
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <FeaturesGrid />
      <TrustIndicators />
    </>
  );
};

export default Page;
