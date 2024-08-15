import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ModalId } from '@/common/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function closeModal(modalId: ModalId) {
  const modal = document.getElementById(modalId)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  modal?.close()
}

export function openModal(modalId: ModalId) {
  const modal = document.getElementById(modalId)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  modal?.showModal()
}
