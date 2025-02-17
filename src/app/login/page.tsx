'use client';

import { Container, Main, Section } from '@/components/craft';
import Link from 'next/link';
import LoginButton from '@/components/auth/LoginButton';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      router.replace('/dashboard');
    }
  }, [session, router]);

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Don't show login form if already authenticated
  if (session) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/dashboard',
        redirect: false,
      });

      if (result?.error) {
        // Show specific error messages based on the error
        if (result.error === 'User not found') {
          toast.error('No account found with this email');
        } else if (result.error === 'Invalid password') {
          toast.error('Incorrect password');
        } else {
          toast.error('Invalid credentials');
        }
        setIsLoading(false);
        return;
      }

      // Success
      toast.success('Login successful!');
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error('An error occurred during login');
      setIsLoading(false);
    }
  };

  return (
    <Main className="min-h-screen flex items-center justify-center">
      <Section className="w-full max-w-[600px]">
        <Container>
          <div className="mx-auto space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-500">Enter your credentials to sign in</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border p-3"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full rounded-md border p-3"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-3 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
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
