'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Container, Main, Section } from '@/components/craft';
import React, { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession({
    // required: true,
    // onUnauthenticated() {
    //   redirect('/login');
    // },
    required: false,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if there is no session, indicating the user is in trial mode
    if (!session?.user) {
      // Create a trial user in the database if no session exists
      const createTrialUser = async () => {
        const trialUserData = {
          email: 'trialuser@example.com',
          id: 'trial-user-id',
          name: 'Trial User',
        };

        // Save the trial user in the database (mocked API call)
        const response = await fetch('/api/create-trial-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(trialUserData),
        });

        if (response.ok) {
          const newUser = await response.json();
          setUser(newUser); // Set the user state to the created trial user
        }
      };

      createTrialUser();
    } else {
      // Use session user if logged in
      setUser(session.user);
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Main>
      <Section>
        <Container>
          <div className="py-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-2">Welcome, {session?.user?.email}</h2>
              <p className="text-gray-600">
                This is a protected route. You can only see this if you&apos;re logged in.
              </p>

              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">Your Account Details:</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">Email:</span> {session?.user?.email}
                  </li>
                  <li>
                    <span className="font-medium">User ID:</span> {session?.user?.id}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Main>
  );
}
