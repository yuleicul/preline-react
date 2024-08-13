import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/common/const'
import { History } from './types'

function useGetHistoriesQuery() {
  return useQuery({
    queryKey: [QueryKey.Histories],
    queryFn: () => {
      return localStorage.getItem('histories') || ([] as History[])
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

function useEndHistoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const histories = JSON.parse(
        localStorage.getItem('histories') || '[]',
      ) as History[]
      const targetIndex = histories.findIndex((history) => history.id === id)
      if (targetIndex === -1) return
      histories[targetIndex].endedAt = new Date().toISOString()
      localStorage.setItem('histories', JSON.stringify(histories))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Histories] })
    },
  })
}

export { useGetHistoriesQuery, useCreateHistoryMutation, useEndHistoryMutation }
