// app.env.d.ts

declare module 'tailwind-rn' {
    export * from 'tailwind-rn';
   
    export function useTailwind(): (classes: string) => any; // Generic type for useTailwind
   
    interface Props {
      utilities: Utilities;
      colorScheme?: ColorSchemeName;
      children?: React.ReactNode | React.ReactNode[];
    }
   
    export const TailwindProvider: React.FC<Props>;
   }
   