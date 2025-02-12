'use client';

import { useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Fabrika</h1>

        <div className="text-center mb-8">
          <p className="text-xl">
            {session ? (
              <>Hello, {session.user?.name || session.user?.email}!</>
            ) : (
              <>Please sign in to get started</>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Feature 1</h2>
            <p>Description of feature 1</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Feature 2</h2>
            <p>Description of feature 2</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Feature 3</h2>
            <p>Description of feature 3</p>
          </div>
        </div>
      </div>
    </main>
  );
}
