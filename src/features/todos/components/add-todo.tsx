import { zodResolver } from '@hookform/resolvers/zod'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { Plus } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { Button, Modal } from 'react-daisyui'
import { useForm } from 'react-hook-form'
import { useCreateTodoMutation } from '../api'
import { todoSchema } from '../schema'
import { TodoStatus } from '../types'

export function AddTodo() {
  const { mutate: createTodo } = useCreateTodoMutation()

  const modalRef = useRef<HTMLDialogElement>(null)
  const handleShow = useCallback(() => {
    modalRef.current?.showModal()
  }, [modalRef])

  const { register, getValues } = useForm({
    defaultValues: {
      icon: '',
      title: '',
    },
    resolver: zodResolver(todoSchema),
  })

  const [emojiData, setEmojiData] = useState<EmojiClickData | null>(null)

  const handleClickEmoji = (emojiData: EmojiClickData) => {
    setEmojiData(emojiData)
  }

  return (
    <>
      <Button
        onClick={handleShow}
        className="btn-primary btn-lg btn-circle shadow"
      >
        <Plus />
      </Button>

      <Modal ref={modalRef}>
        <Modal.Header className="font-bold">Create Todo</Modal.Header>
        <Modal.Body className="flex flex-col items-center gap-4">
          <input
            {...register('title')}
            type="text"
            placeholder="What will you do?"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="size-20 rounded-full border-4 bg-primary flex justify-center items-center">
            <span className="text-4xl">{emojiData?.emoji ?? '😀'}</span>
          </div>
          <EmojiPicker onEmojiClick={handleClickEmoji} width={300} />
        </Modal.Body>
        <Modal.Actions>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
              ✕
            </button>
            <div className="flex gap-2">
              <Button>Close</Button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  await createTodo({
                    ...getValues(),
                    id: Date.now(),
                    icon: emojiData?.emoji ?? '😀',
                    status: TodoStatus.Todo,
                    histories: [],
                  })
                }}
              >
                Create
              </button>
            </div>
          </form>
        </Modal.Actions>
      </Modal>
    </>
  )
}
