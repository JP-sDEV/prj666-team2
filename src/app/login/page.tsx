import { Container, Main, Section } from '@/components/craft';
import LoginForm from '@/components/login/login-form';
import Footer from '@/components/footer';

export default function LoginPage() {
  return (
    <Main>
      <Section>
        <Container>
          <LoginForm />
          <Footer />
        </Container>
      </Section>
    </Main>
  );
}
