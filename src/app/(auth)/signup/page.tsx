'use client';

import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center py-12 bg-gradient-to-br from-slate-900 to-slate-700">
      <SignupForm />
    </div>
  );
}
