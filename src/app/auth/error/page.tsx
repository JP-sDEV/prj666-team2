'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-red-600">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error === 'AccessDenied'
              ? 'You do not have permission to sign in.'
              : error === 'Configuration'
                ? 'There is a problem with the server configuration.'
                : 'An error occurred while trying to sign in.'}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
