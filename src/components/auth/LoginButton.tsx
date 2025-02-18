'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

interface LoginButtonProps {
  className?: string;
}

export default function LoginButton({ className }: LoginButtonProps) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/login' });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <button
        disabled
        className={`flex items-center justify-center gap-2 px-4 py-2 font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed ${className}`}
      >
        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Loading...
      </button>
    );
  }

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="rounded-full"
              width={32}
              height={32}
            />
          )}
          <span className="text-sm font-medium text-gray-700">
            {session.user.name || session.user.email}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className={`flex items-center justify-center rounded-md border p-3 ${className}`}
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      Sign in with Google
    </button>
  );
}
