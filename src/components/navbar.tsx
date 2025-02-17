'use client';
//import { cn } from '../../public/placeholder-logo-unsplash.jpg';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import LoginButton from './auth/LoginButton';

const NavBar: React.FC = () => {
  const { data: session } = useSession();

  return (
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
              <SheetTitle>
                {session ? `Welcome, ${session.user.name}!` : 'Log in to unlock more features!'}
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
              <LoginButton />
              <ModeToggle />
            </div>
          </SheetContent>
        </Sheet>

        <NavigationMenu>
          <NavigationMenuList>
            <Link href="/" className="pl-2">
              <Image
                src="/placeholder-logo-unsplash.jpg"
                width="40"
                height="40"
                alt="Logo"
                className="h-8"
              />
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-9 max-[825px]:hidden top-10">
          <Link href="/">
            <Button className="hover:bg-gray-100">Home</Button>
          </Link>
          <Link href="/aboutUs">
            <Button className="hover:bg-gray-100">About Us</Button>
          </Link>
          <Link href="/faq">
            <Button className="hover:bg-gray-100">FAQ</Button>
          </Link>
          <div className="ml-60">
            <LoginButton />
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

// const ListItem = React.forwardRef<
//     React.ElementRef<"a">,
//     React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//     return (
//         <li>
//             <NavigationMenuLink asChild>
//                 <a
//                     ref={ref}
//                     className={cn(
//                         "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//                         className
//                     )}
//                     {...props}
//                 >
//                     <div className="text-sm font-medium leading-none">{title}</div>
//                     <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                         {children}
//                     </p>
//                 </a>
//             </NavigationMenuLink>
//         </li>
//     )
// })
// ListItem.displayName = "ListItem"
