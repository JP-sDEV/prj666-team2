import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react'; // 사용할 아이콘
import { Section, Container } from '@/components/craft';

type FAQItem = {
  question: string;
  answer: string;
  link?: string;
};

const content: FAQItem[] = [
  {
    question: 'Is it possible to read real-time data from my logger?',
    answer:
      'An external waterproof connection can be fitted to most RBR data loggers as an optional extra at the time of manufacture.',
  },
  {
    question: 'My logger doesn’t communicate',
    answer:
      'Make sure you are using the correct download cable for your instruments, and check to make sure that it is not damaged or faulty. If possible try the cable with another RBR instrument to see if a connection can be established. It automatically connects to the logger by searching for the COM port the CPU has assigned to the USB port. This process may take a few seconds, so please wait at least 30 s to one minute to ensure that Ruskin has found the logger',
  },
  {
    question: 'What communications options are available?',
    answer:
      'All current instruments support USB as standard. In the Compact Logger family the micro USB connector is used internally, whereas for the Standard Logger family the 30 pin Apple connector is used. Cables for both these connectors are available globally from any consumer electronics source, in case you need to replace the cable supplied with the instrument.  In addition, RS-232 and RS-485 serial connections are available on the Standard Logger family. In fact, the 30 pin connector contains pins for not only USB but also the serial connection simultaneously. The most convenient way of accessing the serial lines is to change the battery end cap (BEC) as there are variants wired for external USB, RS-232, and RS-485 (full duplex) all available.',
  },
  {
    question: 'What is the maximum cable length for serial RS-232 transmission?',
    answer:
      'RBR uses generic RS-232 protocol. The maximum length depends on the quality of the cable used and the baud rate but we have had success over greater than 200m at 9600 baud',
  },
];

const FAQ = () => {
  return (
    <Section>
      <Container>
        <h1 className="!mt-20 text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <h2 className="text-muted-foreground">
          Can&apos;t find the answer you&apos;re looking for? Reach out to our customer support
          team.
        </h2>
        <div className="not-prose mt-20 flex flex-col gap-5 md:mt-8">
          {content.map((item, index) => (
            <Accordion.Root key={index} type="single" collapsible>
              <Accordion.Item
                value={item.question}
                className="rounded-md border bg-muted/20 px-4 transition-all hover:bg-muted/70"
              >
                <Accordion.Trigger className="text-left flex justify-between items-center py-4">
                  <span>{item.question}</span>
                  <ChevronDown
                    size={18}
                    className="transition-transform duration-300 transform rotate-0 group-open:rotate-180"
                  />
                </Accordion.Trigger>
                <Accordion.Content className="text-base md:w-3/4 overflow-hidden transition-all duration-300 ease-in-out">
                  {item.answer}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
