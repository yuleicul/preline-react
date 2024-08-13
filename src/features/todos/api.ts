import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/common/const'
import { History } from '../histories/types'
import { Todo } from './types'

function useGetTodosQuery() {
  return useQuery({
    queryKey: [QueryKey.Todos],
    queryFn: () => {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]
      const histories = JSON.parse(
        localStorage.getItem('histories') || '[]',
      ) as History[]
      todos.forEach((todo) => {
        todo.histories = histories.filter(
          (history) => history.todoId === todo.id,
        )
      })
      return todos
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
    mutationFn: async (data: Todo) => {
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
