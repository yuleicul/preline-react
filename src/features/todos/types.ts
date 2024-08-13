import { TodoSchema } from './schemas'

type TodoHistory = {
  startedAt?: string
  endedAt?: string
  note?: string
}
export type Todo = TodoSchema & {
  id: number
  icon: string
  histories: TodoHistory[]
}
export type TodoList = Todo[]
export type InProgressTodo = Todo & {
  startedAt: string
}
