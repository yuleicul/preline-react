import { Todo } from '../todos/types'

export type History = {
  id: number
  todoId: Todo['id']
  startedAt: string
  body?: string
  endedAt?: string
}
