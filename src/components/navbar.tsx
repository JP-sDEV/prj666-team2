'use client';

import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import LoginButton from './auth/LoginButton';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFields, setSelectedFields] = useState({
    timestamp: true,
    temperature: false,
    humidity: false,
    moisture: false,
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  const download = async (format: 'csv' | 'json') => {
    if (!session) {
      alert('Please log in to download data.');
      return;
    }

    try {
      // timestamp is always included
      const fieldsToInclude = Object.keys(selectedFields).filter((field) => selectedFields[field]);
      const allFields = ['timestamp', ...fieldsToInclude];

      const response = await fetch(`/api/export?format=${format}&fields=${allFields.join(',')}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to download data');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${session.user.name}_env_data.${format}`; // filename
      link.click();

      setDropdownVisible(false); // hide the dropdown
      setSelectedFields({
        //unset the checkbox
        timestamp: true,
        temperature: false,
        humidity: false,
        moisture: false,
      });

      toast.success('Your data has been exported successfully!');
    } catch (error) {
      console.error(error);
      alert('Error while downloading data!!');
    }
  };

  return (
    <div>
      <div className="flex items-center min-w-full w-full fixed justify-center p-2 z-[50] mt-[2rem]">
        <div className="flex justify-between md:w-[900px] w-[95%] border dark:border-zinc-900 dark:bg-black bg-opacity-10 relative backdrop-filter backdrop-blur-lg bg-white border-white border-opacity-20 rounded-xl p-2 shadow-lg">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="min-[825px]:hidden p-2 hover:bg-gray-100">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <ModeToggle />
                <SheetTitle>
                  {session ? `Welcome, ${session.user.name}!` : 'Log in to unlock more features!'}
                  <LoginButton />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col space-y-3 mt-[1rem] z-[99]">
                <Link href="/">
                  <Button className="w-full border hover:bg-gray-100">Home</Button>
                </Link>
                <Link href="/aboutUs">
                  <Button className="w-full border hover:bg-gray-100">About Us</Button>
                </Link>
                <Link href="/faq">
                  <Button className="w-full border hover:bg-gray-100">FAQ</Button>
                </Link>

                <div className="relative">
                  <Button
                    onClick={() => setDropdownVisible(!isDropdownVisible)}
                    className="w-full border hover:bg-gray-100"
                  >
                    Download
                  </Button>

                  {isDropdownVisible && (
                    <div className="absolute top-15 left-0 bg-white shadow-lg rounded-lg p-2 mt-2 w-full">
                      <div className="flex flex-col gap-2 text-sm">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="temperature"
                            checked={selectedFields.temperature}
                            onChange={handleFieldChange}
                          />
                          Temperature
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="humidity"
                            checked={selectedFields.humidity}
                            onChange={handleFieldChange}
                          />
                          Humidity
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="moisture"
                            checked={selectedFields.moisture}
                            onChange={handleFieldChange}
                          />
                          Moisture
                        </label>
                      </div>

                      <button
                        onClick={() => download('csv')}
                        className="w-full text-left p-1 hover:bg-gray-100 text-xs mt-2"
                      >
                        CSV
                      </button>
                      <button
                        onClick={() => download('json')}
                        className="w-full text-left p-1 hover:bg-gray-100 text-xs"
                      >
                        JSON
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <NavigationMenu>
            <NavigationMenuList>
              <Link href="/" className="pl-2">
                <Image src="/logo-unsplash.png" width="40" height="40" alt="Logo" className="h-8" />
              </Link>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center justify-between flex-1 max-[825px]:hidden ml-8">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-gray-600 transition-colors">
                Home
              </Link>
              <Link
                href="/aboutUs"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                FAQ
              </Link>
            </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{session.user?.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <button className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-full hover:opacity-90 transition-opacity">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
