import { zodResolver } from '@hookform/resolvers/zod'
import { EmojiClickData } from 'emoji-picker-react'
import { useState } from 'react'
import { Textarea } from 'react-daisyui'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  EmojiPickerButton,
  EmojiPickerModal,
} from '@/common/components/emoji-picker'
import { Header } from '@/common/components/header'
import { closeModal, cn } from '@/common/components/lib/utils'
import { ModalId } from '@/common/constants'
import { useGetTagsQuery } from '@/features/tags/api'
import {
  CreateTagButton,
  CreateTagModal,
} from '@/features/tags/components/create-tag'
import { useCreateTodoMutation } from '@/features/todos/api'
import { todoDefaultValue, todoSchema } from '@/features/todos/schema'
import { TodoStatus } from '@/features/todos/types'

export function TodosCreate() {
  const navigate = useNavigate()
  const { mutate: createTodo } = useCreateTodoMutation()
  const { data: tags } = useGetTagsQuery()

  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: todoDefaultValue,
    resolver: zodResolver(todoSchema),
  })
  const selectedTags = watch('tags')

  const [emojiData, setEmojiData] = useState<EmojiClickData | null>(null)

  const handleClickEmoji = (emojiData: EmojiClickData) => {
    setEmojiData(emojiData)
    closeModal(ModalId.EmojiPicker)
  }

  const onSubmit = async () => {
    await createTodo({
      ...getValues(),
      id: Date.now() + '',
      icon: emojiData?.emoji ?? '😀',
      status: TodoStatus.Todo,
    })
    navigate('/')
  }

  return (
    <>
      <form className="px-6" onSubmit={handleSubmit(onSubmit)}>
        <Header title="Create Todo" onClickX={() => navigate('/')} />

        <div className="flex flex-col items-center gap-4">
          <EmojiPickerButton emoji={emojiData?.emoji ?? '😀'} />

          <input
            {...register('title')}
            type="text"
            placeholder="What will you do?"
            className={cn(
              'input input-bordered w-full',
              errors.title && 'input-error',
            )}
          />

          <div className="w-full flex flex-wrap items-center gap-2 align-middle">
            {tags?.map((tag) => (
              <label
                key={tag.id}
                htmlFor={tag.id}
                className={cn(
                  'badge cursor-pointer',
                  selectedTags.includes(tag.id)
                    ? 'badge-primary'
                    : 'badge-ghost',
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

            <CreateTagButton />
          </div>

          <Textarea
            {...register('description')}
            placeholder="(Optional) Description"
            className={cn('textarea textarea-bordered w-full')}
          />
        </div>
      </form>

      <EmojiPickerModal onEmojiClick={handleClickEmoji} />
      <CreateTagModal />
    </>
  )
}
