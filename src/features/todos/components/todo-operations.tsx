import { CheckCircle, Play, Redo2, StopCircle } from 'lucide-react'
import {
  useCreateHistoryMutation,
  useUpdateHistoryMutation,
} from '@/features/histories/api'
import { useUpdateTodoMutation } from '../api'
import { TodoStatus, TodoWithGraph } from '../types'

type TodoOperationsProps = {
  todo: TodoWithGraph
}

export function TodoOperations({ todo }: TodoOperationsProps) {
  const { mutate: updateTodo } = useUpdateTodoMutation()
  const { mutate: createHistory } = useCreateHistoryMutation()
  const { mutate: updateHistory } = useUpdateHistoryMutation()

  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu flex-row bg-base-100 rounded-box z-[1] p-2 shadow"
    >
      <li>
        {todo.status === TodoStatus.Done ? (
          <button
            onClick={() => updateTodo({ id: todo.id, status: TodoStatus.Todo })}
          >
            <Redo2 />
          </button>
        ) : (
          <button
            onClick={() => updateTodo({ id: todo.id, status: TodoStatus.Done })}
          >
            <CheckCircle />
          </button>
        )}
      </li>
      <li>
        {todo.status === TodoStatus.Todo && (
          <button
            onClick={() => {
              createHistory({
                id: Date.now() + '',
                todoId: todo.id,
                startedAt: new Date().toISOString(),
              })
              updateTodo({ id: todo.id, status: TodoStatus.InProgress })
            }}
          >
            <Play />
          </button>
        )}
        {todo.status === TodoStatus.InProgress && (
          <button
            onClick={() => {
              updateHistory({
                id: todo.histories[0].id,
                endedAt: new Date().toISOString(),
              })
              updateTodo({ id: todo.id, status: TodoStatus.Todo })
            }}
          >
            <StopCircle />
          </button>
        )}
      </li>
    </ul>
  )
}
