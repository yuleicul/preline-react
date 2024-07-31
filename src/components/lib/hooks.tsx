import {
  useEffect,
  useRef,
  useState,
  type FocusEventHandler,
  type FormEventHandler,
} from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/components/lib/utils'
import 'preline/preline'
import { type IStaticMethods } from 'preline/preline'

/***************** usePrelineEffect *****************/

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

/***************** useValidityEffect *****************/

export const VALIDITY_STATES: Array<keyof ValidityState> = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooLong',
  'tooShort',
  'rangeUnderflow',
  'rangeOverflow',
  'stepMismatch',
  'badInput',
  'customError',
  'valid',
]

export type ValidationMessage = Partial<Record<keyof ValidityState, string>>

type PossibleHTMLElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement

type Dependency = {
  required?: boolean
  pattern?: string
}

type Props = {
  name?: string
  dep?: Dependency
  validationMessage?: ValidationMessage
  validationMessageClassName?: string
  onInvalid?: FormEventHandler<PossibleHTMLElement>
  onBlur?: FocusEventHandler<PossibleHTMLElement>
}

export function useValidityEffect({
  name,
  dep,
  validationMessage,
  validationMessageClassName,
  onInvalid,
  onBlur,
}: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const targetRef = useRef<EventTarget & PossibleHTMLElement>()

  const handleInvalid: FormEventHandler<PossibleHTMLElement> = (event) => {
    event.preventDefault()
    targetRef.current = event.currentTarget

    const validityState = VALIDITY_STATES.find(
      (state) => event.currentTarget.validity[state],
    )!
    if (validationMessage?.[validityState]) {
      setErrorMessage(validationMessage[validityState]!)
    } else if (validityState === 'valueMissing') {
      setErrorMessage('This field is required.')
    } else {
      console.warn(`Please set validationMessage.${validityState} for ${name}`)
    }

    onInvalid?.(event)
  }

  const handleBlur: FocusEventHandler<PossibleHTMLElement> = (event) => {
    // NOTE: `checkValidity()` will trigger `oninvalid` if it returns `false`
    const isValid = event.target.checkValidity()
    if (isValid) {
      setErrorMessage('')
      onBlur?.(event)
    }
  }

  useEffect(() => {
    if (errorMessage) {
      const isValid = targetRef.current?.checkValidity()
      if (isValid) {
        setErrorMessage('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep?.required, dep?.pattern])

  const ErrorMessage = () => {
    return (
      errorMessage && (
        <p
          className={cn(
            'text-sm text-red-500 font-medium break-words mt-2.5',
            validationMessageClassName,
          )}
        >
          {errorMessage}
        </p>
      )
    )
  }

  return {
    ErrorMessage,
    errorMessage,
    setErrorMessage,
    handleInvalid,
    handleBlur,
  }
}
