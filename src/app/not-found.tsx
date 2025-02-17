'use client';

import { Container, Main, Section } from '@/components/craft';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Main className="min-h-screen flex items-center justify-center">
      <Section>
        <Container>
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl text-gray-600">This page could not be found.</p>
            <div className="pt-6">
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
