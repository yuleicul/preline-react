import { PropsWithChildren } from 'react'

type Props = {
  htmlFor: string
  required?: boolean
}

export function Label({
  htmlFor,
  required,
  children,
}: PropsWithChildren<Props>) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold mb-2.5">
      {children}
      {required && <span className="text-teal-600">*</span>}
    </label>
  )
}
