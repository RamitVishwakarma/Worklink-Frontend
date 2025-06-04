'use client';

import { SigninForm } from '@/components/auth';

export default function SigninPage() {
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center py-12">
      <SigninForm />
    </div>
  );
}
