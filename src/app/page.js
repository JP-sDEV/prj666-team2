import Hero from "@/components/home-page/hero"
import FeatureArticle from "@/components/home-page/feature-article"
import { Container, Main, Section } from "@/components/craft";

export default function Page() {
  return (
    <Main>
      <Section>
        <Container>
          <Hero/>
          <FeatureArticle/>
        </Container>
      </Section>
    </Main>
  );
}
