import React from 'react';
import { Hero } from '@/components/homepage/hero';
import { ValueProposition } from '@/components/homepage/value-proposition';
import { HowItWorks } from '@/components/homepage/how-it-works';
import { FeaturesGrid } from '@/components/homepage/features-grid';
import { TrustIndicators } from '@/components/homepage/trust-indicators';
import { QuickNavigation } from '@/components/ui/navigation';
import { SiteMap } from '@/components/homepage/site-map';
import { RoleSelector } from '@/components/homepage/role-selector';

const Page = () => {
  return (
    <>
      <Hero />
      <ValueProposition />
      <RoleSelector />
      <HowItWorks />
      <FeaturesGrid />

      {/* Quick Navigation Section */}
      <section className="py-20 bg-industrial-gunmetal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-4xl text-industrial-gunmetal-800 mb-4">
              Get Started Today
            </h2>
            <p className="text-industrial-gunmetal-600 max-w-2xl mx-auto">
              Choose your path and start connecting with the industrial
              community
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <QuickNavigation />
          </div>
        </div>
      </section>

      <SiteMap />
      <TrustIndicators />
    </>
  );
};

export default Page;
