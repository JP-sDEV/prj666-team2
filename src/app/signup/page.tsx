'use client';

import { Container, Main, Section } from '@/components/craft';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import LoginButton from '@/components/auth/LoginButton';

export default function SignUpPage() {
  return (
    <Main className="min-h-screen flex items-center justify-center">
      <Section>
        <Container>
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-gray-500">Enter your details to get started</p>
            </div>

            <form className="space-y-4">
              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full rounded-md border p-2"
                    required
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full rounded-md border p-2"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border p-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md border p-2"
                  required
                />
              </div>
              <button type="submit" className="w-full rounded-md bg-blue-600 p-2 text-white">
                Sign Up
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
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Container>
      </Section>
    </Main>
  );
}
