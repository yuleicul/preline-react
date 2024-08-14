export enum TodoStatus {
  Todo,
  InProgress,
  Done,
}

export type Todo = {
  id: string
  title: string
  status: TodoStatus
  icon: string
}

export type InProgressTodo = Todo & {
  startedAt: string
}
