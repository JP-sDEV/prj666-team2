import { Inter, JetBrains_Mono, Rajdhani } from 'next/font/google';
import './globals.css';
import React from 'react';
import connectToDatabase from '@/lib/mongodb';
import { Providers } from './providers';
import { metadata } from './metadata';
import { ToasterProvider } from '@/components/providers/toaster-provider';

//Font Family
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});
const jetBrainsMono = JetBrains_Mono({
  variable: '--font-mono',
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
        className={`${inter.variable} ${jetBrainsMono.variable} ${rajdhani.variable} antialiased`}
      >
        <Providers>
          {children}
          <ToasterProvider />
        </Providers>
      </body>
    </html>
  );
}
