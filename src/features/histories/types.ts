import { Todo } from '../todos/types'

export type History = {
  id: string
  todoId: Todo['id']
  startedAt: string
  body?: string
  endedAt?: string
}

export type HistoryWithGraph = Omit<History, 'todoId'> & {
  todo: Todo
}
