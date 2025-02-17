'use client';
import { FC } from 'react';
import Image from 'next/image';
import { FaRocket, FaUsers, FaHandshake } from 'react-icons/fa';

const AboutUsPage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="!mt-20 text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Culture</h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center items-center">
            <Image
              src="/aboutUs-unsplash.jpg" // 이미지 경로
              alt="image"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-start space-x-4 text-left">
              <FaRocket size={30} className="text-black" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Vision</h2>
                <p className="text-xs text-gray-600">
                  Our vision is to revolutionize the industry with innovative technology solutions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 text-left">
              <FaUsers size={30} className="text-black" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mission</h2>
                <p className="text-xs text-gray-600">
                  Our mission is to empower organizations by providing them with cutting-edge tools
                  for success.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 text-left">
              <FaHandshake size={30} className="text-black" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Value</h2>
                <p className="text-xs text-gray-600">
                  We believe in integrity, collaboration, and excellence in everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8 w-[2000px] max-w-full">
        <h2 className="!mt-15 text-4xl font-bold mb-4">Contact Us</h2>
        <div className="text-left max-w-7xl mx-auto border p-8 rounded-lg shadow-lg mt-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Email</h3>
              <p className="text-sm text-gray-600">contact@company.com</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Phone</h3>
              <p className="text-sm text-gray-600">+1 (234) 567-890</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Address</h3>
              <p className="text-sm text-gray-600">123 Company St, City, Country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
