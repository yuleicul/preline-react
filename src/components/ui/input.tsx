import {
  forwardRef,
  useId,
  type ForwardedRef,
  type InputHTMLAttributes,
} from 'react'
import {
  useValidityEffect,
  type ValidationMessage,
} from '@/components/lib/hooks'
import { cn } from '@/components/lib/utils'
import { Label } from './label'

type Props = {
  label?: string
  validationMessage?: ValidationMessage
  inputClassName?: string
  loading?: boolean
}

export const Input = forwardRef(function Input(
  {
    label,
    className,
    validationMessage,
    inputClassName,
    loading,
    ...htmlInputProps
  }: InputHTMLAttributes<HTMLInputElement> & Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const randomId = useId()
  const id = htmlInputProps.id || randomId

  const { ErrorMessage, errorMessage, handleBlur, handleInvalid } =
    useValidityEffect({
      name: htmlInputProps.name,
      dep: {
        required: htmlInputProps.required,
        pattern: htmlInputProps.pattern,
      },
      validationMessage,
      onBlur: htmlInputProps.onBlur,
      onInvalid: htmlInputProps.onInvalid,
    })

  return (
    <div className={cn(className)}>
      {label && <Label htmlFor={id}> {label}</Label>}

      <div className="flex items-center relative">
        <input
          id={id}
          ref={ref}
          {...htmlInputProps}
          className={cn(
            'py-3.5 px-4 block w-full rounded-lg text-[15px] shadow-sm',
            errorMessage
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25 focus:ring-4'
              : 'border-gray-200 focus:border-gray-200 focus:ring-gray-200/25',
            'disabled:text-gray-300 disabled:bg-slate-50 disabled:pointer-events-none',
            inputClassName,
          )}
          onInvalid={handleInvalid}
          onBlur={handleBlur}
        />

        {loading && (
          <span
            className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-gray-200 rounded-full absolute right-3.5"
            role="status"
            aria-label="loading"
          />
        )}
      </div>

      <ErrorMessage />
    </div>
  )
})
