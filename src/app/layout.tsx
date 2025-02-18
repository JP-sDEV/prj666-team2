import { Geist, Geist_Mono, Rajdhani } from 'next/font/google';
import './globals.css';
import React from 'react';
import connectToDatabase from '@/lib/mongodb';
import { Providers } from './providers';
import { metadata } from './metadata';
import { ToasterProvider } from '@/components/providers/toaster-provider';

//Font Family
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-rajdhani',
});

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  connectToDatabase();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} antialiased`}
      >
        <Providers>
          {children}
          <ToasterProvider />
        </Providers>
      </body>
    </html>
  );
}
