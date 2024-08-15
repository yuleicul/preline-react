import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/common/constants'
import { History } from '../histories/types'
import { Tag } from '../tags/types'
import { Todo, TodoWithGraph } from './types'

type GetTodosParams = {
  tags?: Array<Tag['id']>
}

function useGetTodosQuery(params?: GetTodosParams) {
  return useQuery({
    queryKey: [QueryKey.Todos, params],
    queryFn: () => {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]
      const filteredTodos = todos.filter((todo) => {
        if (params?.tags && params.tags.length > 0) {
          const hasTags = todo.tags.length > 0
          return hasTags
            ? params.tags.some((tagId) => todo.tags.includes(tagId))
            : true
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

export { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation }
