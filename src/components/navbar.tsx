'use client';
//import { cn } from '../../public/placeholder-logo-unsplash.jpg';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { Dialog, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuList } from './ui/navigation-menu';
import { ModeToggle } from './ui/mode-toggle';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import Image from 'next/image';

const NavBar: React.FC = () => {
  return (
    <div className="flex items-center min-w-full w-full fixed justify-center p-2 z-[50] mt-[2rem]">
      <div className="flex justify-between md:w-[900px] w-[95%] border dark:border-zinc-900 dark:bg-black bg-opacity-10 relative backdrop-filter backdrop-blur-lg bg-white border-white border-opacity-20 rounded-xl p-2 shadow-lg">
        <Dialog>
          <SheetTrigger className="min-[825px]:hidden p-2 transition">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>fabrika!!.</SheetTitle>
              <SheetDescription>
                Scale and launch products with expert developers, on-demand, at a flat monthly fee
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem] z-[99]">
              <DialogClose asChild>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Home
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/aboutUs">
                  <Button variant="outline" className="w-full">
                    About Us
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/faq">
                  <Button variant="outline" className="w-full">
                    FAQ
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/account">
                  <Button variant="outline" className="w-full">
                    Create an Account
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
              </DialogClose>
              <ModeToggle />
            </div>
          </SheetContent>
        </Dialog>

        <NavigationMenu>
          <NavigationMenuList className="max-[825px]:hidden ">
            <Link href="/" className="pl-2">
              <h1 className="font-bold">
                <Image
                  src="/placeholder-logo-unsplash.jpg"
                  width="40"
                  height="40"
                  alt="Logo"
                  className="h-8"
                />
              </h1>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-3 max-[825px]:hidden">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/aboutUs">
            <Button variant="ghost">About Us</Button>
          </Link>
          <Link href="/faq">
            <Button variant="ghost">FAQ</Button>
          </Link>
          <Link href="/account">
            <Button variant="ghost" className="ml-60">
              Create an Account
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
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
