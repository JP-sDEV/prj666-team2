// "use client"

// import * as React from "react"
// import { Moon, MoonIcon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function ModeToggle() {
//   const { setTheme } = useTheme()

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }



"use client"

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        // Render nothing on the server and until the theme is mounted
        return null;
    }

  return (
    <div>
    {theme === "dark" ? (
        <Button variant="ghost" className="hover:bg-inherit border-zinc-900 bg-[#0c0c0d]" size="icon" onClick={() => setTheme("light")}>
            <Sun className="w-5 h-5" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    ) : (
        <Button variant="ghost" size="icon" className="hover:bg-inherit border-zinc-100 bg-inherit" onClick={() => setTheme("dark")}>
            <Moon className="w-5 h-5" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )}
</div>
  )
}