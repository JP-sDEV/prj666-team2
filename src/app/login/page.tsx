'use client';

import { Container, Main, Section } from '@/components/craft';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import LoginButton from '@/components/auth/LoginButton';

export default function LoginPage() {
  return (
    <Main className="min-h-screen flex items-center justify-center">
      <Section className="w-full max-w-[600px]">
        <Container>
          <div className="mx-auto space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-500">Enter your credentials to sign in</p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border p-3"
                  required
                />
              </div>
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md border p-3"
                  required
                />
              </div>
              <button type="submit" className="w-full rounded-md bg-blue-600 p-3 text-white">
                Sign In
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="w-full">
              <LoginButton className="w-full" />
            </div>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Container>
      </Section>
    </Main>
  );
}
