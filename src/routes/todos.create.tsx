import { zodResolver } from '@hookform/resolvers/zod'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '@/common/components/header'
import { cn } from '@/common/components/lib/utils'
import { useGetTagsQuery } from '@/features/tags/api'
import { useCreateTodoMutation } from '@/features/todos/api'
import { todoSchema } from '@/features/todos/schema'
import { TodoStatus } from '@/features/todos/types'

export function TodosCreate() {
  const navigate = useNavigate()
  const { mutate: createTodo } = useCreateTodoMutation()
  const { data: tags } = useGetTagsQuery()

  const { register, getValues, watch } = useForm({
    defaultValues: {
      icon: '',
      title: '',
      tags: [] as string[],
    },
    resolver: zodResolver(todoSchema),
  })

  const selectedTags = watch('tags')

  const [emojiData, setEmojiData] = useState<EmojiClickData | null>(null)

  const handleClickEmoji = (emojiData: EmojiClickData) => {
    setEmojiData(emojiData)
  }

  return (
    <div className="px-6">
      <Header
        title="Create Todo"
        onClickX={() => navigate('/')}
        onClickV={async () => {
          await createTodo({
            ...getValues(),
            id: Date.now() + '',
            icon: emojiData?.emoji ?? '😀',
            status: TodoStatus.Todo,
          })
        }}
      />

      <div className="flex flex-col items-center gap-4">
        <div className="size-20 rounded-full border-4 bg-primary flex justify-center items-center">
          <span className="text-4xl">{emojiData?.emoji ?? '😀'}</span>
        </div>
        <input
          {...register('title')}
          type="text"
          placeholder="What will you do?"
          className="input input-bordered w-full max-w-xs"
        />
        <div className="w-full flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <>
              <input
                type="checkbox"
                {...register('tags')}
                value={tag.id}
                id={tag.id}
                className="hidden"
              />
              <label
                htmlFor={tag.id}
                key={tag.id}
                className={cn(
                  'badge',
                  selectedTags.includes(tag.id)
                    ? 'badge-accent'
                    : 'badge-outline',
                )}
              >
                #{tag.name}
              </label>
            </>
          ))}
          <Link to={'/tags/create'} className="badge badge-outline">
            + New tag
          </Link>
        </div>
        {/* todo */}
        {/* <EmojiPicker onEmojiClick={handleClickEmoji} width={300} /> */}
      </div>
    </div>
  )
}
