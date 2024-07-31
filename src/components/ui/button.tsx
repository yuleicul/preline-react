import { type ButtonHTMLAttributes, type FC } from 'react'
import { twMerge } from 'tailwind-merge'

type AdditionalProps = {
  isLoading?: boolean
  renderAs?: string
}

export const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & AdditionalProps
> = ({ isLoading = false, children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        'px-4 py-3.5 bg-blue-500 font-semibold text-[15px] text-white top-[22.5px] rounded-tl rounded-tr-xl rounded-bl-xl rounded-br justify-center items-center gap-2.5 inline-flex disabled:bg-blue-200 disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      {isLoading && (
        <span
          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading"
        />
      )}
      {children}
    </button>
  )
}

export const OutlineButton: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & AdditionalProps
> = ({ children, className, ...props }) => {
  return (
    <Button
      className={twMerge(
        'bg-white text-blue-500 border border-ft-brand',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export const LinkButton: FC<
  ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & AdditionalProps
> = ({ children, className, renderAs = 'button', ...props }) => {
  switch (renderAs) {
    case 'button':
      return (
        <button
          type="button"
          className={twMerge(
            'inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-blue-500 disabled:opacity-50 disabled:pointer-events-none',
            className,
          )}
          {...props}
        >
          {children}
        </button>
      )
    case 'link':
      return (
        <a
          className={twMerge(
            'mx-1 gap-x-2 text-sm font-semibold rounded-lg text-blue-500 hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
            className,
          )}
          {...props}
        >
          {children}
        </a>
      )
  }
}

export const GhostButton: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & AdditionalProps
> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={twMerge(
        'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
