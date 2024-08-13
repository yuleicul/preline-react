import { History } from '../histories/types'

export enum TodoStatus {
  Todo,
  InProgress,
  Done,
}

export type Todo = {
  id: number
  title: string
  status: TodoStatus
  icon: string
  histories: History[]
}

export type InProgressTodo = Todo & {
  startedAt: string
}
