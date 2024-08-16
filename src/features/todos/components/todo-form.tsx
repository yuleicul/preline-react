import { EmojiClickData } from 'emoji-picker-react'
import { FormHTMLAttributes } from 'react'
import { Textarea } from 'react-daisyui'
import { useFormContext } from 'react-hook-form'
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

type TodoFormProps = {
  title: string
} & FormHTMLAttributes<HTMLFormElement>

export function TodoForm({ title, ...formProps }: TodoFormProps) {
  const navigate = useNavigate()
  const { data: tags } = useGetTagsQuery()

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()
  const selectedTags = watch('tags')
  const icon = watch('icon')

  const handleClickEmoji = (emojiData: EmojiClickData) => {
    setValue('icon', emojiData.emoji)
    closeModal(ModalId.EmojiPicker)
  }

  return (
    <>
      <form className="px-6" {...formProps}>
        <Header title={title} onClickX={() => navigate('/')} />

        <div className="flex flex-col items-center gap-4">
          <EmojiPickerButton emoji={icon} />

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
