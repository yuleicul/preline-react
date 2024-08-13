export type Todo = {
  id: number
  title: string
  icon: string
}

export type InProgressTodo = Todo & {
  startedAt: string
}
