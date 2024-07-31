# Preline React

<details>

<summary>This repo is built with Vite, Tailwind CSS, Preline, and react-router.</summary>

1. [Initialize with Vite](https://vitejs.dev/guide/)
1. [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)
1. [Install Preline UI with React using Tailwind CSS](https://preline.co/docs/frameworks-react.html)

   You can skip step 3 - Add a reinitialization helper for now

1. [Install tailwindcss-forms](https://github.com/tailwindlabs/tailwindcss-forms)
1. [Install React Router](https://reactrouter.com/en/main/start/tutorial#setup)
1. Add preline reinitialization helper (this is very useful when dropdowns or modals can not be opened)

   New file `src/lib/hooks.tsx`, and add code

   ```tsx
   import { useEffect } from 'react'
   import { useLocation } from 'react-router-dom'

   import 'preline/preline'
   import { type IStaticMethods } from 'preline/preline'

   declare global {
     interface Window {
       HSStaticMethods: IStaticMethods
     }
   }

   /**
    * Add code that reinitializes the components every time when app is mounted or page was changed
    * Docs: https://preline.co/docs/frameworks-react.html
    */
   export function usePrelineEffect() {
     const location = useLocation()

     useEffect(() => {
       window.HSStaticMethods.autoInit()
     }, [location.pathname])
   }
   ```

1. Add tailwind classname util

   1. Install dependencies: `pnpm i clsx tailwind-merge`
   1. New File `src/lib/utils.ts`, and add code

      ```ts
      import { clsx, type ClassValue } from 'clsx'
      import { twMerge } from 'tailwind-merge'

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs))
      }
      ```

1. [Add alias `@`](https://ui.shadcn.com/docs/installation/vite)
1. [Install prettier](https://prettier.io/docs/en/install)
</details>
