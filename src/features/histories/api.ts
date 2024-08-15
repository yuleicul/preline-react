import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/common/constants'
import { Todo } from '../todos/types'
import { History, HistoryWithGraph } from './types'

function useGetHistoriesQuery() {
  return useQuery({
    queryKey: [QueryKey.Histories],
    queryFn: () => {
      const histories = JSON.parse(
        localStorage.getItem('histories') || '[]',
      ) as History[]
      const todos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]

      const result: HistoryWithGraph[] = histories.map((history) => {
        const todo = todos.find((todo) => todo.id === history.todoId)!
        return {
          id: history.id,
          todoId: history.todoId,
          startedAt: history.startedAt,
          body: history.body,
          endedAt: history.endedAt,
          todo,
        }
      })
      return result
    },
  })
}

function useCreateHistoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newHistory: History) => {
      const histories = JSON.parse(
        localStorage.getItem('histories') || '[]',
      ) as History[]
      histories.push(newHistory)
      localStorage.setItem('histories', JSON.stringify(histories))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Histories] })
    },
  })
}

function useUpdateHistoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<History>) => {
      const histories = JSON.parse(
        localStorage.getItem('histories') || '[]',
      ) as History[]
      const target = histories.find((history) => history.id === data.id)
      const updatedHistories = histories.map((history) =>
        history.id === data.id ? { ...target, ...data } : history,
      )
      localStorage.setItem('histories', JSON.stringify(updatedHistories))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Histories] })
    },
  })
}

export {
  useGetHistoriesQuery,
  useCreateHistoryMutation,
  useUpdateHistoryMutation,
}
