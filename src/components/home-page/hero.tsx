// React and Next.js imports
import Image from 'next/image';
import Link from 'next/link';
import { Session } from 'next-auth';

// Third-party library imports
import Balancer from 'react-wrap-balancer';
import { ArrowRight } from 'lucide-react';

// Local component imports
import { Section, Container } from '@/components/craft';
import { Button } from '../ui/button';

// Asset imports
import Placeholder from '../../../public/main-unsplash.jpg';
import React from 'react';

interface HeroProps {
  session: Session | null;
}

const Hero = ({ session }: HeroProps) => {
  return (
    <Section>
      <Container>
        <div>
          <Button asChild className="mb-6 w-fit border rounded-md px-4 py-2 hover:bg-gray-100">
            {session ? (
              <Link className="not-prose" href="/dashboard">
                Go to Dashboard <ArrowRight className="w-4" />
              </Link>
            ) : (
              <Link className="not-prose" href="/dashboard">
                Try it free <ArrowRight className="w-4" />
              </Link>
            )}
          </Button>

          <div className="text-[65px] font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg font-rajdhani">
            <Balancer>DataSense</Balancer>
          </div>

          <h3 className="text-muted-foreground">
            <Balancer>
              {session ? (
                <>Welcome back, {session.user?.name || session.user?.email}!</>
              ) : (
                <>
                  Unlock the power of real-time sensor data with DataSense. Streamline your
                  operations, optimize resources, and gain actionable insights with our intuitive
                  dashboard and advanced analytics
                </>
              )}
            </Balancer>
          </h3>
          <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <Image
              className="h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              priority
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
