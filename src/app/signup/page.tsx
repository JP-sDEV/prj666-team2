import { Container, Main, Section } from '@/components/craft';
import SignupForm from '@/components/signup/signup-form';
import Footer from '@/components/footer';

export default function SignupPage() {
  return (
    <Main>
      <Section>
        <Container>
          <SignupForm />
          <Footer />
        </Container>
      </Section>
    </Main>
  );
}
