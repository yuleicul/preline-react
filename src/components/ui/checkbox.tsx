import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../lib/utils'

type CheckboxProps = {
  label?: ReactNode
  labelClassName?: string
}

export function Checkbox({
  label,
  className,
  labelClassName,
  ...htmlInputProps
}: CheckboxProps & InputHTMLAttributes<HTMLInputElement>) {
  const randomId = useId()
  const id = htmlInputProps.id || randomId

  return (
    <div className={cn('flex align-middle', className)}>
      <input
        {...htmlInputProps}
        id={id}
        type="checkbox"
        className="shrink-0 mt-0.5 border-gray-300 rounded text-ft-brand focus:ring-ft-brand"
      />
      <label
        htmlFor={id}
        className={cn(
          'text-sm ms-4',
          htmlInputProps.disabled && 'opacity-40',
          labelClassName,
        )}
      >
        {label}
      </label>
    </div>
  )
}
