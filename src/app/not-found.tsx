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
              className="text-gray-500 mb-4"
            />
            <IndustrialHeader level={1} className="mb-4 text-gray-800">
              404 - Page Not Found
            </IndustrialHeader>
            <p className="text-gray-600 text-lg mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/">Go Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </IndustrialContainer>
    </IndustrialLayout>
  );
}
