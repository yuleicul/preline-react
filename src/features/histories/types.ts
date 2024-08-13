import { Todo } from '../todos/types'

export type History = {
  id: number
  todoId: Todo['id']
  body: string
  startedAt: string
  endedAt?: string
}
