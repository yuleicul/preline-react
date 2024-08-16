import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { QueryKey } from '@/common/constants'
import { History } from '../histories/types'
import { Tag } from '../tags/types'
import { Todo, TodoStatus, TodoWithGraph } from './types'

type GetTodosParams = {
  tags?: Array<Tag['id']>
}

function useGetTodosQuery(params?: GetTodosParams) {
  return useQuery({
    queryKey: [QueryKey.Todos, params],
    queryFn: () => {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]
      const filteredTodos = todos.filter((todo) => {
        if (todo.status === TodoStatus.Done) {
          return false
        }

        if (params?.tags && params.tags.length > 0) {
          return params.tags.some((tagId) => todo.tags.includes(tagId))
        } else {
          return true
        }
      })

      const histories = JSON.parse(
        localStorage.getItem('histories') || '[]',
      ) as History[]
      const tags = JSON.parse(localStorage.getItem('tags') || '[]') as Tag[]

      const result: TodoWithGraph[] = filteredTodos.map((todo) => {
        return {
          id: todo.id,
          title: todo.title,
          status: todo.status,
          icon: todo.icon,
          histories: histories.filter((history) => history.todoId === todo.id),
          tags: tags.filter((tag) => todo.tags.includes(tag.id)),
        }
      })

      return result
    },
  })
}

function useGetTodoByIdQuery(id?: string) {
  return useQuery({
    queryKey: [QueryKey.Todos, id],
    queryFn: id
      ? () => {
          const todos = JSON.parse(
            localStorage.getItem('todos') || '[]',
          ) as Todo[]
          const target = todos.find((todo) => todo.id === id)

          const histories = JSON.parse(
            localStorage.getItem('histories') || '[]',
          ) as History[]
          const tags = JSON.parse(localStorage.getItem('tags') || '[]') as Tag[]

          const result: TodoWithGraph = {
            id: target!.id,
            title: target!.title,
            status: target!.status,
            icon: target!.icon,
            histories: histories.filter(
              (history) => history.todoId === target!.id,
            ),
            tags: tags.filter((tag) => target!.tags.includes(tag.id)),
          }

          return result
        }
      : skipToken,
  })
}

function useCreateTodoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newTodo: Todo) => {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]
      const updatedTodos = [...todos, newTodo]
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Todos] })
    },
  })
}

function useUpdateTodoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Todo>) => {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]
      const target = todos.find((todo) => todo.id === data.id)
      const updatedTodos = todos.map((todo) =>
        todo.id === data.id ? { ...target, ...data } : todo,
      )
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Todos] })
    },
  })
}

export {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
}
