# Random Todo

<details>

<summary>This repo is built with Vite, Tailwind CSS, daisyUI, and react-router.</summary>

1. [Initialize with Vite](https://vitejs.dev/guide/)
1. [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)
1. [Install React Router](https://reactrouter.com/en/main/start/tutorial#setup)
1. Add preline reinitialization helper (this is very useful when dropdowns or modals can not be opened)
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
1. Install

   - [prettier](https://prettier.io/docs/en/install)
   - [prettier-plugin-sort-imports](https://github.com/IanVS/prettier-plugin-sort-imports)
   - [daisyUI](https://daisyui.com/docs/install/)
   - [react-daisyui](https://github.com/daisyui/react-daisyui)
   - [lucid-react](https://lucide.dev/guide/packages/lucide-react)
   - [react-hook-form](https://react-hook-form.com/get-started)
   - [zod](https://zod.dev/?id=installation)
   - [@hookform/resolvers](https://github.com/react-hook-form/resolvers)
   - [lodash](https://lodash.com/)
   - [@uidotdev/usehooks](https://usehooks.com/)
   - [zustand](https://zustand-demo.pmnd.rs/)
   - [react-query](https://tanstack.com/query/latest/docs/framework/react/installation)

</details>
