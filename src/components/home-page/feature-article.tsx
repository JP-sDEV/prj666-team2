// React and Next.js imports
import Link from 'next/link';

// Third-party library imports
import Balancer from 'react-wrap-balancer';

// UI component imports
import { Section, Container } from '@/components/craft';

// Icon imports
import { Coins, ArrowRight } from 'lucide-react';
import { JSX } from 'react';

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
  href?: string;
  cta?: string;
};

const featureText: FeatureText[] = [
  {
    icon: undefined,
    title: 'Mobile Internet of Things (IoT) Multi-sensor Data Fusion',
    href: 'https://onlinelibrary.wiley.com/doi/toc/10.1155/9071.si.751421',
    description: 'Multi sensor data fusion technology is to use multiple sensors to collect... ',
    cta: 'Learn More',
  },
  {
    icon: undefined,
    title: 'Better, Faster, Stronger Soil Data Can Feed the Planet ',
    href: 'https://news.uoguelph.ca/2024/12/better-faster-stronger-soil-data-can-feed-the-planet/',
    description:
      'By 2030, the global population will reach 8.5 billion, driving an immense demand...',
    cta: 'Learn More',
  },
  {
    icon: undefined,
    title: 'Veris Technologies Unveils CoreScan Automated Soil Sensor Probe',
    href: 'https://www.precisionfarmingdealer.com/articles/6057-veris-technologies-unveils-corescan-automated-soil-sensor-probe',
    description: 'Veris Technologies, a pioneer in soil sensing technology...',
    cta: 'Learn More',
  },
  {
    icon: undefined,
    title: 'MoistTech highlights NIR tech for reliable moisture data on wood pellets',
    href: 'https://www.canadianbiomassmagazine.ca/moisttech-highlights-nir-tech-for-reliable-moisture-data-on-wood-pellets/',
    description: 'Sarasota, Fla.-based manufacturer MoistTech Corp.’s...',
    cta: 'Learn More',
  },
];

const FeatureArticle = () => {
  return (
    <Section className="border-b">
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">
            <Balancer>Revolutionizing Agriculture with Advanced Sensor Technologies</Balancer>
          </h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
              Utilizing IoT, Data Fusion, and Precision Sensing to Optimize Soil Data and Feed the
              Growing Global Population
            </Balancer>
          </h4>

          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-4">
            {featureText.map(({ icon, title, description, href, cta }, index) => (
              <Link
                href={`${href}`}
                className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                key={index}
              >
                <div className="grid gap-4">
                  {icon}
                  <h4 className="text-xl text-primary">{title}</h4>
                  <p className="text-base opacity-75">{description}</p>
                </div>
                {cta && (
                  <div className="flex h-fit items-center text-sm font-semibold">
                    <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default FeatureArticle;
