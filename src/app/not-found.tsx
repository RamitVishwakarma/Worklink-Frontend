'use client';

import Link from 'next/link';
import {
  IndustrialLayout,
  IndustrialContainer,
  IndustrialHeader,
} from '@/components/ui/industrial-layout';
import { IndustrialIcon } from '@/components/ui/industrial-icon';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <IndustrialLayout>
      <IndustrialContainer>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-8">
            <IndustrialIcon
              icon="wrench"
              size="xl"
              className="text-industrial-muted-foreground mb-4"
            />
            <IndustrialHeader level={1} className="mb-4">
              404 - Page Not Found
            </IndustrialHeader>
            <p className="text-industrial-muted-foreground text-lg mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              asChild
              className="bg-industrial-primary hover:bg-industrial-primary/90"
            >
              <Link href="/">Go Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-industrial-border"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
}
