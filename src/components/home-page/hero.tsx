// React and Next.js imports
import Image from "next/image";
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";
import { ArrowRight } from "lucide-react";

// Local component imports
import { Section, Container } from "@/components/craft";
import { Button } from "../ui/button";

// Asset imports
import Placeholder from "../../../public/placeholder.webp";
import React from "react";

  
const Hero = () => {

      
  return (
    <Section>
      <Container>
        <div>
          <Button
            asChild
            className="mb-6 w-fit"
            size={"sm"}
            variant={"outline"}
          > 
            <Link className="not-prose" href="https://9d8.dev">
              Lorem ipsum dolor sit amet <ArrowRight className="w-4" />
            </Link>
   
           </Button>   
          <h1>
            <Balancer>
              DataSense
            </Balancer>
          </h1>
          <h3 className="text-muted-foreground">
            <Balancer>
               Unlock the power of real-time sensor data with DataSense. 
               Streamline your operations, optimize resources, 
               and gain actionable insights with our intuitive dashboard and advanced analytics
            </Balancer>
          </h3>
          <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <Image
              className="h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
