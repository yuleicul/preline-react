import { QueryKey } from '@/common/const'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Todo } from './types'

function useGetTodosQuery() {
  return useQuery({
    queryKey: [QueryKey.Todos],
    queryFn: () => {
      return localStorage.getItem('todos') || ([] as Todo[])
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

export { useGetTodosQuery, useCreateTodoMutation }
