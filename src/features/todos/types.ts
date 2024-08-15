import { History } from '../histories/types'
import { Tag } from '../tags/types'

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
  tags: Array<Tag['id']>
  description?: string
}

export type TodoWithGraph = Omit<Todo, 'tags'> & {
  histories: History[]
  tags: Tag[]
}
