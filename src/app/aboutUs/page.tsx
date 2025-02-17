'use client';
import { FC } from 'react';
import Image from 'next/image';

const AboutUsPage: FC = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center p-8 bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="!mt-20 text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Porta ultrices sollicitudin rutrum
          ligula; fusce metus vehicula. Sagittis varius ornare laoreet nec tellus. Egestas
          sollicitudin metus ultricies, orci hendrerit sapien fermentum facilisis. Eu fames nisl
          suscipit nunc etiam montes litora. Bibendum magnis habitasse habitasse faucibus eget
          sociosqu porttitor
        </p>
      </div>

      <div className="flex flex-col items-center mb-8">
        <Image
          src="/aboutUs-image.jpg" // Add a relevant image to this path
          alt="About Us"
          width={600}
          height={400}
          className="rounded-lg shadow-xl"
        />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="max-w-2xl mx-auto">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Porta ultrices sollicitudin rutrum
          ligula; fusce metus vehicula. Sagittis varius ornare laoreet nec tellus. Egestas
          sollicitudin metus ultricies, orci hendrerit sapien fermentum facilisis. Eu fames nisl
          suscipit nunc etiam montes litora. Bibendum magnis habitasse habitasse faucibus eget
          sociosqu porttitor
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
