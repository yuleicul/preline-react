import { zodResolver } from '@hookform/resolvers/zod'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/common/components/header'
import { cn } from '@/common/components/lib/utils'
import { useGetTagsQuery } from '@/features/tags/api'
import { CreateTag } from '@/features/tags/components/create-tag'
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    document.getElementById('my_modal_2').close()
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
          navigate('/')
        }}
      />

      <div className="flex flex-col items-center gap-4">
        <button
          className="size-20 rounded-full border-4 bg-primary flex justify-center items-center"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          onClick={() => document.getElementById('my_modal_2').showModal()}
        >
          <span className="text-4xl">{emojiData?.emoji ?? '😀'}</span>
        </button>
        <input
          {...register('title')}
          type="text"
          placeholder="What will you do?"
          className="input input-bordered w-full"
        />
        <div className="w-full flex flex-wrap items-center gap-2 align-middle">
          {tags?.map((tag) => (
            <label
              key={tag.id}
              htmlFor={tag.id}
              className={cn(
                'badge cursor-pointer',
                selectedTags.includes(tag.id) ? 'badge-accent' : 'badge-ghost',
              )}
            >
              <input
                type="checkbox"
                {...register('tags')}
                value={tag.id}
                id={tag.id}
                className="hidden"
              />
              <span>#{tag.name}</span>
            </label>
          ))}

          <CreateTag />
        </div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box w-full bg-transparent shadow-none flex justify-center">
            <EmojiPicker
              onEmojiClick={handleClickEmoji}
              previewConfig={{ showPreview: false }}
              autoFocusSearch={false}
              height={500}
              width={320}
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  )
}
