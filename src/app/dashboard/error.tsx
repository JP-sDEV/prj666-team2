'use client';

import { Container, Main, Section } from '@/components/craft';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Main className="min-h-screen flex items-center justify-center">
      <Section>
        <Container>
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <div className="space-x-4">
              <button
                onClick={reset}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Try again
              </button>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Return Home
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </Main>
  );
} 
