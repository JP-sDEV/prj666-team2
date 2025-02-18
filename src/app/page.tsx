'use client';

import { useSession } from 'next-auth/react';
import Hero from '@/components/home-page/hero';
import FeatureArticle from '@/components/home-page/feature-article';
import Footer from '@/components/footer';
import { Container, Main, Section } from '@/components/craft';

export default function Page() {
  const { data: session, status } = useSession();

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
          <Hero session={session} />
          <FeatureArticle />
          <Footer />
        </Container>
      </Section>
    </Main>
  );
}
