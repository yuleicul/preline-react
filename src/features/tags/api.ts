import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/common/const'
import { Tag } from './types'

function useGetTagsQuery() {
  return useQuery({
    queryKey: [QueryKey.Tags],
    queryFn: () => {
      return JSON.parse(localStorage.getItem('tags') || '[]') as Tag[]
    },
  })
}

function useCreateTagMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newTag: Tag) => {
      const tags = JSON.parse(localStorage.getItem('tags') || '[]') as Tag[]
      tags.push(newTag)
      localStorage.setItem('tags', JSON.stringify(tags))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Tags] })
    },
  })
}

function useUpdateTagMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Tag>) => {
      const tags = JSON.parse(localStorage.getItem('tags') || '[]') as Tag[]
      const target = tags.find((tag) => tag.id === data.id)
      const updatedTags = tags.map((tag) =>
        tag.id === data.id ? { ...target, ...data } : tag,
      )
      localStorage.setItem('tags', JSON.stringify(updatedTags))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Tags] })
    },
  })
}

export { useGetTagsQuery, useCreateTagMutation, useUpdateTagMutation }
