'use client';

import { Container, Main, Section } from '@/components/craft';
import Link from 'next/link';
import LoginButton from '@/components/auth/LoginButton';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordValidation {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string): PasswordValidation => {
    return {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate password
    const validation = validatePassword(formData.password);
    if (!Object.values(validation).every(Boolean)) {
      setIsLoading(false);
      toast.error('Please meet all password requirements');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'User already exists') {
          toast.error('An account with this email already exists. Please sign in instead.');
          return;
        }
        throw new Error(data.error || 'Registration failed');
      }

      toast.success('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get password validation status
  const passwordValidation = validatePassword(formData.password);

  return (
    <Main className="min-h-screen flex items-center justify-center">
      <Section>
        <Container>
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-gray-500">Enter your details to get started</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full rounded-md border p-2"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full rounded-md border p-2"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-md border p-2"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className={`w-full rounded-md border p-2 ${
                      formData.password && !Object.values(passwordValidation).every(Boolean)
                        ? 'border-red-500'
                        : ''
                    }`}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="text-sm space-y-1 mt-2">
                    <p
                      className={
                        passwordValidation.hasMinLength ? 'text-green-600' : 'text-red-500'
                      }
                    >
                      ✓ At least 8 characters
                    </p>
                    <p
                      className={
                        passwordValidation.hasUpperCase ? 'text-green-600' : 'text-red-500'
                      }
                    >
                      ✓ At least one uppercase letter
                    </p>
                    <p className={passwordValidation.hasNumber ? 'text-green-600' : 'text-red-500'}>
                      ✓ At least one number
                    </p>
                    <p
                      className={
                        passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-500'
                      }
                    >
                      ✓ At least one special character
                    </p>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-2 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={isLoading || !Object.values(passwordValidation).every(Boolean)}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
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
