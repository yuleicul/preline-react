import { PropsWithChildren } from 'react'

type Props = {
  title: string
  subtitle: string
  linkText: string
  linkHref: string
}

export function SimpleCard({
  title,
  subtitle,
  children,
  linkText,
  linkHref,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="mt-1 text-xs font-medium uppercase text-gray-500">
        {subtitle}
      </p>
      {children}

      <a
        className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        href={linkHref}
      >
        {linkText}
        <svg
          className="shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </a>
    </div>
  )
}
